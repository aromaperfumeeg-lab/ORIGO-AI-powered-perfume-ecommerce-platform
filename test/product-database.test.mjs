import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { openPortableDatabase } from "../portable-database.mjs";

test("database migrates old users and structured notes override stale flat notes", async () => {
  const directory = await mkdtemp(join(tmpdir(), "origo-product-db-"));
  const path = join(directory, "store.sqlite");
  const previousPath = process.env.ORIGO_DB_PATH;
  try {
    const legacy = await openPortableDatabase(path);
    legacy.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        phone TEXT NOT NULL DEFAULT '',
        role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    legacy.close();

    process.env.ORIGO_DB_PATH = path;
    const database = await import(`../db.mjs?test=${Date.now()}`);
    const first = database.upsertProduct({
      id: "notes-regression",
      nameAr: "اختبار النوتات",
      nameEn: "Notes Regression",
      brand: "ORIGO",
      price: 100,
      status: "published",
      notesAr: ["قديم"],
      notesEn: ["Old"],
      notes: {
        topAr: ["ورد"], topEn: ["Rose"],
        heartAr: ["ياسمين"], heartEn: ["Jasmine"],
        baseAr: ["عود"], baseEn: ["Oud"]
      }
    });
    assert.deepEqual(first.notesEn, ["Rose", "Jasmine", "Oud"]);
    assert.deepEqual(first.notes.topEn, ["Rose"]);

    const updated = database.upsertProduct({
      ...first,
      notesAr: ["بيانات قديمة يجب تجاهلها"],
      notesEn: ["Stale data must be ignored"],
      notes: {
        topAr: ["برغموت"], topEn: ["Bergamot"],
        heartAr: ["سوسن"], heartEn: ["Iris"],
        baseAr: ["مسك"], baseEn: ["Musk"]
      }
    });
    assert.deepEqual(updated.notesAr, ["برغموت", "سوسن", "مسك"]);
    assert.deepEqual(updated.notesEn, ["Bergamot", "Iris", "Musk"]);
    assert.deepEqual(updated.noteRefs.map((note) => note.id), ["bergamot", "iris", "musk"]);
    assert.deepEqual(updated.noteRefs.map((note) => note.position), ["top", "heart", "base"]);
    assert.equal(updated.filters.brand, "ORIGO");
    assert.deepEqual(updated.filters.notes, ["Bergamot", "Iris", "Musk"]);

    const customFilter = database.upsertFilterDefinition({
      category: "perfume",
      key: "mood",
      labelAr: "المزاج",
      labelEn: "Mood",
      inputType: "multiselect",
      options: ["Calm", "Bold"]
    });
    assert.equal(customFilter.key, "mood");
    assert.equal(database.listFilterDefinitions("perfume").some((filter) => filter.key === "mood"), true);
    assert.equal(database.deleteFilterDefinition(customFilter.id), true);

    const staff = database.createUser({
      name: "Product Manager",
      email: "products@example.test",
      passwordHash: "test-only",
      role: "product_manager"
    });
    assert.equal(staff.role, "product_manager");
    assert.deepEqual(staff.permissions, ["catalog", "inventory"]);
    assert.equal(database.deleteProduct(updated.id), true);
    assert.equal(database.listProducts({ includeHidden: true }).some((product) => product.id === updated.id), false);
    database.db.close();
  } finally {
    if (previousPath == null) delete process.env.ORIGO_DB_PATH;
    else process.env.ORIGO_DB_PATH = previousPath;
    await rm(directory, { recursive: true, force: true });
  }
});
