import { db, recordActivity } from "./db.mjs";

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const parseJSON = (value, fallback = {}) => {
  try { return JSON.parse(value || "") ?? fallback; } catch { return fallback; }
};
const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, Number(value) || 0));
const round = (value, digits = 1) => {
  const factor = 10 ** digits;
  return Math.round((Number(value) || 0) * factor) / factor;
};

export const PERFORMANCE_OPTIONS = Object.freeze({
  scent: ["dislike", "not_for_me", "acceptable", "good", "loved"],
  wear: ["winter", "spring", "summer", "autumn", "day", "night"],
  longevity: ["very_weak", "weak", "moderate", "long", "very_long"],
  sillage: ["skin", "soft", "moderate", "strong", "very_strong"],
  value: ["overpriced", "high", "acceptable", "good", "great"],
  gender: ["women", "unisex", "men"]
});

const DISTRIBUTION_METRICS = new Set(["scent", "longevity", "sillage", "value", "gender"]);
const DEFAULT_ORDER = ["scent", "wear", "longevity", "sillage", "gender", "value"];

db.exec(`
  CREATE TABLE IF NOT EXISTS product_performance_settings (
    product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    enabled INTEGER NOT NULL DEFAULT 1,
    visible_metrics_json TEXT NOT NULL DEFAULT '["scent","wear","longevity","sillage","gender","value"]',
    card_order_json TEXT NOT NULL DEFAULT '["scent","wear","longevity","sillage","gender","value"]',
    editorial_weight REAL NOT NULL DEFAULT 30 CHECK(editorial_weight BETWEEN 0 AND 100),
    customer_weight REAL NOT NULL DEFAULT 70 CHECK(customer_weight BETWEEN 0 AND 100),
    minimum_verified_votes INTEGER NOT NULL DEFAULT 5 CHECK(minimum_verified_votes >= 0),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS product_editorial_performance (
    product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    distributions_json TEXT NOT NULL DEFAULT '{}',
    updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS product_performance_votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    review_id INTEGER REFERENCES product_reviews(id) ON DELETE SET NULL,
    order_item_id INTEGER REFERENCES order_items(id) ON DELETE SET NULL,
    verified_purchase INTEGER NOT NULL DEFAULT 0,
    data_json TEXT NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active','hidden')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(customer_id, product_id)
  );
  CREATE TABLE IF NOT EXISTS product_performance_aggregates (
    product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    payload_json TEXT NOT NULL DEFAULT '{}',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS imported_performance_summaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    imported_count INTEGER NOT NULL CHECK(imported_count >= 0),
    source TEXT NOT NULL,
    import_date TEXT NOT NULL,
    change_reason TEXT NOT NULL,
    distributions_json TEXT NOT NULL DEFAULT '{}',
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS product_performance_vote_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vote_id INTEGER NOT NULL REFERENCES product_performance_votes(id) ON DELETE CASCADE,
    reporter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open','resolved','dismissed')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(vote_id, reporter_id)
  );
  CREATE INDEX IF NOT EXISTS idx_performance_votes_product ON product_performance_votes(product_id, status, verified_purchase);
  CREATE INDEX IF NOT EXISTS idx_performance_votes_customer ON product_performance_votes(customer_id, product_id);
  CREATE INDEX IF NOT EXISTS idx_performance_imports_product ON imported_performance_summaries(product_id, created_at DESC);
`);

function addColumns(table, columns) {
  const existing = new Set(db.prepare(`PRAGMA table_info(${table})`).all().map((column) => column.name));
  for (const [name, definition] of columns) if (!existing.has(name)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${name} ${definition}`);
}
addColumns("product_performance_settings", [
  ["allow_unverified", "INTEGER NOT NULL DEFAULT 0"],
  ["show_overall_result", "INTEGER NOT NULL DEFAULT 1"]
]);
addColumns("product_editorial_performance", [["details_json", "TEXT NOT NULL DEFAULT '{}' "]]);

function objectDistribution(metric, input = {}) {
  return Object.fromEntries(PERFORMANCE_OPTIONS[metric].map((key) => [key, round(clamp(input?.[key]), 2)]));
}

function distributionTotal(distribution) {
  return round(Object.values(distribution || {}).reduce((sum, value) => sum + Number(value || 0), 0), 2);
}

function normalized(distribution, target = 100) {
  const total = distributionTotal(distribution);
  if (!total) return Object.fromEntries(Object.keys(distribution || {}).map((key) => [key, 0]));
  const entries = Object.entries(distribution).map(([key, value]) => [key, round(Number(value) / total * target, 1)]);
  const difference = round(target - entries.reduce((sum, [, value]) => sum + value, 0), 1);
  if (entries.length) entries[entries.length - 1][1] = round(entries[entries.length - 1][1] + difference, 1);
  return Object.fromEntries(entries);
}

function centeredDistribution(metric, selectedIndex) {
  const keys = PERFORMANCE_OPTIONS[metric];
  const raw = Object.fromEntries(keys.map((key, index) => {
    const distance = Math.abs(index - selectedIndex);
    return [key, distance === 0 ? 56 : distance === 1 ? 22 : distance === 2 ? 7 : 1];
  }));
  return normalized(raw);
}

function inferEditorial(productRow) {
  const metadata = parseJSON(productRow.catalog_json, {});
  const performance = metadata.performance || {};
  const longevity = Math.max(0, Math.min(4, Math.round(clamp(performance.longevity, 0, 10) / 2.5)));
  const sillage = Math.max(0, Math.min(4, Math.round(clamp(performance.sillage ?? performance.projection, 0, 10) / 2.5)));
  const price = Number(productRow.price || 0);
  const valueIndex = price <= 1800 ? 4 : price <= 3000 ? 3 : price <= 5000 ? 2 : 1;
  const genderText = `${metadata.gender || ""} ${productRow.type_ar || ""} ${productRow.type_en || ""}`.toLowerCase();
  const gender = genderText.includes("women") || genderText.includes("نسائي")
    ? { women: 82, unisex: 16, men: 2 }
    : genderText.includes("men") || genderText.includes("رجالي")
      ? { women: 3, unisex: 18, men: 79 }
      : { women: 16, unisex: 74, men: 10 };
  const seasonText = [...(metadata.seasons || []), ...(metadata.usageTimes || [])].join(" ").toLowerCase();
  const wear = {
    winter: /winter|شتاء/.test(seasonText) ? 92 : 42,
    spring: /spring|ربيع/.test(seasonText) ? 86 : 48,
    summer: /summer|صيف/.test(seasonText) ? 88 : 36,
    autumn: /autumn|fall|خريف/.test(seasonText) ? 90 : 52,
    day: /day|daily|morning|نهار|صباح|يومي/.test(seasonText) ? 91 : 58,
    night: /night|evening|ليل|مساء/.test(seasonText) ? 93 : 64
  };
  return {
    scent: { dislike: 2, not_for_me: 4, acceptable: 12, good: 38, loved: 44 },
    wear,
    longevity: centeredDistribution("longevity", longevity),
    sillage: centeredDistribution("sillage", sillage),
    value: centeredDistribution("value", valueIndex),
    gender: normalized(gender)
  };
}

function ensureProductPerformance(productId) {
  const id = clean(productId, 120);
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  if (!product) return null;
  db.prepare("INSERT OR IGNORE INTO product_performance_settings(product_id) VALUES(?)").run(id);
  const editorial = db.prepare("SELECT product_id FROM product_editorial_performance WHERE product_id = ?").get(id);
  if (!editorial) {
    db.prepare("INSERT INTO product_editorial_performance(product_id, distributions_json) VALUES(?, ?)")
      .run(id, JSON.stringify(inferEditorial(product)));
  }
  return product;
}

function sanitizeVote(input = {}, { partial = false } = {}) {
  const vote = {};
  for (const metric of ["scent", "longevity", "sillage", "value", "gender"]) {
    const value = clean(input[metric], 40);
    if (PERFORMANCE_OPTIONS[metric].includes(value)) vote[metric] = value;
  }
  const wear = Array.isArray(input.wear)
    ? [...new Set(input.wear.map((value) => clean(value, 40)).filter((value) => PERFORMANCE_OPTIONS.wear.includes(value)))]
    : [];
  if (wear.length || (partial && Object.prototype.hasOwnProperty.call(input, "wear"))) vote.wear = wear;
  const answeredMetricCount = Object.keys(vote).length;
  const experienceLevel = clean(input.experienceLevel, 40);
  if (["first_try", "several_times", "regular"].includes(experienceLevel)) vote.experienceLevel = experienceLevel;
  const comment = clean(input.comment, 1000);
  if (comment) vote.comment = comment;
  if (!partial && !answeredMetricCount) throw Object.assign(new Error("اختر مؤشرًا واحدًا على الأقل."), { code: "EMPTY_PERFORMANCE_VOTE" });
  return vote;
}

function customerMetrics(rows) {
  const metrics = {};
  for (const [metric, keys] of Object.entries(PERFORMANCE_OPTIONS)) {
    const counts = Object.fromEntries(keys.map((key) => [key, 0]));
    let participants = 0;
    let verifiedParticipants = 0;
    for (const row of rows) {
      const vote = parseJSON(row.data_json, {});
      if (metric === "wear") {
        const selected = Array.isArray(vote.wear) ? vote.wear.filter((key) => keys.includes(key)) : [];
        if (!selected.length) continue;
        participants += 1;
        if (row.verified_purchase) verifiedParticipants += 1;
        for (const key of selected) counts[key] += 1;
      } else if (keys.includes(vote[metric])) {
        participants += 1;
        if (row.verified_purchase) verifiedParticipants += 1;
        counts[vote[metric]] += 1;
      }
    }
    const distribution = Object.fromEntries(keys.map((key) => [key, participants ? round(counts[key] / participants * 100, 1) : 0]));
    const average = metric === "wear" || !participants ? null : round(keys.reduce((sum, key, index) => sum + counts[key] * (index + 1), 0) / participants, 2);
    metrics[metric] = { counts, distribution, average, participants, verifiedParticipants };
  }
  return metrics;
}

function editorialMetrics(distributions = {}) {
  return Object.fromEntries(Object.keys(PERFORMANCE_OPTIONS).map((metric) => {
    const distribution = objectDistribution(metric, distributions[metric]);
    const total = distributionTotal(distribution);
    const average = metric === "wear" || !total ? null : round(
      PERFORMANCE_OPTIONS[metric].reduce((sum, key, index) => sum + Number(distribution[key] || 0) * (index + 1), 0) / total,
      2
    );
    return [metric, { distribution, average, available: total > 0 }];
  }));
}

function mergeMetric(metric, editorial, customer, settings, verifiedVoteCount) {
  const editorialAvailable = editorial.available;
  const customerAvailable = customer.participants > 0;
  const canBlend = settings.showOverallResult !== false && editorialAvailable && customerAvailable && verifiedVoteCount >= settings.minimumVerifiedVotes;
  let mode = editorialAvailable ? "editorial_only" : customerAvailable ? "customer_only" : "empty";
  let distribution = editorialAvailable ? editorial.distribution : customer.distribution;
  if (canBlend) {
    mode = "blended";
    const totalWeight = settings.editorialWeight + settings.customerWeight || 100;
    distribution = Object.fromEntries(PERFORMANCE_OPTIONS[metric].map((key) => [
      key,
      round((Number(editorial.distribution[key] || 0) * settings.editorialWeight
        + Number(customer.distribution[key] || 0) * settings.customerWeight) / totalWeight, 1)
    ]));
    if (metric !== "wear") distribution = normalized(distribution);
  } else if (editorialAvailable && customerAvailable) {
    mode = "preliminary";
  }
  const total = distributionTotal(distribution);
  const average = metric === "wear" || !total ? null : round(
    PERFORMANCE_OPTIONS[metric].reduce((sum, key, index) => sum + Number(distribution[key] || 0) * (index + 1), 0) / total,
    2
  );
  return {
    mode,
    distribution,
    average,
    editorial: editorialAvailable ? editorial : null,
    customers: customerAvailable ? customer : { ...customer, distribution: objectDistribution(metric), counts: objectDistribution(metric) },
    participants: customer.participants,
    verifiedParticipants: customer.verifiedParticipants
  };
}

function settingsFor(productId) {
  ensureProductPerformance(productId);
  const row = db.prepare("SELECT * FROM product_performance_settings WHERE product_id = ?").get(clean(productId, 120));
  if (!row) return null;
  return {
    enabled: Boolean(row.enabled),
    visibleMetrics: parseJSON(row.visible_metrics_json, DEFAULT_ORDER),
    cardOrder: parseJSON(row.card_order_json, DEFAULT_ORDER),
    editorialWeight: Number(row.editorial_weight),
    customerWeight: Number(row.customer_weight),
    minimumVerifiedVotes: Number(row.minimum_verified_votes),
    allowUnverified: Boolean(row.allow_unverified),
    showOverallResult: Boolean(row.show_overall_result),
    updatedAt: row.updated_at
  };
}

export function recalculateProductPerformance(productId) {
  const id = clean(productId, 120);
  const product = ensureProductPerformance(id);
  if (!product) return null;
  const settings = settingsFor(id);
  const editorialRow = db.prepare("SELECT * FROM product_editorial_performance WHERE product_id = ?").get(id);
  const rows = db.prepare("SELECT * FROM product_performance_votes WHERE product_id = ? AND status = 'active'").all(id);
  const editorial = editorialMetrics(parseJSON(editorialRow?.distributions_json, {}));
  const officialRows = settings.allowUnverified ? rows : rows.filter((row) => Boolean(row.verified_purchase));
  const customers = customerMetrics(officialRows);
  const verifiedVoteCount = rows.filter((row) => Boolean(row.verified_purchase)).length;
  const imported = db.prepare("SELECT * FROM imported_performance_summaries WHERE product_id = ? ORDER BY id DESC").all(id);
  const metrics = Object.fromEntries(Object.keys(PERFORMANCE_OPTIONS).map((metric) => [
    metric,
    mergeMetric(metric, editorial[metric], customers[metric], settings, verifiedVoteCount)
  ]));
  const payload = {
    productId: id,
    enabled: settings.enabled,
    visibleMetrics: settings.visibleMetrics,
    cardOrder: settings.cardOrder,
    mode: settings.showOverallResult && verifiedVoteCount >= settings.minimumVerifiedVotes
      ? "blended"
      : rows.length ? (editorialRow ? "preliminary" : "customer_only") : "editorial_only",
    counts: {
      editorial: editorialRow ? 1 : 0,
      imported: imported.reduce((sum, row) => sum + Number(row.imported_count || 0), 0),
      customers: rows.length,
      verifiedCustomers: verifiedVoteCount,
      unverifiedCustomers: rows.length - verifiedVoteCount
    },
    weights: { editorial: settings.editorialWeight, customers: settings.customerWeight },
    minimumVerifiedVotes: settings.minimumVerifiedVotes,
    allowUnverified: settings.allowUnverified,
    showOverallResult: settings.showOverallResult,
    metrics,
    editorialDetails: parseJSON(editorialRow?.details_json, {}),
    officialProductGender: product.type_ar || product.type_en || "",
    lastCalculatedAt: new Date().toISOString()
  };
  db.prepare(`INSERT INTO product_performance_aggregates(product_id, payload_json, updated_at)
    VALUES(?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(product_id) DO UPDATE SET payload_json=excluded.payload_json,updated_at=CURRENT_TIMESTAMP`)
    .run(id, JSON.stringify(payload));
  return payload;
}

export function productPerformance(productId, userId = null) {
  const id = clean(productId, 120);
  let row = db.prepare("SELECT payload_json, updated_at FROM product_performance_aggregates WHERE product_id = ?").get(id);
  if (!row) {
    const calculated = recalculateProductPerformance(id);
    if (!calculated) return null;
    row = { payload_json: JSON.stringify(calculated), updated_at: calculated.lastCalculatedAt };
  }
  const payload = parseJSON(row.payload_json, null);
  if (!payload) return null;
  const currentVote = userId
    ? db.prepare("SELECT id,data_json,verified_purchase,updated_at FROM product_performance_votes WHERE product_id=? AND customer_id=? AND status='active'").get(id, Number(userId))
    : null;
  const settings = settingsFor(id);
  const eligibleItem = userId ? db.prepare(`SELECT oi.id FROM order_items oi JOIN orders o ON o.id=oi.order_id
    WHERE oi.product_id=? AND o.user_id=? AND o.workflow_status='delivered' ORDER BY oi.id DESC LIMIT 1`).get(id, Number(userId)) : null;
  return {
    ...payload,
    eligibility: userId ? {
      authenticated: true,
      canRate: Boolean(currentVote || eligibleItem || settings.allowUnverified),
      verifiedPurchase: Boolean(eligibleItem || currentVote?.verified_purchase),
      orderItemId: eligibleItem ? Number(eligibleItem.id) : null,
      allowUnverified: settings.allowUnverified
    } : { authenticated: false, canRate: false, verifiedPurchase: false, orderItemId: null, allowUnverified: settings.allowUnverified },
    currentVote: currentVote ? {
      id: Number(currentVote.id),
      data: parseJSON(currentVote.data_json, {}),
      verifiedPurchase: Boolean(currentVote.verified_purchase),
      updatedAt: currentVote.updated_at
    } : null
  };
}

function verifyOrderItem(userId, productId, orderItemId) {
  if (!orderItemId) return null;
  return db.prepare(`SELECT oi.id FROM order_items oi JOIN orders o ON o.id=oi.order_id
    WHERE oi.id=? AND oi.product_id=? AND o.user_id=? AND o.workflow_status='delivered'`)
    .get(Number(orderItemId), clean(productId, 120), Number(userId));
}

export function submitProductPerformanceVote(productId, customerId, input = {}) {
  const id = clean(productId, 120);
  if (!ensureProductPerformance(id)) throw Object.assign(new Error("المنتج غير موجود."), { code: "PRODUCT_NOT_FOUND" });
  const incoming = sanitizeVote(input.data || input, { partial: true });
  const settings = settingsFor(id);
  const requestedItem = input.orderItemId || db.prepare(`SELECT oi.id FROM order_items oi JOIN orders o ON o.id=oi.order_id
    WHERE oi.product_id=? AND o.user_id=? AND o.workflow_status='delivered' ORDER BY oi.id DESC LIMIT 1`).get(id, Number(customerId))?.id;
  const verifiedItem = verifyOrderItem(customerId, id, requestedItem);
  const existingVote = db.prepare("SELECT id,data_json FROM product_performance_votes WHERE customer_id=? AND product_id=?").get(Number(customerId), id);
  const data = sanitizeVote({ ...parseJSON(existingVote?.data_json, {}), ...incoming });
  if (!verifiedItem && !settings.allowUnverified && !existingVote) throw Object.assign(new Error("يمكن إضافة تقييم الأداء بعد استلام طلب يحتوي على هذا العطر."), { code: "PERFORMANCE_PURCHASE_REQUIRED" });
  let reviewId = input.reviewId ? Number(input.reviewId) : null;
  if (reviewId && !db.prepare("SELECT id FROM product_reviews WHERE id=? AND product_id=? AND customer_id=?").get(reviewId, id, Number(customerId))) reviewId = null;
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare(`INSERT INTO product_performance_votes(customer_id,product_id,review_id,order_item_id,verified_purchase,data_json,status)
      VALUES(?,?,?,?,?,?,'active')
      ON CONFLICT(customer_id,product_id) DO UPDATE SET
        review_id=COALESCE(excluded.review_id,review_id),
        order_item_id=COALESCE(excluded.order_item_id,order_item_id),
        verified_purchase=MAX(verified_purchase,excluded.verified_purchase),
        data_json=excluded.data_json,status='active',updated_at=CURRENT_TIMESTAMP`)
      .run(Number(customerId), id, reviewId, verifiedItem ? Number(verifiedItem.id) : null, verifiedItem ? 1 : 0, JSON.stringify(data));
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  const aggregate = recalculateProductPerformance(id);
  return { aggregate, vote: productPerformance(id, customerId).currentVote };
}

export function savePerformanceVoteFromFeedback({ productId, customerId, reviewId = null, orderItemId = null, data = null } = {}) {
  if (!data || !customerId || !productId) return null;
  return submitProductPerformanceVote(productId, customerId, { data, reviewId, orderItemId });
}

function validateEditorial(input = {}) {
  const output = {};
  for (const metric of Object.keys(PERFORMANCE_OPTIONS)) {
    const distribution = objectDistribution(metric, input[metric]);
    const total = distributionTotal(distribution);
    if (DISTRIBUTION_METRICS.has(metric) && total > 0 && Math.abs(total - 100) > 0.11) {
      throw Object.assign(new Error(`يجب أن يساوي مجموع توزيع ${metric} نسبة 100%.`), { code: "INVALID_PERFORMANCE_DISTRIBUTION", metric });
    }
    output[metric] = distribution;
  }
  return output;
}

export function productPerformanceAdmin(productId, includeImported = false) {
  const id = clean(productId, 120);
  if (!ensureProductPerformance(id)) return null;
  const settings = settingsFor(id);
  const editorialRow = db.prepare("SELECT * FROM product_editorial_performance WHERE product_id=?").get(id);
  const votes = db.prepare(`SELECT v.id,v.customer_id customerId,v.verified_purchase verifiedPurchase,v.status,v.updated_at updatedAt,
    u.name customerName FROM product_performance_votes v JOIN users u ON u.id=v.customer_id
    WHERE v.product_id=? ORDER BY datetime(v.updated_at) DESC LIMIT 25`).all(id).map((row) => ({
      ...row, id: Number(row.id), customerId: Number(row.customerId), verifiedPurchase: Boolean(row.verifiedPurchase)
    }));
  const imports = includeImported ? db.prepare("SELECT * FROM imported_performance_summaries WHERE product_id=? ORDER BY id DESC").all(id).map((row) => ({
    id: Number(row.id), count: Number(row.imported_count), source: row.source, importDate: row.import_date,
    reason: row.change_reason, createdAt: row.created_at
  })) : [];
  return {
    settings,
    editorial: parseJSON(editorialRow?.distributions_json, {}),
    editorialDetails: parseJSON(editorialRow?.details_json, {}),
    aggregate: productPerformance(id),
    votes,
    imports
  };
}

export function saveProductPerformanceAdmin(productId, input = {}, actor = {}) {
  const id = clean(productId, 120);
  if (!ensureProductPerformance(id)) throw Object.assign(new Error("المنتج غير موجود."), { code: "PRODUCT_NOT_FOUND" });
  const editorial = validateEditorial(input.editorial || {});
  const visible = Array.isArray(input.visibleMetrics) ? input.visibleMetrics.filter((metric) => DEFAULT_ORDER.includes(metric)) : DEFAULT_ORDER;
  const order = Array.isArray(input.cardOrder) ? input.cardOrder.filter((metric) => DEFAULT_ORDER.includes(metric)) : DEFAULT_ORDER;
  const editorialWeight = clamp(input.weights?.editorial ?? 30);
  const customerWeight = clamp(input.weights?.customers ?? 70);
  if (Math.abs(editorialWeight + customerWeight - 100) > 0.11) throw Object.assign(new Error("يجب أن يساوي مجموع وزن ORIGO والعملاء 100%."), { code: "INVALID_PERFORMANCE_WEIGHTS" });
  const minimum = Math.max(0, Math.min(1000, Math.floor(Number(input.minimumVerifiedVotes ?? 5))));
  const editorialDetails = {
    longevityMinHours: input.editorialDetails?.longevityMinHours == null ? null : clamp(input.editorialDetails.longevityMinHours, 0, 72),
    longevityMaxHours: input.editorialDetails?.longevityMaxHours == null ? null : clamp(input.editorialDetails.longevityMaxHours, 0, 72),
    reviewerName: clean(input.editorialDetails?.reviewerName, 160),
    reviewerNotes: clean(input.editorialDetails?.reviewerNotes, 2000),
    reviewedAt: clean(input.editorialDetails?.reviewedAt, 30)
  };
  if (editorialDetails.longevityMinHours != null && editorialDetails.longevityMaxHours != null && editorialDetails.longevityMinHours > editorialDetails.longevityMaxHours) throw Object.assign(new Error("يجب ألا تتجاوز ساعات الثبات الدنيا الحد الأعلى."), { code: "INVALID_LONGEVITY_HOURS" });
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare(`INSERT INTO product_performance_settings(product_id,enabled,visible_metrics_json,card_order_json,editorial_weight,customer_weight,minimum_verified_votes,allow_unverified,show_overall_result,updated_at)
      VALUES(?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)
      ON CONFLICT(product_id) DO UPDATE SET enabled=excluded.enabled,visible_metrics_json=excluded.visible_metrics_json,
      card_order_json=excluded.card_order_json,editorial_weight=excluded.editorial_weight,customer_weight=excluded.customer_weight,
      minimum_verified_votes=excluded.minimum_verified_votes,allow_unverified=excluded.allow_unverified,
      show_overall_result=excluded.show_overall_result,updated_at=CURRENT_TIMESTAMP`)
      .run(id, input.enabled === false ? 0 : 1, JSON.stringify(visible.length ? visible : DEFAULT_ORDER), JSON.stringify(order.length ? order : DEFAULT_ORDER), editorialWeight, customerWeight, minimum, input.allowUnverified ? 1 : 0, input.showOverallResult === false ? 0 : 1);
    db.prepare(`INSERT INTO product_editorial_performance(product_id,distributions_json,details_json,updated_by,updated_at)
      VALUES(?,?,?,?,CURRENT_TIMESTAMP)
      ON CONFLICT(product_id) DO UPDATE SET distributions_json=excluded.distributions_json,details_json=excluded.details_json,updated_by=excluded.updated_by,updated_at=CURRENT_TIMESTAMP`)
      .run(id, JSON.stringify(editorial), JSON.stringify(editorialDetails), actor.id ? Number(actor.id) : null);
    if (input.imported && Number(input.imported.count) > 0) {
      if (!actor.allowImported) throw Object.assign(new Error("لا تملك صلاحية استيراد تقييمات سابقة."), { code: "IMPORTED_REVIEWS_FORBIDDEN" });
      const source = clean(input.imported.source, 300);
      const importDate = clean(input.imported.importDate, 30);
      const reason = clean(input.imported.reason, 500);
      if (!source || !importDate || !reason) throw Object.assign(new Error("أدخل المصدر وتاريخ الاستيراد وسبب التغيير."), { code: "IMPORTED_REVIEWS_METADATA_REQUIRED" });
      db.prepare(`INSERT INTO imported_performance_summaries(product_id,imported_count,source,import_date,change_reason,distributions_json,created_by)
        VALUES(?,?,?,?,?,?,?)`).run(id, Math.floor(Number(input.imported.count)), source, importDate, reason, JSON.stringify(input.imported.distributions || {}), Number(actor.id));
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  recordActivity(actor.id || null, "product_performance_saved", "product", id, {
    weights: { editorial: editorialWeight, customers: customerWeight }, minimumVerifiedVotes: minimum,
    imported: Boolean(input.imported && Number(input.imported.count) > 0)
  });
  recalculateProductPerformance(id);
  return productPerformanceAdmin(id, Boolean(actor.allowImported));
}

export function setProductPerformanceVoteStatus(voteId, status, actorId, reason = "") {
  const safeStatus = status === "hidden" ? "hidden" : "active";
  const vote = db.prepare("SELECT * FROM product_performance_votes WHERE id=?").get(Number(voteId));
  if (!vote) return null;
  const safeReason = clean(reason, 500);
  if (safeStatus === "hidden" && !safeReason) throw Object.assign(new Error("سبب الإخفاء مطلوب."), { code: "PERFORMANCE_HIDE_REASON_REQUIRED" });
  db.prepare("UPDATE product_performance_votes SET status=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").run(safeStatus, Number(voteId));
  recordActivity(actorId || null, safeStatus === "hidden" ? "performance_vote_hidden" : "performance_vote_restored", "performance_vote", String(voteId), { productId: vote.product_id, reason: safeReason });
  return recalculateProductPerformance(vote.product_id);
}

export function reportProductPerformanceVote(voteId, reporterId, reason = "") {
  const safeReason = clean(reason, 500);
  if (!safeReason) throw Object.assign(new Error("أدخل سبب الإبلاغ."), { code: "REPORT_REASON_REQUIRED" });
  const vote = db.prepare("SELECT id FROM product_performance_votes WHERE id=? AND status='active'").get(Number(voteId));
  if (!vote) return null;
  db.prepare(`INSERT INTO product_performance_vote_reports(vote_id,reporter_id,reason)
    VALUES(?,?,?) ON CONFLICT(vote_id,reporter_id) DO UPDATE SET reason=excluded.reason,status='open',created_at=CURRENT_TIMESTAMP`)
    .run(Number(voteId), Number(reporterId), safeReason);
  return { reported: true };
}

export function performanceProductsAdmin({ query = "", status = "all", page = 1, pageSize = 20 } = {}) {
  const safeQuery = clean(query, 160).toLowerCase();
  let products = db.prepare("SELECT id,name_ar nameAr,name_en nameEn,brand,image FROM products WHERE category='perfume' ORDER BY datetime(updated_at) DESC").all();
  products = products.map((product) => ({ ...product, performance: productPerformanceAdmin(product.id, false) }));
  if (safeQuery) products = products.filter((product) => `${product.nameAr} ${product.nameEn} ${product.brand}`.toLowerCase().includes(safeQuery));
  if (status === "enabled") products = products.filter((product) => product.performance.settings.enabled);
  if (status === "disabled") products = products.filter((product) => !product.performance.settings.enabled);
  if (status === "no-votes") products = products.filter((product) => !product.performance.aggregate.counts.customers);
  const total = products.length;
  const safePageSize = Math.max(1, Math.min(100, Number(pageSize) || 20));
  const safePage = Math.max(1, Number(page) || 1);
  return { items: products.slice((safePage - 1) * safePageSize, safePage * safePageSize), total, page: safePage, pageSize: safePageSize, pages: Math.max(1, Math.ceil(total / safePageSize)) };
}

export function recalculateAllProductPerformance() {
  const ids = db.prepare("SELECT id FROM products WHERE category='perfume'").all().map((row) => row.id);
  return { updated: ids.map((id) => recalculateProductPerformance(id)).filter(Boolean).length };
}

for (const product of db.prepare("SELECT id FROM products WHERE category='perfume'").all()) {
  ensureProductPerformance(product.id);
  if (!db.prepare("SELECT product_id FROM product_performance_aggregates WHERE product_id=?").get(product.id)) recalculateProductPerformance(product.id);
}
