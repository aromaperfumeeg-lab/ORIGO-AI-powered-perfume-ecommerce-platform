import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { openPortableDatabase } from "./portable-database.mjs";
import {
  createHash,
  randomBytes,
  randomInt,
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

  CREATE TABLE IF NOT EXISTS password_reset_challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp', 'sms')),
    code_hash TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    expires_at TEXT NOT NULL,
    consumed_at TEXT,
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

  CREATE TABLE IF NOT EXISTS product_options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    option_group TEXT NOT NULL,
    slug TEXT NOT NULL,
    name_ar TEXT NOT NULL DEFAULT '',
    name_en TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    icon TEXT NOT NULL DEFAULT '',
    color TEXT NOT NULL DEFAULT '',
    metadata_json TEXT NOT NULL DEFAULT '{}',
    sort_order INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    usage_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (option_group, slug)
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

  CREATE TABLE IF NOT EXISTS reference_perfumes (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    brand TEXT NOT NULL,
    image TEXT NOT NULL DEFAULT '',
    concentration TEXT NOT NULL DEFAULT '',
    size TEXT NOT NULL DEFAULT '',
    reference_price REAL NOT NULL DEFAULT 0 CHECK (reference_price >= 0),
    gender TEXT NOT NULL DEFAULT 'unisex',
    family_ar TEXT NOT NULL DEFAULT '',
    family_en TEXT NOT NULL DEFAULT '',
    notes_json TEXT NOT NULL DEFAULT '{}',
    accords_json TEXT NOT NULL DEFAULT '[]',
    performance_json TEXT NOT NULL DEFAULT '{}',
    seasons_json TEXT NOT NULL DEFAULT '[]',
    occasions_json TEXT NOT NULL DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'hidden')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS alternative_matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_id TEXT NOT NULL REFERENCES reference_perfumes(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    similarity INTEGER NOT NULL CHECK (similarity BETWEEN 0 AND 100),
    confidence INTEGER NOT NULL CHECK (confidence BETWEEN 0 AND 100),
    reason_ar TEXT NOT NULL DEFAULT '',
    reason_en TEXT NOT NULL DEFAULT '',
    similarities_ar_json TEXT NOT NULL DEFAULT '[]',
    similarities_en_json TEXT NOT NULL DEFAULT '[]',
    differences_ar_json TEXT NOT NULL DEFAULT '[]',
    differences_en_json TEXT NOT NULL DEFAULT '[]',
    shared_notes_ar_json TEXT NOT NULL DEFAULT '[]',
    shared_notes_en_json TEXT NOT NULL DEFAULT '[]',
    comparison_json TEXT NOT NULL DEFAULT '{}',
    sort_order INTEGER NOT NULL DEFAULT 0,
    pinned INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'draft')),
    last_reviewed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (reference_id, product_id)
  );

  CREATE TABLE IF NOT EXISTS alternative_search_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT NOT NULL,
    results_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS comparison_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_id TEXT REFERENCES reference_perfumes(id) ON DELETE SET NULL,
    product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    session_key TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS homepage_alternatives_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    payload_json TEXT NOT NULL DEFAULT '{}',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  CREATE INDEX IF NOT EXISTS idx_alternative_matches_product ON alternative_matches(product_id, status, sort_order);
  CREATE INDEX IF NOT EXISTS idx_alternative_matches_reference ON alternative_matches(reference_id, status, sort_order);
  CREATE INDEX IF NOT EXISTS idx_comparison_events_match ON comparison_events(reference_id, product_id, event_type, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_alternative_search_created ON alternative_search_logs(created_at DESC);
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

function migrateOrdersToDetachedAccounts() {
  const userColumn = db.prepare("PRAGMA table_info(orders)").all().find((column) => column.name === "user_id");
  const userForeignKey = db.prepare("PRAGMA foreign_key_list(orders)").all().find((key) => key.from === "user_id");
  if (!userColumn?.notnull && userForeignKey?.on_delete === "SET NULL") return;
  const source = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'orders'").get()?.sql;
  if (!source) return;
  const columns = db.prepare("PRAGMA table_info(orders)").all().map((column) => column.name);
  const indexes = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'index' AND tbl_name = 'orders' AND sql IS NOT NULL").all().map((row) => row.sql);
  const migratedSchema = source
    .replace(/^CREATE TABLE\s+orders\s*\(/i, "CREATE TABLE orders_account_migration (")
    .replace(/user_id\s+INTEGER\s+NOT NULL\s+REFERENCES\s+users\(id\)\s+ON DELETE\s+RESTRICT/i, "user_id INTEGER REFERENCES users(id) ON DELETE SET NULL");
  db.exec("PRAGMA foreign_keys = OFF");
  try {
    db.exec("BEGIN IMMEDIATE");
    db.exec(migratedSchema);
    const columnList = columns.map((column) => `\"${column.replaceAll('"', '""')}\"`).join(", ");
    db.exec(`INSERT INTO orders_account_migration (${columnList}) SELECT ${columnList} FROM orders`);
    db.exec("DROP TABLE orders");
    db.exec("ALTER TABLE orders_account_migration RENAME TO orders");
    indexes.forEach((sql) => db.exec(sql));
    db.exec("COMMIT");
  } catch (error) {
    try { db.exec("ROLLBACK"); } catch {}
    throw error;
  } finally {
    db.exec("PRAGMA foreign_keys = ON");
  }
}

migrateOrdersToDetachedAccounts();

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
    image: "assets/nocturne-01.svg",
    gender: "unisex", mainIngredients: ["عود", "ورد", "عنبر"], mainAccords: ["عود", "عنبر", "وردي", "خشبي"], accordProfile: [{id:"woody",nameAr:"خشبي",nameEn:"Woody",color:"#9b6b43",icon:"♢",strength:92},{id:"amber",nameAr:"عنبري",nameEn:"Amber",color:"#c47b16",icon:"◆",strength:84},{id:"floral",nameAr:"زهري",nameEn:"Floral",color:"#ec6d9c",icon:"❀",strength:66},{id:"warm-spicy",nameAr:"حار دافئ",nameEn:"Warm spicy",color:"#b85032",icon:"✦",strength:58}], seasons: ["winter", "autumn"], usageTimes: ["night"], occasions: ["formal", "romantic"]
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
    image: "assets/velvet-iris.svg",
    gender: "women", mainIngredients: ["سوسن", "فانيليا", "مسك"], mainAccords: ["بودري", "سوسن", "فانيليا", "مسكي"], accordProfile: [{id:"powdery",nameAr:"بودري",nameEn:"Powdery",color:"#ef72a4",icon:"◌",strength:90},{id:"floral",nameAr:"زهري",nameEn:"Floral",color:"#ec6d9c",icon:"❀",strength:82},{id:"vanilla",nameAr:"فانيليا",nameEn:"Vanilla",color:"#f2ae2e",icon:"✿",strength:74},{id:"musky",nameAr:"مسكي",nameEn:"Musky",color:"#aa8ac7",icon:"≋",strength:61}], seasons: ["spring", "autumn"], usageTimes: ["day", "evening"], occasions: ["work", "occasions", "romantic"]
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
    image: "assets/smoked-saffron.svg",
    gender: "men", mainIngredients: ["جلد", "زعفران", "أخشاب"], mainAccords: ["جلدي", "زعفراني", "خشبي", "دافئ"], accordProfile: [{id:"leather",nameAr:"جلدي",nameEn:"Leather",color:"#635047",icon:"▰",strength:94},{id:"warm-spicy",nameAr:"حار دافئ",nameEn:"Warm spicy",color:"#b85032",icon:"✦",strength:83},{id:"woody",nameAr:"خشبي",nameEn:"Woody",color:"#9b6b43",icon:"♢",strength:76},{id:"amber",nameAr:"عنبري",nameEn:"Amber",color:"#c47b16",icon:"◆",strength:59}], seasons: ["winter", "autumn"], usageTimes: ["night"], occasions: ["formal", "occasions"]
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
    image: "assets/citrus-veil.svg",
    gender: "unisex", mainIngredients: ["برغموت", "نيرولي", "أرز"], mainAccords: ["حمضي", "منعش", "أخضر", "خشبي"], accordProfile: [{id:"citrus",nameAr:"حمضي",nameEn:"Citrus",color:"#a7bd31",icon:"◉",strength:95},{id:"fresh",nameAr:"منعش",nameEn:"Fresh",color:"#24a7a1",icon:"≈",strength:88},{id:"aromatic",nameAr:"أروماتيك",nameEn:"Aromatic",color:"#4e9274",icon:"♧",strength:65},{id:"woody",nameAr:"خشبي",nameEn:"Woody",color:"#9b6b43",icon:"♢",strength:46}], seasons: ["spring", "summer"], usageTimes: ["day", "daily"], occasions: ["work", "travel", "casual"]
  }
];

const insertSeedProduct = db.prepare(`
  INSERT OR IGNORE INTO products (
    id, sku, brand, name_ar, name_en, category, type_ar, type_en, concentration,
    sizes_json, notes_ar_json, notes_en_json, price, old_price, badge_ar, badge_en,
    image, catalog_json, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')
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
      product.image,
      JSON.stringify({ gender: product.gender, mainIngredients: product.mainIngredients, mainAccords: product.mainAccords, accordProfile: product.accordProfile, seasons: product.seasons, usageTimes: product.usageTimes, occasions: product.occasions })
    );
    const stored = parseJSON(db.prepare("SELECT catalog_json FROM products WHERE id=?").get(product.id)?.catalog_json, {});
    const defaults = { gender: product.gender, mainIngredients: product.mainIngredients, mainAccords: product.mainAccords, accordProfile: product.accordProfile, seasons: product.seasons, usageTimes: product.usageTimes, occasions: product.occasions };
    const merged = { ...defaults, ...stored };
    for (const [key, value] of Object.entries(defaults)) if (stored[key] == null || (Array.isArray(stored[key]) && !stored[key].length)) merged[key] = value;
    db.prepare("UPDATE products SET catalog_json=? WHERE id=?").run(JSON.stringify(merged), product.id);
  }
  db.exec("COMMIT");
} catch (error) {
  db.exec("ROLLBACK");
  throw error;
}

const seedReferencePerfumes = [
  {
    id: "ombre-leather", slug: "ombre-leather", nameAr: "أومبري ليذر", nameEn: "Ombre Leather",
    brand: "Tom Ford", image: "assets/references/ombre-leather.svg", concentration: "Eau de Parfum", size: "100 ML",
    referencePrice: 9800, gender: "unisex", familyAr: "جلدي خشبي", familyEn: "Leather Woody",
    notes: { topAr: ["هيل"], topEn: ["Cardamom"], heartAr: ["جلد", "ياسمين"], heartEn: ["Leather", "Jasmine"], baseAr: ["عنبر", "باتشولي"], baseEn: ["Amber", "Patchouli"] },
    accords: ["leather", "warm spicy", "amber"], performance: { longevity: 9, projection: 8 }, seasons: ["autumn", "winter"], occasions: ["evening", "formal"]
  },
  {
    id: "dior-homme-intense", slug: "dior-homme-intense", nameAr: "ديور هوم إنتنس", nameEn: "Dior Homme Intense",
    brand: "Dior", image: "assets/references/dior-homme-intense.svg", concentration: "Eau de Parfum", size: "100 ML",
    referencePrice: 8600, gender: "men", familyAr: "زهري خشبي", familyEn: "Floral Woody",
    notes: { topAr: ["لافندر"], topEn: ["Lavender"], heartAr: ["سوسن"], heartEn: ["Iris"], baseAr: ["أرز", "فانيليا"], baseEn: ["Cedar", "Vanilla"] },
    accords: ["iris", "powdery", "woody"], performance: { longevity: 8, projection: 7 }, seasons: ["autumn", "winter"], occasions: ["evening", "formal"]
  },
  {
    id: "oud-wood", slug: "oud-wood", nameAr: "عود وود", nameEn: "Oud Wood",
    brand: "Tom Ford", image: "assets/references/oud-wood.svg", concentration: "Eau de Parfum", size: "100 ML",
    referencePrice: 11200, gender: "unisex", familyAr: "خشبي شرقي", familyEn: "Woody Oriental",
    notes: { topAr: ["ورد برازيلي", "هيل"], topEn: ["Rosewood", "Cardamom"], heartAr: ["عود", "صندل"], heartEn: ["Oud", "Sandalwood"], baseAr: ["عنبر", "فانيليا"], baseEn: ["Amber", "Vanilla"] },
    accords: ["oud", "woody", "warm spicy"], performance: { longevity: 8, projection: 7 }, seasons: ["autumn", "winter"], occasions: ["evening", "formal"]
  },
  {
    id: "neroli-portofino", slug: "neroli-portofino", nameAr: "نيرولي بورتوفينو", nameEn: "Neroli Portofino",
    brand: "Tom Ford", image: "assets/references/neroli-portofino.svg", concentration: "Eau de Parfum", size: "100 ML",
    referencePrice: 10500, gender: "unisex", familyAr: "حمضي عطري", familyEn: "Citrus Aromatic",
    notes: { topAr: ["برغموت", "ليمون"], topEn: ["Bergamot", "Lemon"], heartAr: ["نيرولي", "زهر البرتقال"], heartEn: ["Neroli", "Orange Blossom"], baseAr: ["مسك", "عنبر"], baseEn: ["Musk", "Amber"] },
    accords: ["citrus", "fresh", "white floral"], performance: { longevity: 6, projection: 6 }, seasons: ["spring", "summer"], occasions: ["day", "casual"]
  }
];

const seedAlternativeMatches = [
  { referenceId: "ombre-leather", productId: "smoked", similarity: 94, confidence: 91, sortOrder: 1,
    reasonAr: "طابع جلدي دافئ مدعوم بالزعفران والأخشاب مع حضور مسائي واضح.", reasonEn: "A warm leather profile supported by saffron and woods with a confident evening presence.",
    similaritiesAr: ["قلب جلدي واضح", "دفء متبّل", "أداء مسائي قوي"], similaritiesEn: ["Distinct leather heart", "Warm spicy character", "Strong evening performance"],
    differencesAr: ["البديل أكثر زعفرانًا", "الأصل أكثر جفافًا"], differencesEn: ["The alternative is more saffron-forward", "The reference is drier"],
    sharedAr: ["جلد", "عنبر", "أخشاب"], sharedEn: ["Leather", "Amber", "Woods"], comparison: { longevity: 9, projection: 8, sweetness: 5, freshness: 2, warmth: 9, woods: 8, spice: 8 } },
  { referenceId: "dior-homme-intense", productId: "velvet-iris", similarity: 92, confidence: 90, sortOrder: 2,
    reasonAr: "السوسن البودري والفانيليا الناعمة يقدمان طابعًا أنيقًا قريبًا مع لمسة أكثر نعومة.", reasonEn: "Powdery iris and soft vanilla create a similarly elegant profile with a gentler finish.",
    similaritiesAr: ["سوسن بودري", "قاعدة فانيليا", "طابع أنيق"], similaritiesEn: ["Powdery iris", "Vanilla base", "Elegant character"],
    differencesAr: ["البديل أنعم وأقل كثافة", "الأصل أكثر خشبية"], differencesEn: ["The alternative is softer and lighter", "The reference is woodier"],
    sharedAr: ["سوسن", "فانيليا", "أخشاب"], sharedEn: ["Iris", "Vanilla", "Woods"], comparison: { longevity: 8, projection: 7, sweetness: 7, freshness: 3, warmth: 7, woods: 6, spice: 3 } },
  { referenceId: "oud-wood", productId: "nocturne", similarity: 91, confidence: 89, sortOrder: 3,
    reasonAr: "مزيج العود والعنبر والأخشاب يمنح تجربة شرقية عميقة بقيمة أفضل.", reasonEn: "A blend of oud, amber and woods delivers a deep oriental experience at better value.",
    similaritiesAr: ["عود مصقول", "عنبر دافئ", "قاعدة خشبية"], similaritiesEn: ["Polished oud", "Warm amber", "Woody base"],
    differencesAr: ["البديل أكثر وردية", "الأصل أكثر توابل جافة"], differencesEn: ["The alternative is rosier", "The reference has drier spices"],
    sharedAr: ["عود", "عنبر", "أخشاب"], sharedEn: ["Oud", "Amber", "Woods"], comparison: { longevity: 9, projection: 8, sweetness: 6, freshness: 2, warmth: 9, woods: 9, spice: 6 } },
  { referenceId: "neroli-portofino", productId: "citrus-veil", similarity: 89, confidence: 87, sortOrder: 4,
    reasonAr: "افتتاحية برغموت ونيرولي منعشة بطابع نظيف مناسب للصيف والاستخدام اليومي.", reasonEn: "A fresh bergamot and neroli opening with a clean profile for summer and everyday wear.",
    similaritiesAr: ["حمضيات مشرقة", "نيرولي نظيف", "طابع صيفي"], similaritiesEn: ["Bright citrus", "Clean neroli", "Summery profile"],
    differencesAr: ["البديل أكثر خشبية في القاعدة", "الأصل أكثر زهرية"], differencesEn: ["The alternative has a woodier base", "The reference is more floral"],
    sharedAr: ["برغموت", "نيرولي", "مسك"], sharedEn: ["Bergamot", "Neroli", "Musk"], comparison: { longevity: 7, projection: 6, sweetness: 3, freshness: 10, warmth: 2, woods: 5, spice: 2 } }
];

const insertReferencePerfume = db.prepare(`
  INSERT OR IGNORE INTO reference_perfumes
    (id, slug, name_ar, name_en, brand, image, concentration, size, reference_price, gender,
     family_ar, family_en, notes_json, accords_json, performance_json, seasons_json, occasions_json)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const insertAlternativeMatch = db.prepare(`
  INSERT OR IGNORE INTO alternative_matches
    (reference_id, product_id, similarity, confidence, reason_ar, reason_en,
     similarities_ar_json, similarities_en_json, differences_ar_json, differences_en_json,
     shared_notes_ar_json, shared_notes_en_json, comparison_json, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
db.exec("BEGIN IMMEDIATE");
try {
  for (const item of seedReferencePerfumes) insertReferencePerfume.run(
    item.id, item.slug, item.nameAr, item.nameEn, item.brand, item.image, item.concentration, item.size,
    item.referencePrice, item.gender, item.familyAr, item.familyEn, JSON.stringify(item.notes),
    JSON.stringify(item.accords), JSON.stringify(item.performance), JSON.stringify(item.seasons), JSON.stringify(item.occasions)
  );
  for (const item of seedAlternativeMatches) insertAlternativeMatch.run(
    item.referenceId, item.productId, item.similarity, item.confidence, item.reasonAr, item.reasonEn,
    JSON.stringify(item.similaritiesAr), JSON.stringify(item.similaritiesEn),
    JSON.stringify(item.differencesAr), JSON.stringify(item.differencesEn),
    JSON.stringify(item.sharedAr), JSON.stringify(item.sharedEn), JSON.stringify(item.comparison), item.sortOrder
  );
  db.prepare(`INSERT OR IGNORE INTO homepage_alternatives_settings (id, payload_json) VALUES (1, ?)`).run(JSON.stringify({
    enabled: true, sectionEnabled: true, bannerEnabled: true, count: 4, mode: "manual",
    titleAr: "بدائل تستحق التجربة", titleEn: "Alternatives Worth Trying",
    descriptionAr: "عطور متوفرة بطابع قريب من أشهر العطور العالمية", descriptionEn: "Available fragrances inspired by renowned scents",
    bannerTitleAr: "تحب عطرًا عالميًا؟ اكتشف بديله بسعر أفضل", bannerTitleEn: "Love an iconic fragrance? Discover a better-value alternative",
    bannerDescriptionAr: "بدائل مختارة بعناية، بطابع قريب وأداء مميز وتوفير أكبر", bannerDescriptionEn: "Carefully selected alternatives with a familiar character, great performance and better value",
    featuredProductIds: ["smoked", "velvet-iris", "nocturne", "citrus-veil"], position: "before-finder", startsAt: null, endsAt: null
  }));
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
    size: metadata.size || parseJSON(row.sizes_json)?.[0] || "",
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
    inventory: {
      quantity: Number(row.stock_quantity ?? 25),
      reserved: Number(row.reserved_quantity ?? 0),
      available: Math.max(0, Number(row.stock_quantity ?? 25) - Number(row.reserved_quantity ?? 0)),
      tracked: row.track_inventory == null ? true : Boolean(row.track_inventory)
    },
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
    mainIngredients: Array.isArray(metadata.mainIngredients) ? metadata.mainIngredients : [],
    accordProfile: Array.isArray(metadata.accordProfile) ? metadata.accordProfile : [],
    profileImages: metadata.profileImages && typeof metadata.profileImages === "object" ? metadata.profileImages : {},
    mainAccords: Array.isArray(metadata.mainAccords) ? metadata.mainAccords : (Array.isArray(metadata.accords) ? metadata.accords : []),
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

function normalizedPhone(value) {
  return clean(value, 30).replace(/[^\d+]/g, "");
}

export function findUserForPasswordReset(identifier) {
  const email = normalizedEmail(identifier);
  const phone = normalizedPhone(identifier);
  const byEmail = email.includes("@") ? db.prepare("SELECT * FROM users WHERE email = ?").get(email) : null;
  if (byEmail) return byEmail;
  if (!phone) return null;
  return db.prepare("SELECT * FROM users").all().find((user) => normalizedPhone(user.phone) === phone) || null;
}

export async function createPasswordResetChallenge(userId, channel) {
  const id = Number(userId);
  db.prepare("DELETE FROM password_reset_challenges WHERE consumed_at IS NOT NULL OR julianday(expires_at) <= julianday('now')").run();
  const recent = db.prepare(`SELECT id FROM password_reset_challenges WHERE user_id = ? AND channel = ? AND created_at >= datetime('now', '-60 seconds')`).get(id, channel);
  if (recent) return null;
  db.prepare("UPDATE password_reset_challenges SET consumed_at = CURRENT_TIMESTAMP WHERE user_id = ? AND consumed_at IS NULL").run(id);
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const publicId = randomBytes(24).toString("base64url");
  const expiresAt = new Date(Date.now() + 10 * 60_000).toISOString();
  db.prepare(`INSERT INTO password_reset_challenges (public_id, user_id, channel, code_hash, expires_at) VALUES (?, ?, ?, ?, ?)`)
    .run(publicId, id, channel, await hashPassword(code), expiresAt);
  return { publicId, code, expiresAt };
}

export function cancelPasswordResetChallenge(publicId) {
  db.prepare("DELETE FROM password_reset_challenges WHERE public_id = ?").run(clean(publicId, 100));
}

export async function consumePasswordResetChallenge(publicId, code, newPasswordHash) {
  const challenge = db.prepare(`SELECT * FROM password_reset_challenges WHERE public_id = ? AND consumed_at IS NULL AND julianday(expires_at) > julianday('now')`).get(clean(publicId, 100));
  if (!challenge || challenge.attempts >= 5) return false;
  const valid = await verifyPassword(String(code || ""), challenge.code_hash);
  if (!valid) {
    db.prepare("UPDATE password_reset_challenges SET attempts = attempts + 1 WHERE id = ?").run(challenge.id);
    return false;
  }
  db.prepare("UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(newPasswordHash, challenge.user_id);
  db.prepare("DELETE FROM sessions WHERE user_id = ?").run(challenge.user_id);
  db.prepare("UPDATE password_reset_challenges SET consumed_at = CURRENT_TIMESTAMP WHERE id = ?").run(challenge.id);
  return true;
}

export function purgeAllUsers() {
  const count = Number(db.prepare("SELECT COUNT(*) AS count FROM users").get().count || 0);
  const tables = new Set(db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map((row) => row.name));
  const orderColumns = tables.has("orders") ? new Set(db.prepare("PRAGMA table_info(orders)").all().map((column) => column.name)) : new Set();
  [
    "password_reset_challenges", "sessions", "carts", "saved_addresses", "customer_loyalty",
    "customer_notifications", "customer_wishlist", "customer_payment_methods", "fragrance_finder_sessions",
    "product_performance_vote_reports", "product_performance_votes"
  ].filter((table) => tables.has(table)).forEach((table) => db.prepare(`DELETE FROM ${table}`).run());
  [
    ["activity_log", "user_id"], ["feedback_requests", "customer_id"],
    ["experience_feedback", "customer_id"], ["product_reviews", "customer_id"], ["support_cases", "customer_id"],
    ["marketing_insights", "created_by"], ["product_editorial_performance", "updated_by"],
    ["imported_performance_summaries", "created_by"]
  ].filter(([table]) => tables.has(table)).forEach(([table, column]) => db.prepare(`UPDATE ${table} SET ${column} = NULL`).run());
  if (tables.has("orders")) {
    db.prepare(`UPDATE orders SET user_id = NULL${orderColumns.has("email") ? ", email = ''" : ""}`).run();
  }
  db.prepare("DELETE FROM users").run();
  return count;
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
  const status = ["draft", "review", "published", "unavailable"].includes(input.status) ? input.status : "draft";
  const requestedSku = clean(input.sku, 120);
  const requestedBarcode = clean(input.barcode, 120);
  const duplicateSku = requestedSku && db.prepare("SELECT id FROM products WHERE lower(sku)=lower(?) AND id<>? LIMIT 1").get(requestedSku, id);
  if (duplicateSku) throw new Error("SKU مستخدم بالفعل لمنتج آخر.");
  if (requestedBarcode) {
    const rows = db.prepare("SELECT id, catalog_json FROM products WHERE id<>?").all(id);
    if (rows.some((row) => clean(parseJSON(row.catalog_json, {}).barcode, 120) === requestedBarcode)) {
      throw new Error("الباركود مستخدم بالفعل لمنتج آخر.");
    }
  }
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
    requestedSku,
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

  if (input.inventory && typeof input.inventory === "object") {
    const columns = new Set(db.prepare("PRAGMA table_info(products)").all().map((column) => column.name));
    if (columns.has("stock_quantity")) {
      db.prepare(`UPDATE products SET stock_quantity = ?, reserved_quantity = ?, track_inventory = ? WHERE id = ?`).run(
        Math.max(0, Math.floor(Number(input.inventory.quantity ?? 25))),
        Math.max(0, Math.floor(Number(input.inventory.reserved ?? 0))),
        input.inventory.tracked === false ? 0 : 1,
        id
      );
    }
  }
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

function optionSlug(value = "") {
  return clean(value, 160)
    .normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function listProductOptions(group = "", includeInactive = false) {
  const conditions = [];
  const params = [];
  if (group) {
    conditions.push("option_group = ?");
    params.push(clean(group, 80));
  }
  if (!includeInactive) conditions.push("active = 1");
  const rows = db.prepare(`SELECT * FROM product_options${conditions.length ? ` WHERE ${conditions.join(" AND ")}` : ""} ORDER BY usage_count DESC, sort_order ASC, id ASC`).all(...params);
  return rows.map((row) => ({
    id: row.id,
    group: row.option_group,
    slug: row.slug,
    nameAr: row.name_ar,
    nameEn: row.name_en,
    image: row.image,
    icon: row.icon,
    color: row.color,
    metadata: parseJSON(row.metadata_json, {}),
    sortOrder: row.sort_order,
    active: Boolean(row.active),
    usageCount: row.usage_count
  }));
}

export function upsertProductOption(input = {}) {
  const group = clean(input.group, 80);
  const nameAr = clean(input.nameAr, 160);
  const nameEn = clean(input.nameEn, 160);
  const slug = optionSlug(input.slug || nameEn || nameAr);
  if (!group || !slug || (!nameAr && !nameEn)) throw new Error("بيانات الخيار غير مكتملة.");
  const metadata = input.metadata && typeof input.metadata === "object" ? input.metadata : {};
  db.prepare(`
    INSERT INTO product_options (option_group, slug, name_ar, name_en, image, icon, color, metadata_json, sort_order, active, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(option_group, slug) DO UPDATE SET
      name_ar = excluded.name_ar,
      name_en = excluded.name_en,
      image = excluded.image,
      icon = excluded.icon,
      color = excluded.color,
      metadata_json = excluded.metadata_json,
      sort_order = excluded.sort_order,
      active = excluded.active,
      updated_at = CURRENT_TIMESTAMP
  `).run(group, slug, nameAr, nameEn, clean(input.image, 5000000), clean(input.icon, 80), clean(input.color, 32), JSON.stringify(metadata), Number(input.sortOrder || 0), input.active === false ? 0 : 1);
  return listProductOptions(group, true).find((item) => item.slug === slug) || null;
}

export function deleteProductOption(id) {
  const row = db.prepare("SELECT * FROM product_options WHERE id = ?").get(Number(id));
  if (!row) return false;
  if (Number(row.usage_count || 0) > 0) throw new Error("لا يمكن حذف خيار مستخدم؛ أخفه أو استبدله أولًا.");
  return db.prepare("DELETE FROM product_options WHERE id = ?").run(Number(id)).changes > 0;
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

function referencePerfumeFromRow(row) {
  if (!row) return null;
  return {
    id: row.id, slug: row.slug, nameAr: row.name_ar, nameEn: row.name_en, brand: row.brand,
    image: row.image, concentration: row.concentration, size: row.size,
    referencePrice: Number(row.reference_price || 0), gender: row.gender,
    familyAr: row.family_ar, familyEn: row.family_en,
    notes: parseJSON(row.notes_json, {}), accords: parseJSON(row.accords_json, []),
    performance: parseJSON(row.performance_json, {}), seasons: parseJSON(row.seasons_json, []),
    occasions: parseJSON(row.occasions_json, []), status: row.status,
    createdAt: row.created_at, updatedAt: row.updated_at
  };
}

function alternativeMatchFromRow(row, includeMetadata = false) {
  if (!row) return null;
  const productRow = db.prepare("SELECT * FROM products WHERE id = ?").get(row.product_id);
  const referenceRow = db.prepare("SELECT * FROM reference_perfumes WHERE id = ?").get(row.reference_id);
  if (!productRow || !referenceRow) return null;
  return {
    id: Number(row.id), similarity: Number(row.similarity), confidence: Number(row.confidence),
    reasonAr: row.reason_ar, reasonEn: row.reason_en,
    similaritiesAr: parseJSON(row.similarities_ar_json, []), similaritiesEn: parseJSON(row.similarities_en_json, []),
    differencesAr: parseJSON(row.differences_ar_json, []), differencesEn: parseJSON(row.differences_en_json, []),
    sharedNotesAr: parseJSON(row.shared_notes_ar_json, []), sharedNotesEn: parseJSON(row.shared_notes_en_json, []),
    comparison: parseJSON(row.comparison_json, {}), sortOrder: Number(row.sort_order),
    pinned: Boolean(row.pinned), status: row.status, lastReviewedAt: row.last_reviewed_at,
    reference: referencePerfumeFromRow(referenceRow), product: productFromRow(productRow, includeMetadata)
  };
}

export function getHomepageAlternativesSettings() {
  const row = db.prepare("SELECT payload_json FROM homepage_alternatives_settings WHERE id = 1").get();
  return parseJSON(row?.payload_json || "{}", {});
}

export function listAlternatives({ includeHidden = false, query = "", sort = "recommended" } = {}) {
  const rows = db.prepare(`
    SELECT * FROM alternative_matches
    ${includeHidden ? "" : "WHERE status = 'active'"}
    ORDER BY pinned DESC, sort_order, similarity DESC
  `).all();
  let items = rows.map((row) => alternativeMatchFromRow(row, includeHidden)).filter(Boolean);
  if (!includeHidden) items = items.filter((item) => item.reference.status === "active" && item.product.status === "published");
  const needle = clean(query, 200).toLocaleLowerCase("ar");
  if (needle) items = items.filter((item) => [
    item.reference.nameAr, item.reference.nameEn, item.reference.brand,
    item.product.nameAr, item.product.nameEn, item.product.brand,
    ...item.sharedNotesAr, ...item.sharedNotesEn
  ].join(" ").toLocaleLowerCase("ar").includes(needle));
  const eventCounts = Object.fromEntries(db.prepare(`
    SELECT product_id AS productId, COUNT(*) AS count FROM comparison_events
    WHERE created_at >= datetime('now', '-90 days') GROUP BY product_id
  `).all().map((row) => [row.productId, Number(row.count)]));
  items = items.map((item) => ({ ...item, activityScore: eventCounts[item.product.id] || 0 }));
  const sorters = {
    similarity: (a, b) => b.similarity - a.similarity,
    savings: (a, b) => (b.reference.referencePrice - b.product.price) - (a.reference.referencePrice - a.product.price),
    price_asc: (a, b) => a.product.price - b.product.price,
    price_desc: (a, b) => b.product.price - a.product.price,
    popular: (a, b) => b.activityScore - a.activityScore || b.similarity - a.similarity,
    recommended: (a, b) => Number(b.pinned) - Number(a.pinned) || a.sortOrder - b.sortOrder
  };
  items.sort(sorters[sort] || sorters.recommended);
  return items;
}

export function getAlternative(referenceOrProduct) {
  const value = clean(referenceOrProduct, 200);
  const row = db.prepare(`
    SELECT m.* FROM alternative_matches m
    JOIN reference_perfumes r ON r.id = m.reference_id
    WHERE (r.slug = ? OR r.id = ? OR m.product_id = ? OR CAST(m.id AS TEXT) = ?) AND m.status = 'active'
    ORDER BY m.pinned DESC, m.sort_order LIMIT 1
  `).get(value, value, value, value);
  return alternativeMatchFromRow(row, false);
}

export function alternativesPayload(options = {}) {
  return { items: listAlternatives(options), settings: getHomepageAlternativesSettings(), disclaimerAr: "نسبة التشابه تقديرية مبنية على الخصائص العطرية والأداء، وقد يختلف إدراك الرائحة من شخص إلى آخر.", disclaimerEn: "Similarity is an estimate based on fragrance characteristics and performance. Scent perception may vary from person to person." };
}

export function recordAlternativeEvent({ referenceId = null, productId = null, eventType = "view", sessionKey = "", query = "", resultsCount = 0 } = {}) {
  const allowed = new Set(["view", "comparison", "add_to_cart", "wishlist", "search", "product_view"]);
  const safeType = allowed.has(eventType) ? eventType : "view";
  if (safeType === "search") {
    db.prepare("INSERT INTO alternative_search_logs (query, results_count) VALUES (?, ?)")
      .run(clean(query, 200), Math.max(0, Number(resultsCount) || 0));
  } else {
    db.prepare(`INSERT INTO comparison_events (reference_id, product_id, event_type, session_key) VALUES (?, ?, ?, ?)`)
      .run(referenceId ? clean(referenceId, 200) : null, productId ? clean(productId, 200) : null, safeType, clean(sessionKey, 120));
  }
  return { ok: true };
}

export function alternativesAdminPayload() {
  const items = listAlternatives({ includeHidden: true });
  const topSearches = db.prepare(`SELECT query, COUNT(*) AS count FROM alternative_search_logs GROUP BY query ORDER BY count DESC LIMIT 10`).all();
  const events = db.prepare(`SELECT event_type AS eventType, COUNT(*) AS count FROM comparison_events GROUP BY event_type`).all();
  const catalogProducts = listProducts({ includeHidden: true }).map((product) => ({
    id: product.id, nameAr: product.nameAr, nameEn: product.nameEn, brand: product.brand,
    image: product.image, price: product.price, status: product.status
  }));
  return { items, catalogProducts, settings: getHomepageAlternativesSettings(), analytics: { topSearches, events } };
}

function alternativeTokens(value) {
  const normalize = (item) => String(item || "").trim().toLocaleLowerCase("ar");
  return new Set((Array.isArray(value) ? value : String(value || "").split(/[,،·]/)).map(normalize).filter(Boolean));
}

export function calculateAlternativeScore(reference, product) {
  const referenceNotes = alternativeTokens([
    ...(reference?.notes?.topAr || []), ...(reference?.notes?.heartAr || []), ...(reference?.notes?.baseAr || []),
    ...(reference?.notes?.topEn || []), ...(reference?.notes?.heartEn || []), ...(reference?.notes?.baseEn || [])
  ]);
  const productNotes = alternativeTokens([
    ...(product?.notesAr || []), ...(product?.notesEn || []),
    ...(product?.notes?.topAr || []), ...(product?.notes?.heartAr || []), ...(product?.notes?.baseAr || []),
    ...(product?.notes?.topEn || []), ...(product?.notes?.heartEn || []), ...(product?.notes?.baseEn || [])
  ]);
  const shared = [...referenceNotes].filter((note) => productNotes.has(note));
  const noteScore = referenceNotes.size ? (shared.length / referenceNotes.size) * 55 : 30;
  const referenceFamily = `${reference?.familyAr || ""} ${reference?.familyEn || ""}`.toLocaleLowerCase("ar");
  const productFamily = `${product?.familyAr || ""} ${product?.familyEn || ""}`.toLocaleLowerCase("ar");
  const familyScore = referenceFamily && productFamily && (referenceFamily.includes(productFamily) || productFamily.includes(referenceFamily)) ? 20 : 10;
  const concentrationScore = reference?.concentration && product?.concentration && String(reference.concentration).toLowerCase() === String(product.concentration).toLowerCase() ? 10 : 6;
  const score = Math.round(Math.min(98, Math.max(55, noteScore + familyScore + concentrationScore + 12)));
  return { similarity: score, confidence: Math.max(60, Math.min(96, score - 2)), shared };
}

export function saveAlternativesAdmin(input = {}) {
  if (input.settings && typeof input.settings === "object") {
    const current = getHomepageAlternativesSettings();
    const next = { ...current, ...input.settings };
    db.prepare(`
      INSERT INTO homepage_alternatives_settings (id, payload_json, updated_at) VALUES (1, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET payload_json = excluded.payload_json, updated_at = CURRENT_TIMESTAMP
    `).run(JSON.stringify(next));
  }
  if (input.match && typeof input.match === "object") {
    const match = input.match;
    db.prepare(`UPDATE alternative_matches SET similarity = ?, confidence = ?, reason_ar = ?, reason_en = ?,
      sort_order = ?, pinned = ?, status = ?, last_reviewed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(
      Math.min(100, Math.max(0, Number(match.similarity || 0))), Math.min(100, Math.max(0, Number(match.confidence || 0))),
      clean(match.reasonAr, 2000), clean(match.reasonEn, 2000), Number(match.sortOrder || 0), match.pinned ? 1 : 0,
      ["active", "hidden", "draft"].includes(match.status) ? match.status : "active", Number(match.id)
    );
  }
  if (input.reference && typeof input.reference === "object" && input.link && typeof input.link === "object") {
    const value = input.reference;
    const rawSlug = clean(value.slug || value.nameEn || value.nameAr, 120).toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-").replace(/^-+|-+$/g, "");
    const slug = rawSlug || `reference-${Date.now().toString(36)}`;
    const id = clean(value.id || `ref-${slug}`, 160);
    const notes = value.notes && typeof value.notes === "object" ? value.notes : {};
    const array = (entry) => [...new Set((Array.isArray(entry) ? entry : String(entry || "").split(/[,،]/)).map((item) => clean(item, 100)).filter(Boolean))].slice(0, 30);
    const safeNotes = { topAr: array(notes.topAr), topEn: array(notes.topEn), heartAr: array(notes.heartAr), heartEn: array(notes.heartEn), baseAr: array(notes.baseAr), baseEn: array(notes.baseEn) };
    if (!clean(value.nameAr, 200) || !clean(value.nameEn, 200) || !clean(value.brand, 160)) throw new Error("ALTERNATIVE_REFERENCE_REQUIRED");
    db.prepare(`INSERT INTO reference_perfumes
      (id, slug, name_ar, name_en, brand, image, concentration, size, reference_price, gender, family_ar, family_en, notes_json, accords_json, performance_json, seasons_json, occasions_json, status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET slug=excluded.slug, name_ar=excluded.name_ar, name_en=excluded.name_en,
      brand=excluded.brand, image=excluded.image, concentration=excluded.concentration, size=excluded.size,
      reference_price=excluded.reference_price, gender=excluded.gender, family_ar=excluded.family_ar,
      family_en=excluded.family_en, notes_json=excluded.notes_json, accords_json=excluded.accords_json,
      performance_json=excluded.performance_json, seasons_json=excluded.seasons_json,
      occasions_json=excluded.occasions_json, status=excluded.status, updated_at=CURRENT_TIMESTAMP`).run(
      id, slug, clean(value.nameAr, 200), clean(value.nameEn, 200), clean(value.brand, 160), clean(value.image || "/assets/references/ombre-leather.svg", 1000),
      clean(value.concentration, 80), clean(value.size, 80), Math.max(0, Number(value.referencePrice || 0)),
      ["men", "women", "unisex"].includes(value.gender) ? value.gender : "unisex", clean(value.familyAr, 160), clean(value.familyEn, 160),
      JSON.stringify(safeNotes), JSON.stringify(array(value.accords)), JSON.stringify(value.performance || {}), JSON.stringify(array(value.seasons)),
      JSON.stringify(array(value.occasions)), value.status === "hidden" ? "hidden" : "active"
    );
    const productId = clean(input.link.productId, 160);
    const product = productFromRow(db.prepare("SELECT * FROM products WHERE id = ?").get(productId), true);
    const reference = referencePerfumeFromRow(db.prepare("SELECT * FROM reference_perfumes WHERE id = ?").get(id));
    if (!product) throw new Error("ALTERNATIVE_PRODUCT_NOT_FOUND");
    const calculated = calculateAlternativeScore(reference, product);
    const similarity = input.link.similarity === "" || input.link.similarity == null ? calculated.similarity : Math.min(100, Math.max(0, Number(input.link.similarity)));
    const confidence = input.link.confidence === "" || input.link.confidence == null ? calculated.confidence : Math.min(100, Math.max(0, Number(input.link.confidence)));
    const sharedAr = array(input.link.sharedNotesAr || calculated.shared);
    const sharedEn = array(input.link.sharedNotesEn || calculated.shared);
    db.prepare(`INSERT INTO alternative_matches
      (reference_id, product_id, similarity, confidence, reason_ar, reason_en, similarities_ar_json, similarities_en_json,
       differences_ar_json, differences_en_json, shared_notes_ar_json, shared_notes_en_json, comparison_json, sort_order, pinned, status, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(reference_id, product_id) DO UPDATE SET similarity=excluded.similarity, confidence=excluded.confidence,
      reason_ar=excluded.reason_ar, reason_en=excluded.reason_en, shared_notes_ar_json=excluded.shared_notes_ar_json,
      shared_notes_en_json=excluded.shared_notes_en_json, comparison_json=excluded.comparison_json,
      sort_order=excluded.sort_order, pinned=excluded.pinned, status=excluded.status, last_reviewed_at=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP`).run(
      id, productId, similarity, confidence, clean(input.link.reasonAr, 2000), clean(input.link.reasonEn, 2000), "[]", "[]", "[]", "[]",
      JSON.stringify(sharedAr), JSON.stringify(sharedEn), JSON.stringify(input.link.comparison || { longevity: 8, projection: 8 }),
      Number(input.link.sortOrder || 0), input.link.pinned ? 1 : 0, ["active", "hidden", "draft"].includes(input.link.status) ? input.link.status : "active"
    );
  }
  return alternativesAdminPayload();
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
  const email = normalizedEmail(process.env.ORIGO_ADMIN_EMAIL || "");
  const password = String(process.env.ORIGO_ADMIN_PASSWORD || "");
  if (!email || !password) return { status: "disabled", configured: false };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 10 || password.length > 200) {
    const error = new Error("INVALID_ADMIN_BOOTSTRAP_CONFIGURATION");
    error.code = "INVALID_ADMIN_BOOTSTRAP_CONFIGURATION";
    throw error;
  }
  const existing = findUserByEmail(email);
  if (existing) {
    const effectiveRole = existing.staff_role || existing.role;
    if (effectiveRole !== "admin" && effectiveRole !== "owner") setUserRole(existing.id, "admin");
    return { status: "existing", configured: true };
  }
  createUser({
    name: clean(process.env.ORIGO_ADMIN_NAME || "ORIGO Admin", 100),
    email,
    passwordHash: await hashPassword(password),
    role: "admin"
  });
  return { status: "created", configured: true };
}

export function adminConfiguredFromEnvironment() {
  const email = normalizedEmail(process.env.ORIGO_ADMIN_EMAIL || "");
  const passwordLoaded = Boolean(String(process.env.ORIGO_ADMIN_PASSWORD || ""));
  if (!email || !passwordLoaded) return false;
  const user = findUserByEmail(email);
  return Boolean(user && ["admin", "owner"].includes(user.staff_role || user.role));
}

export const databasePath = DB_PATH;
export const databaseDriver = "sql.js-wasm";
