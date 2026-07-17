import { createHash, randomBytes } from "node:crypto";
import { db } from "./db.mjs";
import { savePerformanceVoteFromFeedback } from "./performance-service.mjs";

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const hash = (value) => createHash("sha256").update(String(value || "")).digest("hex");
const json = (value, fallback = {}) => {
  try { return JSON.parse(value || "") ?? fallback; } catch { return fallback; }
};

function addColumns(table, columns) {
  const existing = new Set(db.prepare(`PRAGMA table_info(${table})`).all().map((column) => column.name));
  for (const [name, definition] of columns) {
    if (!existing.has(name)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${name} ${definition}`);
  }
}

db.exec(`
  CREATE TABLE IF NOT EXISTS guest_cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token_hash TEXT NOT NULL,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK(quantity BETWEEN 1 AND 10),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(token_hash, product_id)
  );
  CREATE INDEX IF NOT EXISTS idx_guest_cart_token ON guest_cart_items(token_hash);

  CREATE TABLE IF NOT EXISTS checkout_settings (
    id INTEGER PRIMARY KEY CHECK(id = 1),
    shipping_enabled INTEGER NOT NULL DEFAULT 1,
    free_shipping_enabled INTEGER NOT NULL DEFAULT 1,
    free_shipping_threshold REAL NOT NULL DEFAULT 3000,
    default_shipping_fee REAL NOT NULL DEFAULT 65,
    delivery_min_days INTEGER NOT NULL DEFAULT 2,
    delivery_max_days INTEGER NOT NULL DEFAULT 3,
    cod_enabled INTEGER NOT NULL DEFAULT 1,
    paymob_enabled INTEGER NOT NULL DEFAULT 0,
    marketing_insights_min_responses INTEGER NOT NULL DEFAULT 100,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  INSERT OR IGNORE INTO checkout_settings(id) VALUES(1);

  CREATE TABLE IF NOT EXISTS governorates (
    id INTEGER PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS delivery_areas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    governorate_id INTEGER NOT NULL REFERENCES governorates(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES delivery_areas(id) ON DELETE SET NULL,
    area_type TEXT NOT NULL DEFAULT 'city',
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    shipping_fee REAL,
    active INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0,
    UNIQUE(governorate_id, name_ar)
  );
  CREATE INDEX IF NOT EXISTS idx_delivery_areas_governorate ON delivery_areas(governorate_id, active, sort_order);

  CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE COLLATE NOCASE,
    discount_type TEXT NOT NULL CHECK(discount_type IN ('percent','fixed')),
    discount_value REAL NOT NULL,
    minimum_subtotal REAL NOT NULL DEFAULT 0,
    maximum_discount REAL,
    starts_at TEXT,
    expires_at TEXT,
    usage_limit INTEGER,
    used_count INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  INSERT OR IGNORE INTO coupons(code, discount_type, discount_value, minimum_subtotal, maximum_discount)
  VALUES('ORIGO10', 'percent', 10, 500, 1000);

  CREATE TABLE IF NOT EXISTS saved_addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label TEXT NOT NULL DEFAULT 'المنزل',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    governorate_id INTEGER NOT NULL REFERENCES governorates(id),
    area_id INTEGER NOT NULL REFERENCES delivery_areas(id),
    street_address TEXT NOT NULL,
    building TEXT NOT NULL DEFAULT '',
    floor TEXT NOT NULL DEFAULT '',
    apartment TEXT NOT NULL DEFAULT '',
    landmark TEXT NOT NULL DEFAULT '',
    is_default INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS feedback_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    token_hash TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','opened','submitted','expired')),
    opened_at TEXT,
    submitted_at TEXT,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS experience_feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id INTEGER NOT NULL UNIQUE REFERENCES feedback_requests(id) ON DELETE CASCADE,
    order_id INTEGER NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    overall_score INTEGER NOT NULL CHECK(overall_score BETWEEN 1 AND 5),
    product_quality_score INTEGER CHECK(product_quality_score BETWEEN 1 AND 5),
    website_usability_score INTEGER CHECK(website_usability_score BETWEEN 1 AND 5),
    delivery_speed_score INTEGER CHECK(delivery_speed_score BETWEEN 1 AND 5),
    packaging_score INTEGER CHECK(packaging_score BETWEEN 1 AND 5),
    customer_service_score INTEGER CHECK(customer_service_score BETWEEN 1 AND 5),
    pricing_clarity_score INTEGER CHECK(pricing_clarity_score BETWEEN 1 AND 5),
    payment_experience_score INTEGER CHECK(payment_experience_score BETWEEN 1 AND 5),
    liked_json TEXT NOT NULL DEFAULT '[]',
    liked_other TEXT NOT NULL DEFAULT '',
    problem_state TEXT NOT NULL DEFAULT 'none',
    problem_category TEXT NOT NULL DEFAULT '',
    problem_description TEXT NOT NULL DEFAULT '',
    suggestions TEXT NOT NULL DEFAULT '',
    additional_notes TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS product_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    order_item_id INTEGER NOT NULL UNIQUE REFERENCES order_items(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
    customer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
    review_text TEXT NOT NULL DEFAULT '',
    verified_purchase INTEGER NOT NULL DEFAULT 1,
    moderation_status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS support_cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
    feedback_id INTEGER REFERENCES experience_feedback(id) ON DELETE SET NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'high',
    status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open','in_progress','resolved','closed')),
    description TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS survey_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metric_key TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    options_json TEXT NOT NULL DEFAULT '[]',
    required INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS marketing_insights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metric_key TEXT NOT NULL,
    period_days INTEGER NOT NULL DEFAULT 90,
    value REAL NOT NULL,
    response_count INTEGER NOT NULL,
    template TEXT NOT NULL DEFAULT 'story',
    channel TEXT NOT NULL DEFAULT 'instagram',
    status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','approved','archived')),
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS loyalty_tiers (
    id TEXT PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    min_points INTEGER NOT NULL,
    max_points INTEGER,
    benefits_json TEXT NOT NULL DEFAULT '[]',
    icon TEXT NOT NULL DEFAULT 'crown',
    color TEXT NOT NULL DEFAULT '#6f001c',
    is_active INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS customer_loyalty (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    balance INTEGER NOT NULL DEFAULT 0,
    lifetime_earned INTEGER NOT NULL DEFAULT 0,
    lifetime_redeemed INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS customer_notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL DEFAULT 'order',
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL DEFAULT '',
    body_ar TEXT NOT NULL DEFAULT '',
    body_en TEXT NOT NULL DEFAULT '',
    read_at TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS customer_wishlist (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id, product_id)
  );
  CREATE TABLE IF NOT EXISTS customer_payment_methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    provider_token TEXT NOT NULL,
    brand TEXT NOT NULL DEFAULT '',
    last4 TEXT NOT NULL DEFAULT '',
    expiry_label TEXT NOT NULL DEFAULT '',
    is_default INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS fragrance_finder_sessions (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    session_json TEXT NOT NULL DEFAULT '{}',
    current_step INTEGER NOT NULL DEFAULT 0 CHECK(current_step BETWEEN 0 AND 8),
    completed_at TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

addColumns("products", [
  ["stock_quantity", "INTEGER NOT NULL DEFAULT 25"],
  ["reserved_quantity", "INTEGER NOT NULL DEFAULT 0"],
  ["track_inventory", "INTEGER NOT NULL DEFAULT 1"]
]);
addColumns("orders", [
  ["email", "TEXT NOT NULL DEFAULT ''"],
  ["area_id", "INTEGER"],
  ["address_snapshot_json", "TEXT NOT NULL DEFAULT '{}'"],
  ["product_discount_total", "REAL NOT NULL DEFAULT 0"],
  ["coupon_code", "TEXT NOT NULL DEFAULT ''"],
  ["coupon_discount_total", "REAL NOT NULL DEFAULT 0"],
  ["loyalty_points", "INTEGER NOT NULL DEFAULT 0"],
  ["payment_method_code", "TEXT NOT NULL DEFAULT 'cod'"],
  ["estimated_delivery_from", "TEXT"],
  ["estimated_delivery_to", "TEXT"],
  ["tracking_url", "TEXT NOT NULL DEFAULT ''"],
  ["carrier_code", "TEXT NOT NULL DEFAULT ''"],
  ["shipped_at", "TEXT"],
  ["delivered_at", "TEXT"],
  ["courier_name", "TEXT NOT NULL DEFAULT ''"],
  ["courier_phone", "TEXT NOT NULL DEFAULT ''"],
  ["delivery_window_start", "TEXT"],
  ["delivery_window_end", "TEXT"],
  ["access_token_hash", "TEXT NOT NULL DEFAULT ''"],
  ["loyalty_awarded", "INTEGER NOT NULL DEFAULT 0"]
]);
addColumns("users", [["avatar_url", "TEXT NOT NULL DEFAULT ''"]]);
addColumns("order_items", [
  ["original_unit_price", "REAL NOT NULL DEFAULT 0"],
  ["discount_total", "REAL NOT NULL DEFAULT 0"],
  ["image", "TEXT NOT NULL DEFAULT ''"],
  ["size", "TEXT NOT NULL DEFAULT ''"],
  ["concentration", "TEXT NOT NULL DEFAULT ''"],
  ["snapshot_json", "TEXT NOT NULL DEFAULT '{}'" ]
]);
addColumns("order_events", [
  ["title_ar", "TEXT NOT NULL DEFAULT ''"],
  ["title_en", "TEXT NOT NULL DEFAULT ''"],
  ["created_by", "INTEGER"],
  ["metadata_json", "TEXT NOT NULL DEFAULT '{}'" ]
]);

const governorateSeed = [
  [1,"cairo","القاهرة","Cairo"],[2,"giza","الجيزة","Giza"],[3,"alexandria","الإسكندرية","Alexandria"],
  [4,"dakahlia","الدقهلية","Dakahlia"],[5,"red-sea","البحر الأحمر","Red Sea"],[6,"beheira","البحيرة","Beheira"],
  [7,"fayoum","الفيوم","Fayoum"],[8,"gharbia","الغربية","Gharbia"],[9,"ismailia","الإسماعيلية","Ismailia"],
  [10,"monufia","المنوفية","Monufia"],[11,"minya","المنيا","Minya"],[12,"qalyubia","القليوبية","Qalyubia"],
  [13,"new-valley","الوادي الجديد","New Valley"],[14,"suez","السويس","Suez"],[15,"aswan","أسوان","Aswan"],
  [16,"assiut","أسيوط","Assiut"],[17,"beni-suef","بني سويف","Beni Suef"],[18,"port-said","بورسعيد","Port Said"],
  [19,"damietta","دمياط","Damietta"],[20,"sharqia","الشرقية","Sharqia"],[21,"south-sinai","جنوب سيناء","South Sinai"],
  [22,"kafr-el-sheikh","كفر الشيخ","Kafr El Sheikh"],[23,"matrouh","مطروح","Matrouh"],[24,"luxor","الأقصر","Luxor"],
  [25,"qena","قنا","Qena"],[26,"north-sinai","شمال سيناء","North Sinai"],[27,"sohag","سوهاج","Sohag"]
];
const insertGovernorate = db.prepare("INSERT OR IGNORE INTO governorates(id,code,name_ar,name_en,sort_order) VALUES(?,?,?,?,?)");
const insertArea = db.prepare("INSERT OR IGNORE INTO delivery_areas(governorate_id,area_type,name_ar,name_en,sort_order) VALUES(?,?,?,?,?)");
for (const [id, code, ar, en] of governorateSeed) {
  insertGovernorate.run(id, code, ar, en, id);
  insertArea.run(id, "city", ar, en, 1);
}
for (const [governorateId, ar, en, sort] of [
  [1,"مدينة نصر","Nasr City",2],[1,"مصر الجديدة","Heliopolis",3],[1,"المعادي","Maadi",4],[1,"التجمع الخامس","New Cairo",5],
  [2,"الدقي","Dokki",2],[2,"المهندسين","Mohandessin",3],[2,"الشيخ زايد","Sheikh Zayed",4],[2,"6 أكتوبر","6th of October",5],
  [3,"سيدي جابر","Sidi Gaber",2],[3,"سموحة","Smouha",3],[3,"المنتزه","Montaza",4]
]) insertArea.run(governorateId, "district", ar, en, sort);

const surveySeed = [
  ["overall_experience","scale","كيف تقيم تجربتك بشكل عام؟","How would you rate your overall experience?",1,1],
  ["experience_aspects","matrix","يرجى تقييم الجوانب التالية","Please rate the following aspects",1,2],
  ["liked_reasons","multi","ما الذي أعجبك في تجربتك؟","What did you like about your experience?",0,3],
  ["problem_state","choice","هل واجهت أي مشكلة؟","Did you experience any issue?",1,4],
  ["suggestions","text","اقتراحاتك لتحسين تجربتك","Your suggestions for improvement",0,5],
  ["additional_notes","text","هل ترغب في إضافة أي ملاحظات أخرى؟","Any additional notes?",0,6]
];
const insertQuestion = db.prepare("INSERT OR IGNORE INTO survey_questions(metric_key,type,title_ar,title_en,required,sort_order) VALUES(?,?,?,?,?,?)");
for (const row of surveySeed) insertQuestion.run(...row);
for (const tier of [
  ["member","عضو","Member",0,999,'["نقاط على كل طلب"]',"crown","#8a5a32",1],
  ["premium","عضو مميز","Premium member",1000,2999,'["عروض حصرية","أولوية الدعم"]',"crown","#b87822",2],
  ["vip","ORIGO VIP","ORIGO VIP",3000,null,'["شحن مجاني","عروض حصرية","مضاعفة النقاط"]',"crown","#6f001c",3]
]) db.prepare("INSERT OR IGNORE INTO loyalty_tiers(id,name_ar,name_en,min_points,max_points,benefits_json,icon,color,sort_order) VALUES(?,?,?,?,?,?,?,?,?)").run(...tier);

export function checkoutSettings() {
  const row = db.prepare("SELECT * FROM checkout_settings WHERE id = 1").get();
  return {
    shippingEnabled: Boolean(row.shipping_enabled), freeShippingEnabled: Boolean(row.free_shipping_enabled),
    freeShippingThreshold: number(row.free_shipping_threshold), defaultShippingFee: number(row.default_shipping_fee),
    deliveryMinDays: Number(row.delivery_min_days), deliveryMaxDays: Number(row.delivery_max_days),
    codEnabled: Boolean(row.cod_enabled), paymobEnabled: Boolean(row.paymob_enabled),
    marketingInsightsMinResponses: Number(row.marketing_insights_min_responses)
  };
}

export function updateCheckoutSettings(input = {}) {
  const current = checkoutSettings();
  const next = { ...current, ...input };
  db.prepare(`UPDATE checkout_settings SET shipping_enabled=?,free_shipping_enabled=?,free_shipping_threshold=?,default_shipping_fee=?,delivery_min_days=?,delivery_max_days=?,cod_enabled=?,paymob_enabled=?,marketing_insights_min_responses=?,updated_at=CURRENT_TIMESTAMP WHERE id=1`).run(
    next.shippingEnabled ? 1 : 0, next.freeShippingEnabled ? 1 : 0, Math.max(0, number(next.freeShippingThreshold)),
    Math.max(0, number(next.defaultShippingFee)), Math.max(1, Number(next.deliveryMinDays || 2)),
    Math.max(Number(next.deliveryMinDays || 2), Number(next.deliveryMaxDays || 3)), next.codEnabled ? 1 : 0,
    next.paymobEnabled ? 1 : 0, Math.max(1, Number(next.marketingInsightsMinResponses || 100))
  );
  return checkoutSettings();
}

export function listDeliveryLocations() {
  const areas = db.prepare("SELECT * FROM delivery_areas ORDER BY governorate_id,sort_order,name_ar").all();
  return db.prepare("SELECT * FROM governorates ORDER BY sort_order,name_ar").all().map((g) => ({
    id: Number(g.id), code: g.code, nameAr: g.name_ar, nameEn: g.name_en, active: Boolean(g.active),
    areas: areas.filter((a) => Number(a.governorate_id) === Number(g.id)).map((a) => ({
      id: Number(a.id), parentId: a.parent_id == null ? null : Number(a.parent_id), type: a.area_type,
      nameAr: a.name_ar, nameEn: a.name_en, shippingFee: a.shipping_fee == null ? null : number(a.shipping_fee), active: Boolean(a.active)
    }))
  }));
}

function cartTable(owner) { return owner.userId ? "carts" : "guest_cart_items"; }
function cartWhere(owner) { return owner.userId ? ["user_id", Number(owner.userId)] : ["token_hash", hash(owner.guestToken)]; }

export function getCommerceCart(owner) {
  const [column, value] = cartWhere(owner);
  return db.prepare(`SELECT c.product_id id,c.quantity,p.stock_quantity,p.reserved_quantity,p.track_inventory FROM ${cartTable(owner)} c JOIN products p ON p.id=c.product_id WHERE c.${column}=? AND p.status='published' ORDER BY c.created_at`).all(value).map((row) => ({
    id: row.id, quantity: Math.min(Number(row.quantity), Math.max(0, Number(row.stock_quantity) - Number(row.reserved_quantity)))
  })).filter((item) => item.quantity > 0);
}

export function replaceCommerceCart(owner, rawItems) {
  if (!owner.userId && !owner.guestToken) throw Object.assign(new Error("CART_OWNER_REQUIRED"), { code: "CART_OWNER_REQUIRED" });
  const merged = new Map();
  for (const item of Array.isArray(rawItems) ? rawItems : []) {
    const id = clean(item?.id, 120); const quantity = Math.max(0, Math.min(10, Math.floor(number(item?.quantity))));
    if (id && quantity) merged.set(id, Math.min(10, (merged.get(id) || 0) + quantity));
  }
  const available = db.prepare("SELECT id,stock_quantity,reserved_quantity,track_inventory FROM products WHERE id=? AND status='published'");
  const validated = [];
  for (const [id, quantity] of merged) {
    const product = available.get(id); if (!product) continue;
    const stock = product.track_inventory ? Math.max(0, Number(product.stock_quantity) - Number(product.reserved_quantity)) : 10;
    if (stock) validated.push([id, Math.min(quantity, stock, 10)]);
  }
  const [column, value] = cartWhere(owner); const table = cartTable(owner);
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare(`DELETE FROM ${table} WHERE ${column}=?`).run(value);
    const insert = owner.userId
      ? db.prepare("INSERT INTO carts(user_id,product_id,quantity) VALUES(?,?,?)")
      : db.prepare("INSERT INTO guest_cart_items(token_hash,product_id,quantity) VALUES(?,?,?)");
    for (const [id, quantity] of validated) insert.run(value, id, quantity);
    db.exec("COMMIT");
  } catch (error) { db.exec("ROLLBACK"); throw error; }
  return getCommerceCart(owner);
}

function cartRows(owner) {
  const [column, value] = cartWhere(owner);
  return db.prepare(`SELECT c.product_id,c.quantity,p.* FROM ${cartTable(owner)} c JOIN products p ON p.id=c.product_id WHERE c.${column}=? AND p.status='published' ORDER BY c.created_at`).all(value);
}

function validCoupon(code, eligibleSubtotal) {
  if (!clean(code)) return null;
  const coupon = db.prepare(`SELECT * FROM coupons WHERE code=? COLLATE NOCASE AND active=1 AND (starts_at IS NULL OR datetime(starts_at)<=datetime('now')) AND (expires_at IS NULL OR datetime(expires_at)>datetime('now'))`).get(clean(code, 50));
  if (!coupon) throw Object.assign(new Error("الكوبون غير صالح أو منتهي."), { code: "INVALID_COUPON" });
  if (eligibleSubtotal < number(coupon.minimum_subtotal)) throw Object.assign(new Error(`الحد الأدنى لاستخدام الكوبون ${number(coupon.minimum_subtotal)} جنيه.`), { code: "COUPON_MINIMUM" });
  if (coupon.usage_limit != null && Number(coupon.used_count) >= Number(coupon.usage_limit)) throw Object.assign(new Error("تم استنفاد مرات استخدام الكوبون."), { code: "COUPON_LIMIT" });
  const raw = coupon.discount_type === "percent" ? eligibleSubtotal * number(coupon.discount_value) / 100 : number(coupon.discount_value);
  return { row: coupon, code: coupon.code, discount: Math.min(eligibleSubtotal, coupon.maximum_discount == null ? raw : Math.min(raw, number(coupon.maximum_discount))) };
}

export function quoteCheckout(owner, input = {}) {
  const rows = cartRows(owner); if (!rows.length) throw Object.assign(new Error("سلة التسوق فارغة."), { code: "EMPTY_CART" });
  const items = rows.map((row) => {
    const available = row.track_inventory ? Math.max(0, Number(row.stock_quantity) - Number(row.reserved_quantity)) : 10;
    if (Number(row.quantity) > available) throw Object.assign(new Error(`الكمية المتاحة من ${row.name_ar} هي ${available}.`), { code: "OUT_OF_STOCK", productId: row.id });
    const original = row.old_price != null && number(row.old_price) > number(row.price) ? number(row.old_price) : number(row.price);
    return { id: row.product_id, productId: row.product_id, nameAr: row.name_ar, nameEn: row.name_en, brand: row.brand,
      sku: row.sku, image: row.image, concentration: row.concentration, size: json(row.sizes_json, [])[0] || "",
      quantity: Number(row.quantity), unitPrice: number(row.price), originalUnitPrice: original,
      productDiscount: (original - number(row.price)) * Number(row.quantity), lineTotal: number(row.price) * Number(row.quantity), available };
  });
  const subtotal = items.reduce((sum, item) => sum + item.originalUnitPrice * item.quantity, 0);
  const productDiscount = items.reduce((sum, item) => sum + item.productDiscount, 0);
  const discountedSubtotal = subtotal - productDiscount;
  const coupon = validCoupon(input.couponCode, discountedSubtotal);
  const afterDiscounts = Math.max(0, discountedSubtotal - number(coupon?.discount));
  const settings = checkoutSettings();
  let area = null;
  if (input.areaId) {
    area = db.prepare("SELECT a.*,g.name_ar governorate_ar,g.name_en governorate_en,g.active governorate_active FROM delivery_areas a JOIN governorates g ON g.id=a.governorate_id WHERE a.id=?").get(Number(input.areaId));
    if (!area || !area.active || !area.governorate_active) throw Object.assign(new Error("منطقة التوصيل غير متاحة."), { code: "INVALID_AREA" });
    if (input.governorateId && Number(area.governorate_id) !== Number(input.governorateId)) throw Object.assign(new Error("المنطقة لا تتبع المحافظة المختارة."), { code: "AREA_GOVERNORATE_MISMATCH" });
  }
  const free = settings.freeShippingEnabled && afterDiscounts >= settings.freeShippingThreshold;
  const shipping = free ? 0 : (area?.shipping_fee == null ? settings.defaultShippingFee : number(area.shipping_fee));
  return { items, subtotal, productDiscount, couponCode: coupon?.code || "", couponDiscount: number(coupon?.discount), shipping,
    total: afterDiscounts + shipping, loyaltyPoints: Math.floor((afterDiscounts + shipping) / 100), freeShipping: free,
    freeShippingThreshold: settings.freeShippingThreshold, amountToFreeShipping: Math.max(0, settings.freeShippingThreshold - afterDiscounts),
    shippingMethod: { code: "origo_delivery", nameAr: "توصيل ORIGO", nameEn: "ORIGO delivery", minDays: settings.deliveryMinDays, maxDays: settings.deliveryMaxDays },
    paymentMethods: [{ code: "cod", nameAr: "الدفع عند الاستلام", nameEn: "Cash on delivery", enabled: settings.codEnabled },
      { code: "paymob", nameAr: "بطاقة أو محفظة عبر Paymob", nameEn: "Card or wallet via Paymob", enabled: settings.paymobEnabled }].filter((method) => method.enabled) };
}

function normalizeEgyptPhone(value) {
  let digits = clean(value, 30).replace(/\D/g, "");
  if (digits.startsWith("0020")) digits = digits.slice(2);
  if (digits.startsWith("20")) digits = `0${digits.slice(2)}`;
  if (!/^01[0125]\d{8}$/.test(digits)) throw Object.assign(new Error("أدخل رقم موبايل مصريًا صحيحًا."), { code: "INVALID_PHONE" });
  return `+20${digits.slice(1)}`;
}

function addBusinessDays(date, count) {
  const result = new Date(date); let added = 0;
  while (added < count) { result.setUTCDate(result.getUTCDate() + 1); if (result.getUTCDay() !== 5) added += 1; }
  return result.toISOString();
}

function guestUser(owner, customer) {
  if (owner.userId) return Number(owner.userId);
  const email = `guest-${hash(owner.guestToken).slice(0,24)}@guest.origo.local`;
  let row = db.prepare("SELECT id FROM users WHERE email=?").get(email);
  if (!row) row = { id: db.prepare("INSERT INTO users(name,email,password_hash,phone,role) VALUES(?,?,?,?, 'customer')").run(clean(`${customer.firstName} ${customer.lastName}`,100), email, `guest$${randomBytes(32).toString("hex")}`, customer.phone).lastInsertRowid };
  return Number(row.id);
}

function orderNumber() { return `OR-${new Date().getUTCFullYear()}-${String(Date.now()).slice(-6)}${randomBytes(1).toString("hex").toUpperCase()}`; }
const statusTitles = {
  received:["تم استلام الطلب","Order received"], processing:["قيد التجهيز","Processing"], ready_to_ship:["جاهز للشحن","Ready to ship"],
  shipped:["تم الشحن","Shipped"], out_for_delivery:["خرج للتسليم","Out for delivery"], delivered:["تم التسليم","Delivered"],
  cancelled:["تم إلغاء الطلب","Cancelled"], returned:["تم إرجاع الطلب","Returned"]
};
const coarseStatus = (status) => ({received:"new",processing:"processing",ready_to_ship:"processing",shipped:"shipped",out_for_delivery:"shipped",delivered:"completed",cancelled:"cancelled",returned:"cancelled"}[status] || "new");

function mapOrder(row, includeAccess = false) {
  if (!row) return null;
  const items = db.prepare("SELECT * FROM order_items WHERE order_id=? ORDER BY id").all(Number(row.id)).map((item) => ({
    id:Number(item.id), productId:item.product_id, productName:item.product_name, sku:item.sku, image:item.image || "", size:item.size || "", concentration:item.concentration || "",
    unitPrice:number(item.unit_price), originalUnitPrice:number(item.original_unit_price || item.unit_price), discountTotal:number(item.discount_total), quantity:Number(item.quantity), lineTotal:number(item.line_total), snapshot:json(item.snapshot_json,{})
  }));
  const timeline = db.prepare("SELECT id,event_type type,status,title_ar titleAr,title_en titleEn,note,created_at createdAt,metadata_json metadataJson FROM order_events WHERE order_id=? AND event_type IN ('order_created','status_changed') ORDER BY id").all(Number(row.id)).map((event) => ({...event,id:Number(event.id),metadata:json(event.metadataJson,{})}));
  const address = json(row.address_snapshot_json, {});
  return { id:Number(row.id),orderNumber:row.order_number,userId:Number(row.user_id),customerName:row.customer_name,email:row.email||"",phone:row.phone,address:row.address,governorate:row.governorate,areaId:row.area_id==null?null:Number(row.area_id),addressSnapshot:address,notes:row.notes,
    paymentMethod:row.payment_method_code||row.payment_provider||"cod",paymentProvider:row.payment_provider||"cod",paymentStatus:row.payment_status||"pending",status:row.workflow_status||row.status,
    subtotal:number(row.subtotal),productDiscount:number(row.product_discount_total),couponCode:row.coupon_code||"",couponDiscount:number(row.coupon_discount_total),shipping:number(row.shipping_total),total:number(row.total),loyaltyPoints:Number(row.loyalty_points||0),
    carrierName:row.shipping_carrier||"",carrierCode:row.carrier_code||"",trackingNumber:row.tracking_number||"",trackingUrl:row.tracking_url||"",shippedAt:row.shipped_at,deliveredAt:row.delivered_at,
    estimatedDeliveryFrom:row.estimated_delivery_from,estimatedDeliveryTo:row.estimated_delivery_to,courierName:row.courier_name||"",courierPhone:row.courier_phone||"",deliveryWindowStart:row.delivery_window_start,deliveryWindowEnd:row.delivery_window_end,
    createdAt:row.created_at,updatedAt:row.updated_at,items,timeline,access:includeAccess ? true : undefined };
}

export function createCommerceOrder(owner, input = {}) {
  const firstName=clean(input.firstName,60),lastName=clean(input.lastName,60),email=clean(input.email,254),street=clean(input.streetAddress,300);
  if (firstName.length<2 || lastName.length<2) throw Object.assign(new Error("أدخل الاسم الأول والأخير."),{code:"INVALID_NAME"});
  const phone=normalizeEgyptPhone(input.phone); if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw Object.assign(new Error("البريد الإلكتروني غير صحيح."),{code:"INVALID_EMAIL"});
  if (street.length<8) throw Object.assign(new Error("أدخل عنوانًا تفصيليًا."),{code:"INVALID_ADDRESS"});
  const area=db.prepare("SELECT a.*,g.name_ar governorate_ar,g.name_en governorate_en,g.active governorate_active FROM delivery_areas a JOIN governorates g ON g.id=a.governorate_id WHERE a.id=?").get(Number(input.areaId));
  if(!area||!area.active||!area.governorate_active||Number(area.governorate_id)!==Number(input.governorateId)) throw Object.assign(new Error("اختر محافظة ومنطقة توصيل صحيحتين."),{code:"INVALID_AREA"});
  const quote=quoteCheckout(owner,{couponCode:input.couponCode,areaId:input.areaId,governorateId:input.governorateId});
  const method=clean(input.paymentMethod,30)||"cod"; if(!quote.paymentMethods.some((item)=>item.code===method)) throw Object.assign(new Error("طريقة الدفع غير متاحة."),{code:"INVALID_PAYMENT"});
  const settings=checkoutSettings(),now=new Date(),accessToken=randomBytes(32).toString("base64url"),userId=guestUser(owner,{firstName,lastName,phone});
  const addressSnapshot={country:"EG",countryAr:"مصر",governorateId:Number(input.governorateId),governorateAr:area.governorate_ar,governorateEn:area.governorate_en,areaId:Number(area.id),areaAr:area.name_ar,areaEn:area.name_en,streetAddress:street,building:clean(input.building,80),floor:clean(input.floor,30),apartment:clean(input.apartment,30),landmark:clean(input.landmark,180)};
  db.exec("BEGIN IMMEDIATE");
  try{
    for(const item of quote.items){const row=db.prepare("SELECT stock_quantity,reserved_quantity,track_inventory FROM products WHERE id=? AND status='published'").get(item.productId);const available=row?Number(row.stock_quantity)-Number(row.reserved_quantity):0;if(!row||(row.track_inventory&&available<item.quantity))throw Object.assign(new Error(`نفدت الكمية المطلوبة من ${item.nameAr}.`),{code:"OUT_OF_STOCK"});}
    const result=db.prepare(`INSERT INTO orders(order_number,user_id,customer_name,email,phone,address,governorate,area_id,address_snapshot_json,notes,payment_method,payment_provider,payment_method_code,status,workflow_status,payment_status,subtotal,product_discount_total,coupon_code,coupon_discount_total,shipping_total,total,loyalty_points,estimated_delivery_from,estimated_delivery_to,access_token_hash) VALUES(?,?,?,?,?,?,?,?,?,?, 'cod',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
      orderNumber(),userId,`${firstName} ${lastName}`,email,phone,street,area.governorate_ar,Number(area.id),JSON.stringify(addressSnapshot),clean(input.notes,1000),method,method,coarseStatus("received"),"received",method==="cod"?"pending":"awaiting_payment",quote.subtotal,quote.productDiscount,quote.couponCode,quote.couponDiscount,quote.shipping,quote.total,quote.loyaltyPoints,addBusinessDays(now,settings.deliveryMinDays),addBusinessDays(now,settings.deliveryMaxDays),hash(accessToken));
    const insert=db.prepare("INSERT INTO order_items(order_id,product_id,product_name,sku,unit_price,original_unit_price,discount_total,quantity,line_total,image,size,concentration,snapshot_json) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)");
    for(const item of quote.items){insert.run(result.lastInsertRowid,item.productId,item.nameAr,item.sku,item.unitPrice,item.originalUnitPrice,item.productDiscount,item.quantity,item.lineTotal,item.image,item.size,item.concentration,JSON.stringify(item));if(db.prepare("SELECT track_inventory FROM products WHERE id=?").get(item.productId).track_inventory)db.prepare("UPDATE products SET stock_quantity=stock_quantity-?,updated_at=CURRENT_TIMESTAMP WHERE id=?").run(item.quantity,item.productId);}
    const titles=statusTitles.received;db.prepare("INSERT INTO order_events(order_id,event_type,status,title_ar,title_en,note,created_by,metadata_json) VALUES(?,'order_created','received',?,?,?,?,?)").run(result.lastInsertRowid,titles[0],titles[1],"Order created",owner.userId||null,"{}");
    if(quote.couponCode)db.prepare("UPDATE coupons SET used_count=used_count+1,updated_at=CURRENT_TIMESTAMP WHERE code=? COLLATE NOCASE").run(quote.couponCode);
    const [column,value]=cartWhere(owner);db.prepare(`DELETE FROM ${cartTable(owner)} WHERE ${column}=?`).run(value);
    if(input.saveAddress&&owner.userId){if(input.makeDefault)db.prepare("UPDATE saved_addresses SET is_default=0 WHERE user_id=?").run(owner.userId);db.prepare("INSERT INTO saved_addresses(user_id,label,first_name,last_name,phone,email,governorate_id,area_id,street_address,building,floor,apartment,landmark,is_default) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").run(owner.userId,clean(input.addressLabel,40)||"المنزل",firstName,lastName,phone,email,Number(input.governorateId),Number(area.id),street,addressSnapshot.building,addressSnapshot.floor,addressSnapshot.apartment,addressSnapshot.landmark,input.makeDefault?1:0);}
    db.exec("COMMIT");return {order:mapOrder(db.prepare("SELECT * FROM orders WHERE id=?").get(result.lastInsertRowid)),accessToken};
  }catch(error){db.exec("ROLLBACK");throw error;}
}

export function getCommerceOrder(orderNumberValue, access = {}) {
  const row=db.prepare("SELECT * FROM orders WHERE order_number=?").get(clean(orderNumberValue,80));if(!row)return null;
  const authorized=(access.userId&&Number(row.user_id)===Number(access.userId))||(access.token&&row.access_token_hash&&hash(access.token)===row.access_token_hash)||access.staff;
  return authorized?mapOrder(row,true):null;
}

export function updateCommerceOrder(orderId, input = {}, actorId = null) {
  const current=db.prepare("SELECT * FROM orders WHERE id=?").get(Number(orderId));if(!current)return null;
  const status=clean(input.status,40)||current.workflow_status; if(!statusTitles[status])throw Object.assign(new Error("حالة الطلب غير صالحة."),{code:"INVALID_STATUS"});
  const titles=statusTitles[status],changed=status!==current.workflow_status,metadata={carrierName:clean(input.carrierName??current.shipping_carrier,120),trackingNumber:clean(input.trackingNumber??current.tracking_number,160)};
  db.exec("BEGIN IMMEDIATE");try{
    db.prepare(`UPDATE orders SET status=?,workflow_status=?,payment_status=?,shipping_carrier=?,carrier_code=?,tracking_number=?,tracking_url=?,courier_name=?,courier_phone=?,delivery_window_start=?,delivery_window_end=?,shipped_at=CASE WHEN ?='shipped' AND shipped_at IS NULL THEN CURRENT_TIMESTAMP ELSE shipped_at END,delivered_at=CASE WHEN ?='delivered' AND delivered_at IS NULL THEN CURRENT_TIMESTAMP ELSE delivered_at END,updated_at=CURRENT_TIMESTAMP WHERE id=?`).run(coarseStatus(status),status,clean(input.paymentStatus??current.payment_status,40),metadata.carrierName,clean(input.carrierCode??current.carrier_code,60),metadata.trackingNumber,clean(input.trackingUrl??current.tracking_url,1000),clean(input.courierName??current.courier_name,120),clean(input.courierPhone??current.courier_phone,40),input.deliveryWindowStart??current.delivery_window_start,input.deliveryWindowEnd??current.delivery_window_end,status,status,Number(orderId));
    if(changed){
      db.prepare("INSERT INTO order_events(order_id,event_type,status,title_ar,title_en,note,created_by,metadata_json) VALUES(?,'status_changed',?,?,?,?,?,?)").run(Number(orderId),status,titles[0],titles[1],clean(input.note,500),actorId,JSON.stringify(metadata));
      db.prepare("INSERT INTO customer_notifications(user_id,type,title_ar,title_en,body_ar,body_en) VALUES(?,'order',?,?,?,?)").run(Number(current.user_id),titles[0],titles[1],`تم تحديث طلبك ${current.order_number}.`,`Your order ${current.order_number} was updated.`);
    }
    let feedbackToken="";if(status==="delivered"){
      const existing=db.prepare("SELECT id FROM feedback_requests WHERE order_id=?").get(Number(orderId));if(!existing){feedbackToken=randomBytes(32).toString("base64url");db.prepare("INSERT INTO feedback_requests(order_id,customer_id,token_hash,expires_at) VALUES(?,?,?,datetime('now','+90 days'))").run(Number(orderId),Number(current.user_id),hash(feedbackToken));}
      if(changed&&!current.loyalty_awarded){
        db.prepare("INSERT OR IGNORE INTO customer_loyalty(user_id) VALUES(?)").run(Number(current.user_id));
        db.prepare("UPDATE customer_loyalty SET balance=balance+?,lifetime_earned=lifetime_earned+?,updated_at=CURRENT_TIMESTAMP WHERE user_id=?").run(Number(current.loyalty_points||0),Number(current.loyalty_points||0),Number(current.user_id));
        db.prepare("UPDATE orders SET loyalty_awarded=1 WHERE id=?").run(Number(orderId));
      }
    }
    db.exec("COMMIT");return {order:mapOrder(db.prepare("SELECT * FROM orders WHERE id=?").get(Number(orderId))),feedbackToken};
  }catch(error){db.exec("ROLLBACK");throw error;}
}

export function feedbackRequestForOrder(orderNumberValue, access={}){
  const order=getCommerceOrder(orderNumberValue,access);if(!order||order.status!=="delivered")return null;
  let request=db.prepare("SELECT * FROM feedback_requests WHERE order_id=?").get(order.id);let token="";
  if(!request){token=randomBytes(32).toString("base64url");db.prepare("INSERT INTO feedback_requests(order_id,customer_id,token_hash,expires_at) VALUES(?,?,?,datetime('now','+90 days'))").run(order.id,order.userId,hash(token));request=db.prepare("SELECT * FROM feedback_requests WHERE order_id=?").get(order.id);}
  else if(request.status!=="submitted"){token=randomBytes(32).toString("base64url");db.prepare("UPDATE feedback_requests SET token_hash=? WHERE id=?").run(hash(token),request.id);}
  return {request:{id:Number(request.id),status:request.status,expiresAt:request.expires_at},token,order};
}

export function getFeedbackSurvey(token){
  const request=db.prepare("SELECT * FROM feedback_requests WHERE token_hash=? AND datetime(expires_at)>datetime('now')").get(hash(token));if(!request)return null;
  if(request.status==="pending")db.prepare("UPDATE feedback_requests SET status='opened',opened_at=CURRENT_TIMESTAMP WHERE id=?").run(request.id);
  const order=mapOrder(db.prepare("SELECT * FROM orders WHERE id=?").get(request.order_id));
  const questions=db.prepare("SELECT metric_key metricKey,type,title_ar titleAr,title_en titleEn,options_json optionsJson,required,sort_order sortOrder FROM survey_questions WHERE active=1 ORDER BY sort_order").all().map(q=>({...q,required:Boolean(q.required),options:json(q.optionsJson,[])}));
  return {request:{id:Number(request.id),status:request.status,expiresAt:request.expires_at},order,questions};
}

export function submitFeedback(token,input={}){
  const request=db.prepare("SELECT * FROM feedback_requests WHERE token_hash=? AND datetime(expires_at)>datetime('now')").get(hash(token));
  if(!request)throw Object.assign(new Error("رابط التقييم غير صالح أو منتهي."),{code:"INVALID_FEEDBACK_TOKEN"});
  if(request.status==="submitted")throw Object.assign(new Error("تم إرسال هذا التقييم من قبل."),{code:"FEEDBACK_ALREADY_SUBMITTED"});
  const overall=Math.floor(number(input.overallScore));
  if(overall<1||overall>5)throw Object.assign(new Error("اختر تقييمك العام."),{code:"INVALID_SCORE"});
  const score=(key)=>{const value=input.aspectScores?.[key];return value==null?null:Math.max(1,Math.min(5,Math.floor(number(value))));};
  const state=["none","resolved","unresolved","other"].includes(input.problemState)?input.problemState:"none";
  const pendingPerformance=[];
  let supportCase=null;
  db.exec("BEGIN IMMEDIATE");
  try{
    const result=db.prepare(`INSERT INTO experience_feedback(request_id,order_id,customer_id,overall_score,product_quality_score,website_usability_score,delivery_speed_score,packaging_score,customer_service_score,pricing_clarity_score,payment_experience_score,liked_json,liked_other,problem_state,problem_category,problem_description,suggestions,additional_notes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(request.id,request.order_id,request.customer_id,overall,score("productQuality"),score("websiteUsability"),score("deliverySpeed"),score("packaging"),score("customerService"),score("pricingClarity"),score("paymentExperience"),JSON.stringify(Array.isArray(input.liked)?input.liked.slice(0,20):[]),clean(input.likedOther,200),state,clean(input.problemCategory,80),clean(input.problemDescription,1000),clean(input.suggestions,1000),clean(input.additionalNotes,1000));
    const orderItems=new Map(db.prepare("SELECT id,product_id FROM order_items WHERE order_id=?").all(request.order_id).map(i=>[Number(i.id),i]));
    for(const review of Array.isArray(input.productReviews)?input.productReviews:[]){
      const item=orderItems.get(Number(review.orderItemId));
      const rating=Math.floor(number(review.rating));
      if(!item||rating<1||rating>5)continue;
      db.prepare("INSERT OR IGNORE INTO product_reviews(order_id,order_item_id,product_id,customer_id,rating,review_text,verified_purchase) VALUES(?,?,?,?,?,?,1)").run(request.order_id,Number(review.orderItemId),item.product_id,request.customer_id,rating,clean(review.text,1000));
      const savedReview=db.prepare("SELECT id FROM product_reviews WHERE order_item_id=?").get(Number(review.orderItemId));
      if(review.performance&&savedReview)pendingPerformance.push({productId:item.product_id,customerId:request.customer_id,reviewId:Number(savedReview.id),orderItemId:Number(review.orderItemId),data:review.performance});
    }
    if(state==="unresolved"){
      const caseResult=db.prepare("INSERT INTO support_cases(customer_id,order_id,feedback_id,category,priority,status,description) VALUES(?,?,?,?, 'high','open',?)").run(request.customer_id,request.order_id,result.lastInsertRowid,clean(input.problemCategory,80)||"other",clean(input.problemDescription,1000)||"Unresolved issue reported through experience survey");
      supportCase={id:Number(caseResult.lastInsertRowid),status:"open"};
    }
    db.prepare("UPDATE feedback_requests SET status='submitted',submitted_at=CURRENT_TIMESTAMP WHERE id=?").run(request.id);
    db.exec("COMMIT");
  }catch(error){db.exec("ROLLBACK");throw error;}
  for(const vote of pendingPerformance)savePerformanceVoteFromFeedback(vote);
  return {ok:true,supportCase};
}

export function feedbackAnalytics(periodDays=90){
  const days=Math.max(1,Math.min(3650,Number(periodDays)||90));const rows=db.prepare(`SELECT * FROM experience_feedback WHERE datetime(created_at)>=datetime('now',?)`).all(`-${days} days`);const count=rows.length;
  const avg=(key)=>count?rows.reduce((sum,row)=>sum+number(row[key]),0)/rows.filter(row=>row[key]!=null).length||0:0;
  const pct=(key)=>Math.round((avg(key)/5)*1000)/10;const complaint=rows.filter(row=>row.problem_state&&row.problem_state!=="none").length;
  const liked={};for(const row of rows)for(const item of json(row.liked_json,[]))liked[item]=(liked[item]||0)+1;
  const categories={};for(const row of rows)if(row.problem_category)categories[row.problem_category]=(categories[row.problem_category]||0)+1;
  const metrics={overallSatisfaction:pct("overall_score"),productQuality:pct("product_quality_score"),websiteUsability:pct("website_usability_score"),deliverySpeed:pct("delivery_speed_score"),packaging:pct("packaging_score"),customerService:pct("customer_service_score"),pricingClarity:pct("pricing_clarity_score"),paymentExperience:pct("payment_experience_score")};
  return {periodDays:days,responseCount:count,averageOverall:Math.round(avg("overall_score")*100)/100,complaintRate:count?Math.round(complaint/count*1000)/10:0,metrics,topPositiveReasons:Object.entries(liked).sort((a,b)=>b[1]-a[1]).slice(0,5),topComplaintCategories:Object.entries(categories).sort((a,b)=>b[1]-a[1]).slice(0,5),publishable:count>=checkoutSettings().marketingInsightsMinResponses,minimumResponses:checkoutSettings().marketingInsightsMinResponses};
}

export function createMarketingInsight(input={},userId=null){
  const analytics=feedbackAnalytics(input.periodDays);if(!analytics.publishable)throw Object.assign(new Error(`يلزم ${analytics.minimumResponses} ردًا على الأقل قبل إنشاء إحصائية تسويقية.`),{code:"INSUFFICIENT_RESPONSES"});
  const metricMap={overall_satisfaction:analytics.metrics.overallSatisfaction,average_rating:analytics.averageOverall,product_quality:analytics.metrics.productQuality,website_usability:analytics.metrics.websiteUsability,delivery_speed:analytics.metrics.deliverySpeed,packaging:analytics.metrics.packaging,customer_service:analytics.metrics.customerService};
  const metric=clean(input.metricKey,80);if(metricMap[metric]==null)throw Object.assign(new Error("المؤشر غير صالح."),{code:"INVALID_METRIC"});
  const result=db.prepare("INSERT INTO marketing_insights(metric_key,period_days,value,response_count,template,channel,status,created_by) VALUES(?,?,?,?,?,?, 'draft',?)").run(metric,analytics.periodDays,metricMap[metric],analytics.responseCount,clean(input.template,40)||"story",clean(input.channel,40)||"instagram",userId);
  return db.prepare("SELECT * FROM marketing_insights WHERE id=?").get(result.lastInsertRowid);
}

export function listSavedAddresses(userId){return db.prepare("SELECT * FROM saved_addresses WHERE user_id=? ORDER BY is_default DESC,updated_at DESC").all(Number(userId)).map(row=>({id:Number(row.id),label:row.label,firstName:row.first_name,lastName:row.last_name,phone:row.phone,email:row.email,governorateId:Number(row.governorate_id),areaId:Number(row.area_id),streetAddress:row.street_address,building:row.building,floor:row.floor,apartment:row.apartment,landmark:row.landmark,isDefault:Boolean(row.is_default)}));}

function loyaltyFor(userId){
  db.prepare("INSERT OR IGNORE INTO customer_loyalty(user_id) VALUES(?)").run(Number(userId));
  const wallet=db.prepare("SELECT * FROM customer_loyalty WHERE user_id=?").get(Number(userId));
  const tiers=db.prepare("SELECT * FROM loyalty_tiers WHERE is_active=1 ORDER BY min_points,sort_order").all().map(row=>({id:row.id,nameAr:row.name_ar,nameEn:row.name_en,minPoints:Number(row.min_points),maxPoints:row.max_points==null?null:Number(row.max_points),benefits:json(row.benefits_json,[]),icon:row.icon,color:row.color}));
  const balance=Number(wallet.balance||0);let current=tiers[0]||null,next=null;
  for(const tier of tiers){if(balance>=tier.minPoints)current=tier;else if(!next)next=tier;}
  const target=next?.minPoints??current?.maxPoints??balance;const base=current?.minPoints||0;
  return {balance,lifetimeEarned:Number(wallet.lifetime_earned||0),lifetimeRedeemed:Number(wallet.lifetime_redeemed||0),currentTier:current,nextTier:next,pointsToNext:next?Math.max(0,next.minPoints-balance):0,progress:next?Math.max(0,Math.min(100,(balance-base)/(next.minPoints-base)*100)):100,targetPoints:target,tiers};
}

export function accountDashboard(userId){
  const user=db.prepare("SELECT id,name,email,phone,avatar_url,created_at FROM users WHERE id=?").get(Number(userId));if(!user)return null;
  const rows=db.prepare("SELECT * FROM orders WHERE user_id=? ORDER BY datetime(created_at) DESC,id DESC").all(Number(userId));
  const orders=rows.map(row=>mapOrder(row));const inShipping=new Set(["ready_to_ship","shipped","out_for_delivery"]);
  const notifications=db.prepare("SELECT id,type,title_ar titleAr,title_en titleEn,body_ar bodyAr,body_en bodyEn,read_at readAt,created_at createdAt FROM customer_notifications WHERE user_id=? ORDER BY id DESC LIMIT 20").all(Number(userId)).map(row=>({...row,id:Number(row.id)}));
  const wishlistCount=Number(db.prepare("SELECT COUNT(*) count FROM customer_wishlist WHERE user_id=?").get(Number(userId)).count);
  const addresses=listSavedAddresses(userId);const paymentMethods=db.prepare("SELECT id,provider,brand,last4,expiry_label expiryLabel,is_default isDefault FROM customer_payment_methods WHERE user_id=? ORDER BY is_default DESC,id DESC").all(Number(userId)).map(row=>({...row,id:Number(row.id),isDefault:Boolean(row.isDefault)}));
  return {customer:{id:Number(user.id),name:user.name,email:user.email,phone:user.phone||"",avatarUrl:user.avatar_url||"",createdAt:user.created_at},stats:{totalOrders:orders.length,inShipping:orders.filter(order=>inShipping.has(order.status)).length,delivered:orders.filter(order=>order.status==="delivered").length,notificationsUnread:notifications.filter(item=>!item.readAt).length,wishlistCount},loyalty:loyaltyFor(userId),recentOrders:orders.slice(0,4),notifications,addresses,paymentMethods};
}

export function syncWishlist(userId,productIds=[]){
  const ids=[...new Set((Array.isArray(productIds)?productIds:[]).map(id=>clean(id,120)).filter(Boolean))];db.exec("BEGIN IMMEDIATE");try{db.prepare("DELETE FROM customer_wishlist WHERE user_id=?").run(Number(userId));const exists=db.prepare("SELECT id FROM products WHERE id=? AND status='published'");const insert=db.prepare("INSERT INTO customer_wishlist(user_id,product_id) VALUES(?,?)");for(const id of ids)if(exists.get(id))insert.run(Number(userId),id);db.exec("COMMIT");}catch(error){db.exec("ROLLBACK");throw error;}return {count:Number(db.prepare("SELECT COUNT(*) count FROM customer_wishlist WHERE user_id=?").get(Number(userId)).count)};
}

export function updateCustomerProfile(userId,input={}){
  const name=clean(input.name,100),phone=clean(input.phone,30);if(name.length<2)throw Object.assign(new Error("أدخل اسمًا صحيحًا."),{code:"INVALID_NAME"});if(phone&& !/^\+?\d[\d\s()-]{7,24}$/.test(phone))throw Object.assign(new Error("رقم الهاتف غير صحيح."),{code:"INVALID_PHONE"});let avatar=clean(input.avatarUrl,1_500_000);if(avatar&&!/^data:image\/(png|jpeg|webp);base64,/i.test(avatar)&&!/^assets\//.test(avatar))throw Object.assign(new Error("صيغة الصورة غير مدعومة."),{code:"INVALID_AVATAR"});if(avatar.length>1_400_000)throw Object.assign(new Error("حجم الصورة أكبر من الحد المسموح."),{code:"AVATAR_TOO_LARGE"});db.prepare("UPDATE users SET name=?,phone=?,avatar_url=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").run(name,phone,avatar,Number(userId));return accountDashboard(userId).customer;
}

export function markNotificationsRead(userId){db.prepare("UPDATE customer_notifications SET read_at=COALESCE(read_at,CURRENT_TIMESTAMP) WHERE user_id=?").run(Number(userId));return accountDashboard(userId);}

export function loyaltyTiers(){return db.prepare("SELECT * FROM loyalty_tiers ORDER BY sort_order,min_points").all().map(row=>({id:row.id,nameAr:row.name_ar,nameEn:row.name_en,minPoints:Number(row.min_points),maxPoints:row.max_points==null?null:Number(row.max_points),benefits:json(row.benefits_json,[]),icon:row.icon,color:row.color,isActive:Boolean(row.is_active),sortOrder:Number(row.sort_order)}));}

export function saveLoyaltyTier(input={}){const id=clean(input.id,50);if(!id)throw new Error("Tier id is required");db.prepare("INSERT INTO loyalty_tiers(id,name_ar,name_en,min_points,max_points,benefits_json,icon,color,is_active,sort_order) VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name_ar=excluded.name_ar,name_en=excluded.name_en,min_points=excluded.min_points,max_points=excluded.max_points,benefits_json=excluded.benefits_json,icon=excluded.icon,color=excluded.color,is_active=excluded.is_active,sort_order=excluded.sort_order").run(id,clean(input.nameAr,80),clean(input.nameEn,80),Math.max(0,Number(input.minPoints||0)),input.maxPoints==null?null:Math.max(0,Number(input.maxPoints)),JSON.stringify(Array.isArray(input.benefits)?input.benefits:[]),clean(input.icon,40)||"crown",clean(input.color,20)||"#6f001c",input.isActive===false?0:1,Number(input.sortOrder||0));return loyaltyTiers();}

export function getFragranceFinderSession(userId){
  const row=db.prepare("SELECT session_json,updated_at FROM fragrance_finder_sessions WHERE user_id=?").get(Number(userId));
  if(!row)return null;
  const session=json(row.session_json,null);return session?{...session,updatedAt:session.updatedAt||row.updated_at}:null;
}

export function saveFragranceFinderSession(userId,input={}){
  const session=input?.session;if(!session||Number(session.version)!==2||!session.answers)throw Object.assign(new Error("بيانات جلسة مكتشف العطر غير صالحة."),{code:"INVALID_FINDER_SESSION"});
  const currentStep=Math.max(0,Math.min(8,Number(session.currentStep)||0));const payload={...session,currentStep,version:2,updatedAt:new Date().toISOString()};const serialized=JSON.stringify(payload);
  if(serialized.length>50000)throw Object.assign(new Error("حجم جلسة مكتشف العطر غير صالح."),{code:"FINDER_SESSION_TOO_LARGE"});
  db.prepare("INSERT INTO fragrance_finder_sessions(user_id,session_json,current_step,completed_at,updated_at) VALUES(?,?,?,?,CURRENT_TIMESTAMP) ON CONFLICT(user_id) DO UPDATE SET session_json=excluded.session_json,current_step=excluded.current_step,completed_at=excluded.completed_at,updated_at=CURRENT_TIMESTAMP").run(Number(userId),serialized,currentStep,currentStep===8?new Date().toISOString():null);
  return payload;
}
