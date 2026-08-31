import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const css = await readFile(new URL("../appearance.css", import.meta.url), "utf8");

test("admin products use a brand-first directory", () => {
  assert.match(app, /admin-product-brand-grid/);
  assert.match(app, /data-action="admin-open-brand-products"/);
  assert.match(app, /data-action="admin-products-brand-back"/);
  assert.match(app, /data-action="add-product-for-brand"/);
});

test("new product inherits the selected brand", () => {
  assert.match(app, /function startManualProduct\(restore = false, brandValue = ""\)/);
  assert.match(app, /startManualProduct\(false, brand\)/);
  assert.match(app, /product\.brandAr = option\?\.nameAr/);
  assert.match(app, /product\.brandEn = option\?\.nameEn/);
});

test("brand directory adapts to narrow screens", () => {
  assert.match(css, /\.admin-product-brand-grid\{display:grid/);
  assert.match(css, /@media\(max-width:640px\).*\.admin-product-brand-grid\{grid-template-columns:1fr/s);
});
