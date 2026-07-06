import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { openPortableDatabase } from "./portable-database.mjs";
import {
  createHash,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual
} from "node:crypto";
import { promisify } from "node:util";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)));
const DB_PATH = resolve(process.env.ORIGO_DB_PATH || resolve(ROOT, "data", "origo.db"));
const SESSION_DAYS = Math.max(1, Number(process.env.ORIGO_SESSION_DAYS || 30));
const scrypt = promisify(scryptCallback);

export const ROLE_PERMISSIONS = {
  owner: ["*"],
  admin: ["*"],
  manager: ["catalog", "orders", "customers", "inventory", "reports"],
  product_manager: ["catalog", "inventory"],
  order_manager: ["orders", "customers", "shipping"],
  customer_support: ["orders:view", "customers", "support", "reviews"],
  accountant: ["orders:view", "accounting", "reports"],
  marketing_manager: ["marketing", "coupons", "content", "reports:view"],
  warehouse_staff: ["orders:view", "inventory", "purchases"],
  delivery_staff: ["orders:view", "shipping"],
  content_editor: ["catalog:view", "content", "reviews"]
};
const allowedRoles = new Set(["customer", ...Object.keys(ROLE_PERMISSIONS)]);

mkdirSync(dirname(DB_PATH), { recursive: true });

export const db = await openPortableDatabase(DB_PATH);
db.exec(`
  PRAGMA foreign_keys = ON;
  PRAGMA journal_mode = WAL;
  PRAGMA busy_timeout = 5000;

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN (
      'customer', 'owner', 'admin', 'manager', 'product_manager', 'order_manager',
      'customer_support', 'accountant', 'marketing_manager', 'warehouse_staff',
      'delivery_staff', 'content_editor'
    )),
    staff_role TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    sku TEXT NOT NULL DEFAULT '',
    brand TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'perfume',
    type_ar TEXT NOT NULL DEFAULT 'للجنسين',
    type_en TEXT NOT NULL DEFAULT 'Unisex',
    concentration TEXT NOT NULL DEFAULT '',
    sizes_json TEXT NOT NULL DEFAULT '[]',
    notes_ar_json TEXT NOT NULL DEFAULT '[]',
    notes_en_json TEXT NOT NULL DEFAULT '[]',
    price REAL NOT NULL CHECK (price >= 0),
    old_price REAL,
    badge_ar TEXT NOT NULL DEFAULT '',
    badge_en TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    description_ar TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    catalog_json TEXT NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'unavailable')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity BETWEEN 1 AND 10),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, product_id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    governorate TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    payment_method TEXT NOT NULL DEFAULT 'cod' CHECK (payment_method IN ('cod')),
    payment_provider TEXT NOT NULL DEFAULT 'cod',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'processing', 'shipped', 'completed', 'cancelled')),
    workflow_status TEXT NOT NULL DEFAULT 'new',
    payment_status TEXT NOT NULL DEFAULT 'pending',
    shipping_carrier TEXT NOT NULL DEFAULT '',
    tracking_number TEXT NOT NULL DEFAULT '',
    internal_notes TEXT NOT NULL DEFAULT '',
    subtotal REAL NOT NULL CHECK (subtotal >= 0),
    shipping_total REAL NOT NULL DEFAULT 0 CHECK (shipping_total >= 0),
    total REAL NOT NULL CHECK (total >= 0),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    sku TEXT NOT NULL DEFAULT '',
    unit_price REAL NOT NULL CHECK (unit_price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    line_total REAL NOT NULL CHECK (line_total >= 0)
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS fragrance_notes_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    payload_json TEXT NOT NULL DEFAULT '{}',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS fragrance_note_entities (
    id TEXT PRIMARY KEY,
    name_ar TEXT NOT NULL DEFAULT '',
    name_en TEXT NOT NULL DEFAULT '',
    aliases_json TEXT NOT NULL DEFAULT '[]',
    image TEXT NOT NULL DEFAULT '',
    family_id TEXT NOT NULL DEFAULT 'uncategorized',
    parent_id TEXT,
    related_json TEXT NOT NULL DEFAULT '[]',
    compatible_json TEXT NOT NULL DEFAULT '[]',
    opposite_json TEXT NOT NULL DEFAULT '[]',
    default_intensity INTEGER NOT NULL DEFAULT 3 CHECK (default_intensity BETWEEN 1 AND 5),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS product_note_refs (
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    note_id TEXT NOT NULL REFERENCES fragrance_note_entities(id) ON DELETE RESTRICT,
    position TEXT NOT NULL CHECK (position IN ('top', 'heart', 'base', 'accord', 'multiple')),
    intensity INTEGER NOT NULL DEFAULT 3 CHECK (intensity BETWEEN 1 AND 5),
    sort_order INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (product_id, note_id, position)
  );

  CREATE TABLE IF NOT EXISTS filter_definitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    filter_key TEXT NOT NULL,
    label_ar TEXT NOT NULL,
    label_en TEXT NOT NULL,
    input_type TEXT NOT NULL DEFAULT 'select',
    options_json TEXT NOT NULL DEFAULT '[]',
    sort_order INTEGER NOT NULL DEFAULT 0,
    visible INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (category, filter_key)
  );

  CREATE TABLE IF NOT EXISTS product_filter_values (
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    filter_id INTEGER NOT NULL REFERENCES filter_definitions(id) ON DELETE CASCADE,
    value_json TEXT NOT NULL DEFAULT 'null',
    PRIMARY KEY (product_id, filter_id)
  );

  CREATE TABLE IF NOT EXISTS admin_workspace_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    payload_json TEXT NOT NULL DEFAULT '{}',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL DEFAULT '',
    entity_id TEXT NOT NULL DEFAULT '',
    details_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT '',
    note TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_carts_user ON carts(user_id);
  CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
  CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);
  CREATE INDEX IF NOT EXISTS idx_order_events_order ON order_events(order_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_activity_log_created ON activity_log(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_product_note_refs_note ON product_note_refs(note_id, position);
  CREATE INDEX IF NOT EXISTS idx_filter_definitions_category ON filter_definitions(category, sort_order);
`);

const productColumns = new Set(db.prepare("PRAGMA table_info(products)").all().map((column) => column.name));
if (!productColumns.has("catalog_json")) {
  db.exec("ALTER TABLE products ADD COLUMN catalog_json TEXT NOT NULL DEFAULT '{}'");
}

const userColumns = new Set(db.prepare("PRAGMA table_info(users)").all().map((column) => column.name));
if (!userColumns.has("staff_role")) {
  db.exec("ALTER TABLE users ADD COLUMN staff_role TEXT NOT NULL DEFAULT ''");
}

const orderColumns = new Set(db.prepare("PRAGMA table_info(orders)").all().map((column) => column.name));
const orderMigrations = [
  ["workflow_status", "TEXT NOT NULL DEFAULT 'new'"],
  ["payment_status", "TEXT NOT NULL DEFAULT 'pending'"],
  ["payment_provider", "TEXT NOT NULL DEFAULT 'cod'"],
  ["shipping_carrier", "TEXT NOT NULL DEFAULT ''"],
  ["tracking_number", "TEXT NOT NULL DEFAULT ''"],
  ["internal_notes", "TEXT NOT NULL DEFAULT ''"]
];
for (const [column, definition] of orderMigrations) {
  if (!orderColumns.has(column)) db.exec(`ALTER TABLE orders ADD COLUMN ${column} ${definition}`);
}
db.prepare(`
  UPDATE orders SET workflow_status = status
  WHERE workflow_status = 'new' AND status <> 'new'
`).run();

const seedProducts = [
  {
    id: "nocturne",
    sku: "ORI-NOC-01",
    brand: "ORIGO PRIVATE BLEND",
    nameAr: "NOCTURNE 01",
    nameEn: "NOCTURNE 01",
    category: "perfume",
    typeAr: "للجنسين",
    typeEn: "Unisex",
    concentration: "Parfum",
    sizes: ["75 ML"],
    notesAr: ["عود", "ورد", "عنبر"],
    notesEn: ["Oud", "Rose", "Amber"],
    price: 3250,
    oldPrice: null,
    badgeAr: "الأكثر مبيعًا",
    badgeEn: "BESTSELLER",
    image: "assets/nocturne-01.svg"
  },
  {
    id: "velvet-iris",
    sku: "ORI-VIR-75",
    brand: "ATELIER ORIGO",
    nameAr: "VELVET IRIS",
    nameEn: "VELVET IRIS",
    category: "perfume",
    typeAr: "نسائي",
    typeEn: "Women",
    concentration: "EDP",
    sizes: ["75 ML"],
    notesAr: ["سوسن", "فانيليا", "مسك"],
    notesEn: ["Iris", "Vanilla", "Musk"],
    price: 2890,
    oldPrice: 3200,
    badgeAr: "وصل حديثًا",
    badgeEn: "NEW",
    image: "assets/velvet-iris.svg"
  },
  {
    id: "smoked",
    sku: "ORI-SSF-75",
    brand: "ORIGO SIGNATURE",
    nameAr: "SMOKED SAFFRON",
    nameEn: "SMOKED SAFFRON",
    category: "perfume",
    typeAr: "رجالي",
    typeEn: "Men",
    concentration: "Parfum",
    sizes: ["75 ML"],
    notesAr: ["جلد", "زعفران", "أخشاب"],
    notesEn: ["Leather", "Saffron", "Woods"],
    price: 2450,
    oldPrice: null,
    badgeAr: "إصدار محدود",
    badgeEn: "LIMITED",
    image: "assets/smoked-saffron.svg"
  },
  {
    id: "citrus-veil",
    sku: "ORI-CVE-75",
    brand: "ORIGO ESSENTIALS",
    nameAr: "CITRUS VEIL",
    nameEn: "CITRUS VEIL",
    category: "perfume",
    typeAr: "للجنسين",
    typeEn: "Unisex",
    concentration: "EDT",
    sizes: ["75 ML"],
    notesAr: ["برغموت", "نيرولي", "أرز"],
    notesEn: ["Bergamot", "Neroli", "Cedar"],
    price: 1980,
    oldPrice: 2250,
    badgeAr: "اختيار الصيف",
    badgeEn: "SUMMER PICK",
    image: "assets/citrus-veil.svg"
  }
];

const insertSeedProduct = db.prepare(`
  INSERT OR IGNORE INTO products (
    id, sku, brand, name_ar, name_en, category, type_ar, type_en, concentration,
    sizes_json, notes_ar_json, notes_en_json, price, old_price, badge_ar, badge_en,
    image, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')
`);

db.exec("BEGIN IMMEDIATE");
try {
  for (const product of seedProducts) {
    insertSeedProduct.run(
      product.id,
      product.sku,
      product.brand,
      product.nameAr,
      product.nameEn,
      product.category,
      product.typeAr,
      product.typeEn,
      product.concentration,
      JSON.stringify(product.sizes),
      JSON.stringify(product.notesAr),
      JSON.stringify(product.notesEn),
      product.price,
      product.oldPrice,
      product.badgeAr,
      product.badgeEn,
      product.image
    );
  }
  db.exec("COMMIT");
} catch (error) {
  db.exec("ROLLBACK");
  throw error;
}

const defaultFilters = {
  perfume: [
    ["notes", "النوتات", "Notes", "note"], ["family", "العائلة العطرية", "Fragrance family", "select"],
    ["brand", "البراند", "Brand", "select"], ["concentration", "التركيز", "Concentration", "select"],
    ["longevity", "الثبات", "Longevity", "range"], ["projection", "الفوحان", "Projection", "range"],
    ["season", "الموسم", "Season", "multiselect"], ["occasion", "المناسبة", "Occasion", "multiselect"],
    ["gender", "الجنس", "Gender", "select"], ["size", "الحجم", "Size", "multiselect"],
    ["origin", "بلد المنشأ", "Origin country", "select"], ["personality", "الشخصية", "Personality", "multiselect"]
  ],
  skincare: [
    ["skin_type", "نوع البشرة", "Skin type", "multiselect"], ["product_type", "نوع المنتج", "Product type", "select"],
    ["concern", "المشكلة", "Concern", "multiselect"], ["actives", "المكونات الفعالة", "Active ingredients", "multiselect"],
    ["spf", "عامل الحماية", "SPF", "range"], ["fragrance_free", "خالٍ من العطور", "Fragrance free", "boolean"],
    ["alcohol_free", "خالٍ من الكحول", "Alcohol free", "boolean"], ["paraben_free", "خالٍ من البارابين", "Paraben free", "boolean"]
  ],
  incense: [
    ["type", "النوع", "Type", "select"], ["scent", "الرائحة", "Scent", "multiselect"],
    ["origin", "المنشأ", "Origin", "select"], ["usage", "الاستخدام", "Usage", "multiselect"],
    ["intensity", "الكثافة", "Intensity", "range"], ["burn_time", "مدة الاحتراق", "Burn time", "range"]
  ],
  burner: [
    ["material", "المادة", "Material", "select"], ["size", "الحجم", "Size", "select"],
    ["power", "نوع التشغيل", "Power type", "select"], ["color", "اللون", "Color", "multiselect"],
    ["usage", "الاستخدام", "Usage", "multiselect"]
  ],
  deodorant: [
    ["gender", "الجنس", "Gender", "select"], ["sensitive", "للجسم الحساس", "Sensitive skin", "boolean"],
    ["aluminum_free", "خالٍ من الألومنيوم", "Aluminum free", "boolean"], ["protection", "مدة الحماية", "Protection duration", "range"],
    ["package", "نوع العبوة", "Package type", "select"], ["scent", "الرائحة", "Scent", "select"]
  ]
};

const insertDefaultFilter = db.prepare(`
  INSERT OR IGNORE INTO filter_definitions
    (category, filter_key, label_ar, label_en, input_type, sort_order)
  VALUES (?, ?, ?, ?, ?, ?)
`);
db.exec("BEGIN IMMEDIATE");
try {
  for (const [category, filters] of Object.entries(defaultFilters)) {
    filters.forEach((filter, index) => insertDefaultFilter.run(category, ...filter, index));
  }
  db.exec("COMMIT");
} catch (error) {
  db.exec("ROLLBACK");
  throw error;
}

function parseJSON(value, fallback = []) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function referenceId(value) {
  return clean(value, 200).toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || `note-${Date.now().toString(36)}`;
}

function noteRefsForProduct(productId) {
  return db.prepare(`
    SELECT r.note_id AS id, r.position, r.intensity, r.sort_order AS sortOrder,
      n.name_ar AS nameAr, n.name_en AS nameEn, n.family_id AS familyId,
      n.image, n.default_intensity AS defaultIntensity
    FROM product_note_refs r
    JOIN fragrance_note_entities n ON n.id = r.note_id
    WHERE r.product_id = ?
    ORDER BY CASE r.position WHEN 'top' THEN 1 WHEN 'heart' THEN 2 WHEN 'base' THEN 3 ELSE 4 END,
      r.sort_order
  `).all(productId).map((row) => ({
    ...row,
    intensity: Number(row.intensity),
    sortOrder: Number(row.sortOrder),
    defaultIntensity: Number(row.defaultIntensity)
  }));
}

function filterValuesForProduct(productId) {
  return Object.fromEntries(db.prepare(`
    SELECT d.filter_key AS filterKey, v.value_json AS valueJson
    FROM product_filter_values v
    JOIN filter_definitions d ON d.id = v.filter_id
    WHERE v.product_id = ?
  `).all(productId).map((row) => [row.filterKey, parseJSON(row.valueJson, null)]));
}

function publicUser(row) {
  if (!row) return null;
  const effectiveRole = row.staff_role || row.role;
  return {
    id: Number(row.id),
    name: row.name,
    email: row.email,
    phone: row.phone || "",
    role: effectiveRole,
    permissions: ROLE_PERMISSIONS[effectiveRole] || [],
    createdAt: row.created_at
  };
}

function productFromRow(row, includeMetadata = false) {
  if (!row) return null;
  const metadata = parseJSON(row.catalog_json, {});
  const product = {
    id: row.id,
    sku: row.sku,
    brand: row.brand,
    nameAr: row.name_ar,
    nameEn: row.name_en,
    category: row.category,
    type: row.type_ar,
    typeEn: row.type_en,
    concentration: row.concentration,
    sizes: parseJSON(row.sizes_json),
    notesAr: parseJSON(row.notes_ar_json),
    notesEn: parseJSON(row.notes_en_json),
    price: Number(row.price),
    oldPrice: row.old_price == null ? null : Number(row.old_price),
    badgeAr: row.badge_ar,
    badgeEn: row.badge_en,
    image: row.image,
    descriptionAr: row.description_ar,
    descriptionEn: row.description_en,
    status: row.status,
    notes: metadata.notes && typeof metadata.notes === "object" ? metadata.notes : undefined,
    familyAr: metadata.familyAr || "",
    familyEn: metadata.familyEn || "",
    gender: metadata.gender || "",
    seasons: Array.isArray(metadata.seasons) ? metadata.seasons : [],
    usageTimes: Array.isArray(metadata.usageTimes) ? metadata.usageTimes : [],
    originCountryAr: metadata.originCountryAr || "",
    originCountryEn: metadata.originCountryEn || "",
    releaseYear: metadata.releaseYear ?? null,
    perfumer: metadata.perfumer || "",
    performance: metadata.performance || {},
    occasions: Array.isArray(metadata.occasions) ? metadata.occasions : [],
    personalities: Array.isArray(metadata.personalities) ? metadata.personalities : [],
    noteLibrary: metadata.noteLibrary || { slugs: [], unmatched: [] },
    noteRefs: noteRefsForProduct(row.id),
    filters: { ...(metadata.filters || {}), ...filterValuesForProduct(row.id) },
    slug: metadata.slug || row.id,
    seo: metadata.seo || {}
  };
  if (!includeMetadata) return product;
  return {
    ...metadata,
    ...product,
    images: Array.isArray(metadata.images)
      ? metadata.images
      : (product.image ? [{ url: product.image, provider: "ORIGO", selected: true }] : [])
  };
}

function clean(value, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

function normalizedEmail(value) {
  return clean(value, 254).toLowerCase();
}

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const derived = await scrypt(String(password), salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$16384$8$1$${salt.toString("base64url")}$${Buffer.from(derived).toString("base64url")}`;
}

export async function verifyPassword(password, encoded) {
  try {
    const [algorithm, n, r, p, saltText, hashText] = String(encoded).split("$");
    if (algorithm !== "scrypt") return false;
    const expected = Buffer.from(hashText, "base64url");
    const actual = Buffer.from(await scrypt(
      String(password),
      Buffer.from(saltText, "base64url"),
      expected.length,
      { N: Number(n), r: Number(r), p: Number(p) }
    ));
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export function findUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(normalizedEmail(email));
}

export function findUserById(id) {
  return publicUser(db.prepare("SELECT * FROM users WHERE id = ?").get(Number(id)));
}

export function listStaff() {
  return db.prepare("SELECT * FROM users WHERE role <> 'customer' ORDER BY created_at DESC")
    .all()
    .map(publicUser);
}

export function setUserRole(id, role) {
  if (!ROLE_PERMISSIONS[role]) return null;
  db.prepare("UPDATE users SET role = 'admin', staff_role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .run(role, Number(id));
  return findUserById(id);
}

export function createUser({ name, email, passwordHash, phone = "", role = "customer" }) {
  const safeRole = allowedRoles.has(role) ? role : "customer";
  const databaseRole = safeRole === "customer" ? "customer" : "admin";
  const staffRole = safeRole === "customer" ? "" : safeRole;
  const result = db.prepare(`
    INSERT INTO users (name, email, password_hash, phone, role, staff_role)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(clean(name, 100), normalizedEmail(email), passwordHash, clean(phone, 30), databaseRole, staffRole);
  return findUserById(result.lastInsertRowid);
}

function tokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function createSession(userId) {
  db.prepare("DELETE FROM sessions WHERE julianday(expires_at) <= julianday('now')").run();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000).toISOString();
  db.prepare("INSERT INTO sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)")
    .run(Number(userId), tokenHash(token), expiresAt);
  return { token, expiresAt, maxAge: SESSION_DAYS * 86_400 };
}

export function deleteSession(token) {
  if (!token) return;
  db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash(token));
}

export function userFromSession(token) {
  if (!token) return null;
  const row = db.prepare(`
    SELECT u.*
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND julianday(s.expires_at) > julianday('now')
  `).get(tokenHash(token));
  return publicUser(row);
}

export function listProducts({ includeHidden = false } = {}) {
  const rows = includeHidden
    ? db.prepare("SELECT * FROM products ORDER BY created_at DESC").all()
    : db.prepare("SELECT * FROM products WHERE status = 'published' ORDER BY created_at, id").all();
  return rows.map((row) => productFromRow(row, includeHidden));
}

function productNoteReferences(input) {
  const supplied = Array.isArray(input.noteLibrary?.refs) ? input.noteLibrary.refs : [];
  if (supplied.length) return supplied.map((ref, index) => ({
    id: referenceId(ref.id || ref.slug || ref.nameEn || ref.nameAr),
    nameAr: clean(ref.nameAr, 180),
    nameEn: clean(ref.nameEn, 180),
    aliases: Array.isArray(ref.aliases) ? ref.aliases : [],
    image: clean(ref.image, 2_000_000),
    familyId: referenceId(ref.familyId || "uncategorized"),
    parentId: ref.parentId ? referenceId(ref.parentId) : null,
    related: Array.isArray(ref.related) ? ref.related.map(referenceId) : [],
    compatible: Array.isArray(ref.compatible) ? ref.compatible.map(referenceId) : [],
    opposite: Array.isArray(ref.opposite) ? ref.opposite.map(referenceId) : [],
    position: ["top", "heart", "base", "accord", "multiple"].includes(ref.position) ? ref.position : "multiple",
    intensity: Math.min(5, Math.max(1, Number(ref.intensity || ref.defaultIntensity || 3))),
    defaultIntensity: Math.min(5, Math.max(1, Number(ref.defaultIntensity || 3))),
    sortOrder: Number(ref.sortOrder ?? index)
  }));

  const structured = input.notes && typeof input.notes === "object" ? input.notes : {};
  const refs = [];
  for (const position of ["top", "heart", "base"]) {
    const ar = Array.isArray(structured[`${position}Ar`]) ? structured[`${position}Ar`] : [];
    const en = Array.isArray(structured[`${position}En`]) ? structured[`${position}En`] : [];
    const count = Math.max(ar.length, en.length);
    for (let index = 0; index < count; index += 1) {
      const nameAr = clean(ar[index], 180);
      const nameEn = clean(en[index], 180);
      refs.push({
        id: referenceId(nameEn || nameAr),
        nameAr,
        nameEn,
        aliases: [],
        image: "",
        familyId: "uncategorized",
        parentId: null,
        related: [],
        compatible: [],
        opposite: [],
        position,
        intensity: 3,
        defaultIntensity: 3,
        sortOrder: index
      });
    }
  }
  if (!refs.length) {
    const ar = Array.isArray(input.notesAr) ? input.notesAr : [];
    const en = Array.isArray(input.notesEn) ? input.notesEn : [];
    const count = Math.max(ar.length, en.length);
    for (let index = 0; index < count; index += 1) {
      const nameAr = clean(ar[index], 180);
      const nameEn = clean(en[index], 180);
      refs.push({
        id: referenceId(nameEn || nameAr), nameAr, nameEn, aliases: [], image: "",
        familyId: "uncategorized", parentId: null, related: [], compatible: [], opposite: [],
        position: "multiple", intensity: 3, defaultIntensity: 3, sortOrder: index
      });
    }
  }
  return refs;
}

function syncProductNoteReferences(productId, input) {
  const refs = productNoteReferences(input);
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare("DELETE FROM product_note_refs WHERE product_id = ?").run(productId);
    const upsertNote = db.prepare(`
      INSERT INTO fragrance_note_entities (
        id, name_ar, name_en, aliases_json, image, family_id, parent_id,
        related_json, compatible_json, opposite_json, default_intensity, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        name_ar = CASE WHEN excluded.name_ar <> '' THEN excluded.name_ar ELSE name_ar END,
        name_en = CASE WHEN excluded.name_en <> '' THEN excluded.name_en ELSE name_en END,
        aliases_json = CASE WHEN excluded.aliases_json <> '[]' THEN excluded.aliases_json ELSE aliases_json END,
        image = CASE WHEN excluded.image <> '' THEN excluded.image ELSE image END,
        family_id = CASE WHEN excluded.family_id <> 'uncategorized' THEN excluded.family_id ELSE family_id END,
        related_json = CASE WHEN excluded.related_json <> '[]' THEN excluded.related_json ELSE related_json END,
        compatible_json = CASE WHEN excluded.compatible_json <> '[]' THEN excluded.compatible_json ELSE compatible_json END,
        opposite_json = CASE WHEN excluded.opposite_json <> '[]' THEN excluded.opposite_json ELSE opposite_json END,
        default_intensity = excluded.default_intensity,
        updated_at = CURRENT_TIMESTAMP
    `);
    const insertRef = db.prepare(`
      INSERT INTO product_note_refs (product_id, note_id, position, intensity, sort_order)
      VALUES (?, ?, ?, ?, ?)
    `);
    for (const ref of refs) {
      upsertNote.run(
        ref.id, ref.nameAr, ref.nameEn, JSON.stringify(ref.aliases), ref.image, ref.familyId,
        ref.parentId, JSON.stringify(ref.related), JSON.stringify(ref.compatible),
        JSON.stringify(ref.opposite), ref.defaultIntensity
      );
      insertRef.run(productId, ref.id, ref.position, ref.intensity, ref.sortOrder);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function syncProductFilterValues(productId, input) {
  const category = clean(input.category, 80) || "perfume";
  const explicit = input.filters && typeof input.filters === "object" ? input.filters : {};
  const structured = input.notes && typeof input.notes === "object" ? input.notes : {};
  const structuredNames = [
    ...(structured.topEn || structured.topAr || []),
    ...(structured.heartEn || structured.heartAr || []),
    ...(structured.baseEn || structured.baseAr || [])
  ];
  const inferred = {
    notes: input.noteLibrary?.slugs?.length ? input.noteLibrary.slugs : (structuredNames.length ? structuredNames : (input.notesEn || input.notesAr || [])),
    family: input.familyEn || input.familyAr || "",
    brand: input.brand || "",
    concentration: input.concentration || "",
    gender: input.gender || input.typeEn || input.typeAr || input.type || "",
    size: input.sizes || [],
    origin: input.originCountryEn || input.originCountryAr || "",
    season: input.seasons || [],
    occasion: input.occasions || [],
    personality: input.personalities || [],
    longevity: input.performance?.longevity ?? null,
    projection: input.performance?.projection ?? input.performance?.sillage ?? null
  };
  const definitions = listFilterDefinitions(category);
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare("DELETE FROM product_filter_values WHERE product_id = ?").run(productId);
    const insert = db.prepare(`
      INSERT INTO product_filter_values (product_id, filter_id, value_json) VALUES (?, ?, ?)
    `);
    for (const definition of definitions) {
      const inferredValue = inferred[definition.key];
      const hasInferred = inferredValue != null && inferredValue !== "" && (!Array.isArray(inferredValue) || inferredValue.length);
      const selected = hasInferred ? inferredValue : explicit[definition.key];
      if (selected == null || selected === "" || (Array.isArray(selected) && !selected.length)) continue;
      insert.run(productId, definition.id, JSON.stringify(selected));
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

export function upsertProduct(input) {
  const id = clean(input.id, 120) || `product-${Date.now().toString(36)}`;
  const status = ["draft", "published", "unavailable"].includes(input.status) ? input.status : "draft";
  const price = Math.max(0, Number(input.price || 0));
  const structuredNotes = input.notes && typeof input.notes === "object" ? input.notes : {};
  const hasStructuredNotes = ["topAr", "topEn", "heartAr", "heartEn", "baseAr", "baseEn"]
    .some((key) => Array.isArray(structuredNotes[key]));
  const notesAr = hasStructuredNotes
    ? [...(structuredNotes.topAr || []), ...(structuredNotes.heartAr || []), ...(structuredNotes.baseAr || [])]
    : (Array.isArray(input.notesAr) ? input.notesAr : []);
  const notesEn = hasStructuredNotes
    ? [...(structuredNotes.topEn || []), ...(structuredNotes.heartEn || []), ...(structuredNotes.baseEn || [])]
    : (Array.isArray(input.notesEn) ? input.notesEn : []);
  const genderTypes = {
    men: ["رجالي", "Men"],
    women: ["نسائي", "Women"],
    unisex: ["للجنسين", "Unisex"]
  };
  const inferredType = genderTypes[input.gender] || genderTypes.unisex;
  db.prepare(`
    INSERT INTO products (
      id, sku, brand, name_ar, name_en, category, type_ar, type_en, concentration,
      sizes_json, notes_ar_json, notes_en_json, price, old_price, badge_ar, badge_en,
      image, description_ar, description_en, catalog_json, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      sku = excluded.sku,
      brand = excluded.brand,
      name_ar = excluded.name_ar,
      name_en = excluded.name_en,
      category = excluded.category,
      type_ar = excluded.type_ar,
      type_en = excluded.type_en,
      concentration = excluded.concentration,
      sizes_json = excluded.sizes_json,
      notes_ar_json = excluded.notes_ar_json,
      notes_en_json = excluded.notes_en_json,
      price = excluded.price,
      old_price = excluded.old_price,
      badge_ar = excluded.badge_ar,
      badge_en = excluded.badge_en,
      image = excluded.image,
      description_ar = excluded.description_ar,
      description_en = excluded.description_en,
      catalog_json = excluded.catalog_json,
      status = excluded.status,
      updated_at = CURRENT_TIMESTAMP
  `).run(
    id,
    clean(input.sku, 120),
    clean(input.brand, 120) || "ORIGO",
    clean(input.nameAr, 180) || clean(input.nameEn, 180) || "منتج جديد",
    clean(input.nameEn, 180),
    clean(input.category, 40) || "perfume",
    clean(input.type || input.typeAr, 60) || inferredType[0],
    clean(input.typeEn, 60) || inferredType[1],
    clean(input.concentration, 60),
    JSON.stringify(Array.isArray(input.sizes) ? input.sizes.slice(0, 20) : []),
    JSON.stringify(notesAr.slice(0, 30)),
    JSON.stringify(notesEn.slice(0, 30)),
    price,
    input.oldPrice == null ? null : Math.max(0, Number(input.oldPrice)),
    clean(input.badgeAr, 80),
    clean(input.badgeEn, 80),
    clean(
      input.image
        || input.images?.find((image) => image?.selected)?.url
        || input.images?.[0]?.url,
      2_000_000
    ),
    clean(input.descriptionAr, 4000),
    clean(input.descriptionEn, 4000),
    JSON.stringify(input),
    status
  );
  syncProductNoteReferences(id, input);
  syncProductFilterValues(id, input);
  return productFromRow(db.prepare("SELECT * FROM products WHERE id = ?").get(id), true);
}

export function deleteProduct(productId) {
  const result = db.prepare("DELETE FROM products WHERE id = ?").run(clean(productId, 120));
  return result.changes > 0;
}

export function listFilterDefinitions(category = "") {
  const rows = category
    ? db.prepare("SELECT * FROM filter_definitions WHERE category = ? ORDER BY sort_order, id").all(clean(category, 80))
    : db.prepare("SELECT * FROM filter_definitions ORDER BY category, sort_order, id").all();
  return rows.map((row) => ({
    id: Number(row.id),
    category: row.category,
    key: row.filter_key,
    labelAr: row.label_ar,
    labelEn: row.label_en,
    inputType: row.input_type,
    options: parseJSON(row.options_json, []),
    sortOrder: Number(row.sort_order),
    visible: Boolean(row.visible)
  }));
}

export function upsertFilterDefinition(input) {
  const category = clean(input.category, 80);
  const key = referenceId(input.key || input.labelEn || input.labelAr);
  if (!category || !key || !clean(input.labelAr || input.labelEn, 120)) return null;
  const inputType = ["select", "multiselect", "range", "boolean", "text", "note"].includes(input.inputType)
    ? input.inputType
    : "select";
  const options = Array.isArray(input.options) ? input.options.map((item) => clean(item, 120)).filter(Boolean) : [];
  if (Number(input.id) > 0) {
    db.prepare(`
      UPDATE filter_definitions SET category = ?, filter_key = ?, label_ar = ?, label_en = ?,
        input_type = ?, options_json = ?, sort_order = ?, visible = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      category, key, clean(input.labelAr, 120) || clean(input.labelEn, 120),
      clean(input.labelEn, 120) || clean(input.labelAr, 120), inputType,
      JSON.stringify(options), Number(input.sortOrder || 0), input.visible === false ? 0 : 1, Number(input.id)
    );
    return listFilterDefinitions().find((item) => item.id === Number(input.id)) || null;
  }
  db.prepare(`
    INSERT INTO filter_definitions (
      category, filter_key, label_ar, label_en, input_type, options_json, sort_order, visible, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(category, filter_key) DO UPDATE SET
      label_ar = excluded.label_ar,
      label_en = excluded.label_en,
      input_type = excluded.input_type,
      options_json = excluded.options_json,
      sort_order = excluded.sort_order,
      visible = excluded.visible,
      updated_at = CURRENT_TIMESTAMP
  `).run(
    category, key, clean(input.labelAr, 120) || clean(input.labelEn, 120),
    clean(input.labelEn, 120) || clean(input.labelAr, 120), inputType,
    JSON.stringify(options), Number(input.sortOrder || 0), input.visible === false ? 0 : 1
  );
  return listFilterDefinitions(category).find((item) => item.key === key) || null;
}

export function deleteFilterDefinition(filterId) {
  const result = db.prepare("DELETE FROM filter_definitions WHERE id = ?").run(Number(filterId));
  return result.changes > 0;
}

export function syncFragranceNoteEntities(notes) {
  const rows = Array.isArray(notes) ? notes.slice(0, 5_000) : [];
  db.exec("BEGIN IMMEDIATE");
  try {
    const upsert = db.prepare(`
      INSERT INTO fragrance_note_entities (
        id, name_ar, name_en, aliases_json, image, family_id, parent_id,
        related_json, compatible_json, opposite_json, default_intensity, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        name_ar = excluded.name_ar, name_en = excluded.name_en,
        aliases_json = excluded.aliases_json, image = excluded.image,
        family_id = excluded.family_id, parent_id = excluded.parent_id,
        related_json = excluded.related_json, compatible_json = excluded.compatible_json,
        opposite_json = excluded.opposite_json, default_intensity = excluded.default_intensity,
        updated_at = CURRENT_TIMESTAMP
    `);
    for (const note of rows) {
      upsert.run(
        referenceId(note.id || note.slug || note.nameEn || note.nameAr),
        clean(note.nameAr, 180), clean(note.nameEn, 180),
        JSON.stringify(Array.isArray(note.aliases) ? note.aliases.slice(0, 80) : []),
        clean(note.image, 2_000_000), referenceId(note.familyId || "uncategorized"),
        note.parentId ? referenceId(note.parentId) : null,
        JSON.stringify(Array.isArray(note.related) ? note.related.map(referenceId) : []),
        JSON.stringify(Array.isArray(note.compatible) ? note.compatible.map(referenceId) : []),
        JSON.stringify(Array.isArray(note.opposite) ? note.opposite.map(referenceId) : []),
        Math.min(5, Math.max(1, Number(note.defaultIntensity || 3)))
      );
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  return rows.length;
}

export function listFragranceNoteEntities() {
  return db.prepare("SELECT * FROM fragrance_note_entities ORDER BY family_id, name_en, name_ar").all().map((row) => ({
    id: row.id,
    nameAr: row.name_ar,
    nameEn: row.name_en,
    aliases: parseJSON(row.aliases_json, []),
    image: row.image,
    familyId: row.family_id,
    parentId: row.parent_id,
    related: parseJSON(row.related_json, []),
    compatible: parseJSON(row.compatible_json, []),
    opposite: parseJSON(row.opposite_json, []),
    defaultIntensity: Number(row.default_intensity)
  }));
}

export function getCart(userId) {
  return db.prepare(`
    SELECT c.product_id AS id, c.quantity
    FROM carts c
    JOIN products p ON p.id = c.product_id
    WHERE c.user_id = ? AND p.status = 'published'
    ORDER BY c.created_at
  `).all(Number(userId)).map((row) => ({ id: row.id, quantity: Number(row.quantity) }));
}

export function replaceCart(userId, rawItems) {
  const merged = new Map();
  for (const item of Array.isArray(rawItems) ? rawItems : []) {
    const id = clean(item?.id, 120);
    const quantity = Math.min(10, Math.max(0, Math.floor(Number(item?.quantity || 0))));
    if (id && quantity) merged.set(id, Math.min(10, (merged.get(id) || 0) + quantity));
  }

  const validIds = new Set();
  const productExists = db.prepare("SELECT id FROM products WHERE id = ? AND status = 'published'");
  for (const id of merged.keys()) {
    if (productExists.get(id)) validIds.add(id);
  }

  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare("DELETE FROM carts WHERE user_id = ?").run(Number(userId));
    const insert = db.prepare("INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)");
    for (const id of validIds) insert.run(Number(userId), id, merged.get(id));
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  return getCart(userId);
}

export function mergeCart(userId, rawItems) {
  const combined = new Map(getCart(userId).map((item) => [item.id, item.quantity]));
  for (const item of Array.isArray(rawItems) ? rawItems : []) {
    const id = clean(item?.id, 120);
    const quantity = Math.min(10, Math.max(0, Math.floor(Number(item?.quantity || 0))));
    if (id && quantity) combined.set(id, Math.min(10, (combined.get(id) || 0) + quantity));
  }
  return replaceCart(userId, [...combined].map(([id, quantity]) => ({ id, quantity })));
}

function generateOrderNumber() {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `ORG-${day}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function orderItems(orderId) {
  return db.prepare(`
    SELECT product_id AS productId, product_name AS productName, sku,
           unit_price AS unitPrice, quantity, line_total AS lineTotal
    FROM order_items
    WHERE order_id = ?
    ORDER BY id
  `).all(Number(orderId)).map((item) => ({
    ...item,
    unitPrice: Number(item.unitPrice),
    quantity: Number(item.quantity),
    lineTotal: Number(item.lineTotal)
  }));
}

function orderEvents(orderId) {
  return db.prepare(`
    SELECT event_type AS type, status, note, created_at AS createdAt
    FROM order_events
    WHERE order_id = ?
    ORDER BY id DESC
  `).all(Number(orderId));
}

function orderFromRow(row) {
  return {
    id: Number(row.id),
    orderNumber: row.order_number,
    userId: Number(row.user_id),
    customerName: row.customer_name,
    phone: row.phone,
    address: row.address,
    governorate: row.governorate,
    notes: row.notes,
    paymentMethod: row.payment_method,
    paymentProvider: row.payment_provider || row.payment_method || "cod",
    status: row.workflow_status || row.status,
    paymentStatus: row.payment_status || "pending",
    shippingCarrier: row.shipping_carrier || "",
    trackingNumber: row.tracking_number || "",
    internalNotes: row.internal_notes || "",
    subtotal: Number(row.subtotal),
    shippingTotal: Number(row.shipping_total),
    total: Number(row.total),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    items: orderItems(row.id),
    timeline: orderEvents(row.id)
  };
}

export function createOrder(userId, customer) {
  const items = db.prepare(`
    SELECT c.product_id, c.quantity, p.name_ar, p.name_en, p.sku, p.price
    FROM carts c
    JOIN products p ON p.id = c.product_id
    WHERE c.user_id = ? AND p.status = 'published'
    ORDER BY c.id
  `).all(Number(userId));
  if (!items.length) {
    const error = new Error("EMPTY_CART");
    error.code = "EMPTY_CART";
    throw error;
  }

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const shippingTotal = 0;
  const total = subtotal + shippingTotal;
  let orderNumber = generateOrderNumber();

  db.exec("BEGIN IMMEDIATE");
  try {
    let result;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      try {
        result = db.prepare(`
          INSERT INTO orders (
            order_number, user_id, customer_name, phone, address, governorate,
            notes, payment_method, payment_provider, subtotal, shipping_total, total
          ) VALUES (?, ?, ?, ?, ?, ?, ?, 'cod', ?, ?, ?, ?)
        `).run(
          orderNumber,
          Number(userId),
          clean(customer.name, 100),
          clean(customer.phone, 30),
          clean(customer.address, 500),
          clean(customer.governorate, 100),
          clean(customer.notes, 1000),
          customer.paymentProvider === "paymob" ? "paymob" : "cod",
          subtotal,
          shippingTotal,
          total
        );
        break;
      } catch (error) {
        if (!String(error.message).includes("UNIQUE") || attempt === 3) throw error;
        orderNumber = generateOrderNumber();
      }
    }

    const insertItem = db.prepare(`
      INSERT INTO order_items (
        order_id, product_id, product_name, sku, unit_price, quantity, line_total
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const item of items) {
      const productName = item.name_ar || item.name_en;
      const lineTotal = Number(item.price) * Number(item.quantity);
      insertItem.run(
        result.lastInsertRowid,
        item.product_id,
        productName,
        item.sku,
        Number(item.price),
        Number(item.quantity),
        lineTotal
      );
    }
    db.prepare("DELETE FROM carts WHERE user_id = ?").run(Number(userId));
    db.prepare(`
      INSERT INTO order_events (order_id, event_type, status, note)
      VALUES (?, 'order_created', 'new', 'Order created')
    `).run(result.lastInsertRowid);
    db.exec("COMMIT");
    return getOrderById(result.lastInsertRowid);
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

export function getOrderById(orderId) {
  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(Number(orderId));
  return row ? orderFromRow(row) : null;
}

export function listOrdersForUser(userId) {
  return db.prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC")
    .all(Number(userId))
    .map(orderFromRow);
}

export function listAllOrders() {
  return db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all().map(orderFromRow);
}

export function updateOrderStatus(orderId, status) {
  const allowed = new Set([
    "new", "confirmed", "processing", "ready_to_ship", "shipped",
    "delivered", "completed", "cancelled", "returned", "refunded"
  ]);
  if (!allowed.has(status)) return null;
  const coarseStatus = {
    new: "new",
    confirmed: "new",
    processing: "processing",
    ready_to_ship: "processing",
    shipped: "shipped",
    delivered: "completed",
    completed: "completed",
    cancelled: "cancelled",
    returned: "cancelled",
    refunded: "cancelled"
  }[status];
  db.exec("BEGIN IMMEDIATE");
  let result;
  try {
    result = db.prepare(`
      UPDATE orders SET status = ?, workflow_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(coarseStatus, status, Number(orderId));
    if (result.changes) {
      db.prepare(`
        INSERT INTO order_events (order_id, event_type, status, note)
        VALUES (?, 'status_changed', ?, '')
      `).run(Number(orderId), status);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  return result.changes ? getOrderById(orderId) : null;
}

export function updateOrderAdmin(orderId, input = {}) {
  const allowedStatuses = new Set([
    "new", "confirmed", "processing", "ready_to_ship", "shipped",
    "delivered", "completed", "cancelled", "returned", "refunded"
  ]);
  const paymentStatuses = new Set(["pending", "paid", "partially_paid", "failed", "refunded"]);
  const current = db.prepare("SELECT * FROM orders WHERE id = ?").get(Number(orderId));
  if (!current) return null;
  const nextStatus = allowedStatuses.has(input.status) ? input.status : (current.workflow_status || current.status);
  const coarseStatus = {
    new: "new", confirmed: "new", processing: "processing", ready_to_ship: "processing",
    shipped: "shipped", delivered: "completed", completed: "completed",
    cancelled: "cancelled", returned: "cancelled", refunded: "cancelled"
  }[nextStatus];
  const paymentStatus = paymentStatuses.has(input.paymentStatus) ? input.paymentStatus : current.payment_status;
  const carrier = clean(input.shippingCarrier ?? current.shipping_carrier, 120);
  const tracking = clean(input.trackingNumber ?? current.tracking_number, 160);
  const internalNotes = clean(input.internalNotes ?? current.internal_notes, 4000);
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare(`
      UPDATE orders SET status = ?, workflow_status = ?, payment_status = ?,
        shipping_carrier = ?, tracking_number = ?, internal_notes = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(coarseStatus, nextStatus, paymentStatus, carrier, tracking, internalNotes, Number(orderId));
    if (nextStatus !== (current.workflow_status || current.status)) {
      db.prepare(`
        INSERT INTO order_events (order_id, event_type, status, note)
        VALUES (?, 'status_changed', ?, '')
      `).run(Number(orderId), nextStatus);
    }
    if (
      paymentStatus !== current.payment_status || carrier !== current.shipping_carrier
      || tracking !== current.tracking_number || internalNotes !== current.internal_notes
    ) {
      db.prepare(`
        INSERT INTO order_events (order_id, event_type, status, note)
        VALUES (?, 'admin_updated', ?, 'Order fulfilment details updated')
      `).run(Number(orderId), nextStatus);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  return getOrderById(orderId);
}

export function getFragranceNotesState() {
  const row = db.prepare("SELECT payload_json FROM fragrance_notes_state WHERE id = 1").get();
  return parseJSON(row?.payload_json || "{}", {});
}

export function saveFragranceNotesState(payload) {
  const value = payload && typeof payload === "object" ? payload : {};
  const serialized = JSON.stringify(value);
  if (Buffer.byteLength(serialized, "utf8") > 2_000_000) {
    const error = new Error("NOTES_STATE_TOO_LARGE");
    error.code = "NOTES_STATE_TOO_LARGE";
    throw error;
  }
  db.prepare(`
    INSERT INTO fragrance_notes_state (id, payload_json, updated_at)
    VALUES (1, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET payload_json = excluded.payload_json, updated_at = CURRENT_TIMESTAMP
  `).run(serialized);
  return getFragranceNotesState();
}

export function getAdminWorkspaceState() {
  const row = db.prepare("SELECT payload_json FROM admin_workspace_state WHERE id = 1").get();
  return parseJSON(row?.payload_json || "{}", {});
}

export function saveAdminWorkspaceState(payload) {
  const value = payload && typeof payload === "object" ? payload : {};
  const serialized = JSON.stringify(value);
  if (Buffer.byteLength(serialized, "utf8") > 2_000_000) {
    const error = new Error("ADMIN_STATE_TOO_LARGE");
    error.code = "ADMIN_STATE_TOO_LARGE";
    throw error;
  }
  db.prepare(`
    INSERT INTO admin_workspace_state (id, payload_json, updated_at)
    VALUES (1, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET payload_json = excluded.payload_json, updated_at = CURRENT_TIMESTAMP
  `).run(serialized);
  return getAdminWorkspaceState();
}

export function recordActivity(userId, action, entityType = "", entityId = "", details = {}) {
  db.prepare(`
    INSERT INTO activity_log (user_id, action, entity_type, entity_id, details_json)
    VALUES (?, ?, ?, ?, ?)
  `).run(Number(userId) || null, clean(action, 120), clean(entityType, 80), clean(entityId, 160), JSON.stringify(details));
}

export function listActivity(limit = 100) {
  return db.prepare(`
    SELECT a.id, a.action, a.entity_type AS entityType, a.entity_id AS entityId,
      a.details_json AS detailsJson, a.created_at AS createdAt,
      u.name AS userName, u.email AS userEmail
    FROM activity_log a LEFT JOIN users u ON u.id = a.user_id
    ORDER BY a.id DESC LIMIT ?
  `).all(Math.min(500, Math.max(1, Number(limit) || 100))).map((row) => ({
    ...row,
    details: parseJSON(row.detailsJson, {})
  }));
}

function migrateLegacyProductNotes() {
  const rows = db.prepare(`
    SELECT p.* FROM products p
    WHERE NOT EXISTS (SELECT 1 FROM product_note_refs r WHERE r.product_id = p.id)
  `).all();
  for (const row of rows) {
    const metadata = parseJSON(row.catalog_json, {});
    syncProductNoteReferences(row.id, {
      ...metadata,
      notes: metadata.notes || {},
      notesAr: parseJSON(row.notes_ar_json),
      notesEn: parseJSON(row.notes_en_json),
      noteLibrary: metadata.noteLibrary || {}
    });
    syncProductFilterValues(row.id, {
      ...metadata,
      category: row.category,
      brand: row.brand,
      concentration: row.concentration,
      type: row.type_ar,
      typeEn: row.type_en,
      notesAr: parseJSON(row.notes_ar_json),
      notesEn: parseJSON(row.notes_en_json)
    });
  }
}

migrateLegacyProductNotes();

export async function ensureAdminFromEnvironment() {
  const email = normalizedEmail(process.env.ORIGO_ADMIN_EMAIL);
  const password = String(process.env.ORIGO_ADMIN_PASSWORD || "");
  if (!email || !password) return null;
  const existing = findUserByEmail(email);
  if (existing) {
    if (existing.role !== "admin") {
      db.prepare("UPDATE users SET role = 'admin', updated_at = CURRENT_TIMESTAMP WHERE id = ?")
        .run(existing.id);
    }
    return findUserById(existing.id);
  }
  if (password.length < 10) throw new Error("ORIGO_ADMIN_PASSWORD must contain at least 10 characters.");
  return createUser({
    name: clean(process.env.ORIGO_ADMIN_NAME, 100) || "ORIGO Admin",
    email,
    passwordHash: await hashPassword(password),
    role: "admin"
  });
}

export const databasePath = DB_PATH;
export const databaseDriver = "sql.js-wasm";
