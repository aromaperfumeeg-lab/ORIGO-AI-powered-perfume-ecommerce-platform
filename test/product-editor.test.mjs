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
  assert.match(app, /<select name="size">/);
  assert.doesNotMatch(app, /name="sizes" value=/);
  assert.match(app, /name="mainIngredients"/);
  assert.match(app, /name="accordSelected"/);
  assert.match(app, /name="accordStrength\./);
  assert.match(app, /product\.accordProfile/);
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
