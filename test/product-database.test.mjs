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

    const noteImage = "data:image/webp;base64,dGVzdA==";
    const savedNote = database.upsertProductOption({
      group: "note", slug: "egyptian-jasmine", nameAr: "ياسمين مصري", nameEn: "Egyptian Jasmine",
      image: noteImage,
      metadata: { descriptionAr: "زهري ناعم", descriptionEn: "Soft floral", familyId: "floral", position: "heart" }
    });
    assert.equal(savedNote.image, noteImage);
    assert.equal(savedNote.metadata.descriptionEn, "Soft floral");
    assert.equal(database.upsertProductOption({ ...savedNote, nameEn: "Egyptian Jasmine Absolute" }).id, savedNote.id);
    assert.equal(database.listProductOptions("note", true).filter((item) => item.slug === "egyptian-jasmine").length, 1);
    const noteState = database.saveFragranceNotesState({ notes: [{ slug: savedNote.slug, nameAr: savedNote.nameAr, nameEn: savedNote.nameEn, image: noteImage }] });
    assert.equal(noteState.notes[0].image, noteImage);

    const staff = database.createUser({
      name: "Product Manager",
      email: "products@example.test",
      passwordHash: "test-only",
      role: "product_manager"
    });
    assert.equal(staff.role, "product_manager");
    assert.deepEqual(staff.permissions, ["catalog", "inventory"]);
    database.db.prepare("UPDATE users SET staff_role = ? WHERE id = ?").run(" Admin ", staff.id);
    const normalizedAdmin = database.findUserById(staff.id);
    assert.equal(normalizedAdmin.role, "admin");
    assert.deepEqual(normalizedAdmin.permissions, ["*"]);
    const keywordsAr = Array.from({ length: 90 }, (_, index) => `كلمة محفوظة ${index + 1}`);
    const keywordsEn = Array.from({ length: 95 }, (_, index) => `Saved keyword ${index + 1}`);
    const seoProduct = database.upsertProduct({ id:"seo-keywords-roundtrip", nameAr:"اختبار SEO", nameEn:"SEO test", brand:"ORIGO", price:1, seo:{ keywordsAr, keywordsEn, keywords:[...keywordsAr, ...keywordsEn] } });
    const reloadedSeoProduct = database.listProducts({ includeHidden:true }).find((product) => product.id === seoProduct.id);
    assert.deepEqual(reloadedSeoProduct.seo.keywordsAr, keywordsAr);
    assert.deepEqual(reloadedSeoProduct.seo.keywordsEn, keywordsEn);
    const relationshipProduct = database.upsertProduct({ id:"relationship-roundtrip", nameAr:"علاقات", nameEn:"Relationships", brand:"ORIGO", price:1, status:"published", inspiration:{ inspiredBy:[{ nameAr:"مرجع",nameEn:"Reference",brandAr:"علامة",brandEn:"Brand",slug:"reference",similarityPercentage:null,relationshipAr:"مستوحى منه",relationshipEn:"Inspired by",reasonAr:"سبب",reasonEn:"Reason",sourceName:"Source",sourceUrl:"https://example.test" }] }, similarFragrances:[{ nameAr:"مشابه",nameEn:"Similar",brandAr:"علامة",brandEn:"Brand",slug:"",similarityPercentage:82,reasonAr:"تقارب",reasonEn:"Similar profile",sourceName:"",sourceUrl:"" }] });
    const reloadedRelationshipProduct = database.listProducts({ includeHidden:true }).find((product) => product.id === relationshipProduct.id);
    assert.deepEqual(reloadedRelationshipProduct.inspiration, relationshipProduct.inspiration);
    assert.deepEqual(reloadedRelationshipProduct.similarFragrances, relationshipProduct.similarFragrances);
    assert.equal(reloadedRelationshipProduct.status,"published");
    const publicSummary = database.listProducts({ summary:true }).find((product) => product.id === relationshipProduct.id);
    assert.equal(publicSummary.detailLoaded, false);
    assert.equal(publicSummary.noteLibrary, undefined);
    assert.equal(publicSummary.noteRefs.every((note) => note.image === undefined), true);
    const publicDetails = database.getPublishedProduct(relationshipProduct.id);
    assert.equal(publicDetails.detailLoaded, true);
    assert.equal(publicDetails.id, relationshipProduct.id);
    assert.equal(database.getPublishedProduct("missing-product"), null);
    const oversizedNoteImage = `data:image/webp;base64,${"A".repeat(200_000)}`;
    const payloadProduct = database.upsertProduct({
      id:"public-summary-payload", nameAr:"حمولة عامة", nameEn:"Public payload", brand:"ORIGO",
      price:1, status:"published", notes:{ topAr:["ورد"], topEn:["Rose"] },
      noteLibrary:{ refs:[{ id:"rose", nameAr:"ورد", nameEn:"Rose", position:"top", image:oversizedNoteImage }] }
    });
    const fullPayloadProduct = database.getPublishedProduct(payloadProduct.id);
    const summaryPayloadProduct = database.listProducts({ summary:true }).find((product) => product.id === payloadProduct.id);
    assert.equal(JSON.stringify(fullPayloadProduct).length - JSON.stringify(summaryPayloadProduct).length > 300_000, true);
    assert.equal(summaryPayloadProduct.noteRefs[0].image, undefined);
    assert.equal(database.deleteProduct(payloadProduct.id), true);
    assert.equal(database.deleteProduct(updated.id), true);
    assert.equal(database.listProducts({ includeHidden: true }).some((product) => product.id === updated.id), false);
    const brand = database.upsertProductOption({ group:"brand", nameAr:"دار الاختبار", nameEn:"Test House", slug:"test-house" });
    const linkedBrandProduct = database.upsertProduct({ id:"brand-delete-guard", nameAr:"عطر اختبار", nameEn:"Brand guard", brand:"Test House", price:10, status:"draft" });
    assert.throws(() => database.deleteProductOption(brand.id), /علامة مرتبطة بمنتجات/);
    const hiddenBrand = database.upsertProductOption({ ...brand, active:false });
    assert.equal(hiddenBrand.active, false);
    assert.equal(database.listProductOptions("brand", false).some((item) => item.id === brand.id), false);
    assert.equal(database.listProducts({ includeHidden:true }).find((item) => item.id === linkedBrandProduct.id).brand, "Test House");
    database.deleteProduct(linkedBrandProduct.id);
    const productsBeforeBrandDelete = database.listProducts({ includeHidden:true });
    assert.equal(database.deleteProductOption(brand.id), true);
    assert.deepEqual(database.listProducts({ includeHidden:true }), productsBeforeBrandDelete);
    const deletedBrand = database.listProductOptions("brand", true).find((item) => item.id === brand.id);
    assert.equal(deletedBrand.active, false);
    assert.equal(deletedBrand.metadata.deleted, true);
    assert.equal(database.listProductOptions("brand").some((item) => item.id === brand.id), false);
    database.db.close();
  } finally {
    if (previousPath == null) delete process.env.ORIGO_DB_PATH;
    else process.env.ORIGO_DB_PATH = previousPath;
    await rm(directory, { recursive: true, force: true });
  }
});
