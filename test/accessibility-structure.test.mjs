import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");

test("document language direction, labelled navigation and unique static ids are preserved", () => {
  assert.match(html, /<html lang="ar" dir="rtl"/);
  assert.match(html, /<main id="storefront-main">/);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids.filter((id, index) => ids.indexOf(id) !== index), []);
  assert.doesNotMatch(html, /<(?:button|a)[^>]*>\s*<\/\1>/);
});

test("modals expose dialog semantics and product links avoid nested interactive controls", () => {
  assert.match(html, /id="product-overlay"[^>]+aria-hidden="true"/);
  assert.match(app, /<a class="product-card-media-link"/);
  const card = app.slice(app.indexOf("function productCardMarkup"), app.indexOf("function setCardImage"));
  assert.match(card, /product-card-top-actions[\s\S]+<\/div>\s*<a class="product-card-media-link"/);
  assert.match(card, /product-image-missing[\s\S]+<\/span>`\}<\/a>/);
});
