import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [app, loader, css] = await Promise.all([
  readFile(new URL("../app.js", import.meta.url), "utf8"),
  readFile(new URL("../runtime-loader.js", import.meta.url), "utf8"),
  readFile(new URL("../appearance.css", import.meta.url), "utf8")
]);

test("product studio opens with brands instead of an unassigned product draft", () => {
  assert.match(app, /function renderProductStudioBrandDirectory\(\)/);
  assert.match(app, /data-action="studio-open-brand-products"/);
  assert.match(app, /data-action="studio-add-brand-product"/);
  assert.match(app, /if \(action === "open-product-studio"\)[\s\S]*?renderProductStudioBrandDirectory\(\)/);
  assert.doesNotMatch(app.match(/if \(action === "open-product-studio"\)[\s\S]*?\n  \}/)?.[0] || "", /startManualProduct\(\)/);
});

test("studio brand add preselects the brand and runtime cache is bumped", () => {
  assert.match(app, /studio-add-brand-product"\) startManualProduct\(false, actionElement\.dataset\.brand/);
  assert.match(loader, /admin-runtime\.min\.js\?v=11/);
  assert.match(loader, /product-editor-runtime\.min\.js\?v=6/);
  assert.match(css, /\.studio-brand-product-grid\{display:grid/);
});
