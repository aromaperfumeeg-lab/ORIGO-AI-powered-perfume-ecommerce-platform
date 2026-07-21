import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);

test("product editor separates workflows and fragrance data without free-form multi-size input", async () => {
  const app = await readFile(new URL("app.js", root), "utf8");
  assert.match(app, /إضافة سريعة/);
  assert.match(app, /إضافة ذكية/);
  assert.match(app, /إضافة متقدمة/);
  assert.match(app, /name="workflowAction" value="draft"/);
  assert.match(app, /name="workflowAction" value="review"/);
  assert.match(app, /name="workflowAction" value="published"/);
  assert.match(app, /name:"size", group:"size"/);
  assert.match(app, /function searchableCreatableSelect/);
  assert.match(app, /data-smart-search/);
  assert.doesNotMatch(app, /name="sizes" value=/);
  assert.match(app, /name:"mainIngredients", group:"note"/);
  assert.match(app, /name="accordSelected"/);
  assert.match(app, /name="accordStrength\./);
  assert.match(app, /product\.accordProfile/);
});

test("product options are bilingual database records and the editor persists newly created options", async () => {
  const app = await readFile(new URL("app.js", root), "utf8");
  const db = await readFile(new URL("db.mjs", root), "utf8");
  const server = await readFile(new URL("server.mjs", root), "utf8");
  assert.match(db, /CREATE TABLE IF NOT EXISTS product_options/);
  assert.match(db, /name_ar TEXT NOT NULL/);
  assert.match(db, /name_en TEXT NOT NULL/);
  assert.match(db, /UNIQUE \(option_group, slug\)/);
  assert.match(server, /\/api\/admin\/product-options/);
  assert.match(app, /smart-select-create/);
  assert.match(app, /save-product-option/);
  assert.match(app, /api\("\/api\/admin\/product-options"/);
});

test("notes and brands support bilingual editing and persisted artwork from the product editor", async () => {
  const app = await readFile(new URL("app.js", root), "utf8");
  const db = await readFile(new URL("db.mjs", root), "utf8");
  assert.match(app, /إضافة أو تعديل نوتة عطرية/);
  assert.match(app, /name="descriptionAr"/);
  assert.match(app, /name="descriptionEn"/);
  assert.match(app, /data-product-option-image-upload/);
  assert.match(app, /window\.ORIGOFragranceNotes\.upsertNote/);
  assert.match(app, /await persistNotesState\(\)/);
  assert.match(app, /شعار العلامة التجارية/);
  assert.match(app, /option\?\.image \? `<img/);
  assert.match(db, /metadata_json/);
  assert.match(db, /20_000_000/);
});

test("product page places fingerprint beside the gallery and keeps ingredients separate", async () => {
  const app = await readFile(new URL("app.js", root), "utf8");
  const css = await readFile(new URL("product-detail.css", root), "utf8");
  assert.match(app, /productHeroProfileMarkup\(product\)/);
  assert.match(app, /productIngredientsMarkup\(product\)/);
  assert.match(css, /grid-template-areas:"gallery profile purchase"/);
  assert.match(css, /\.pdp-main-ingredients/);
});

test("fragrance insights use bilingual uploaded artwork without customer voting UI", async () => {
  const app = await readFile(new URL("app.js", root), "utf8");
  const db = await readFile(new URL("db.mjs", root), "utf8");
  assert.match(app, /name="profileImage\.\$\{key\}\.\$\{language\}"/);
  assert.match(app, /data-profile-image-language="\$\{language\}"/);
  assert.match(app, /productPerformanceImagesMarkup\(product\)/);
  assert.match(app, /productProfileImage\(product, key\)/);
  assert.doesNotMatch(app, /window\.ORIGOPerformance\?\.hydrate\(product\.id\)/);
  assert.doesNotMatch(app, /<section class="pdp-community">/);
  assert.doesNotMatch(app, /<div class="pdp-rating">/);
  assert.doesNotMatch(app, /class="product-rating(?:\s|\")/);
  assert.match(db, /profileImages: metadata\.profileImages/);
});

test("database validates review status, SKU and barcode uniqueness", async () => {
  const db = await readFile(new URL("db.mjs", root), "utf8");
  assert.match(db, /\["draft", "review", "published", "unavailable"\]/);
  assert.match(db, /SKU مستخدم بالفعل/);
  assert.match(db, /الباركود مستخدم بالفعل/);
});
