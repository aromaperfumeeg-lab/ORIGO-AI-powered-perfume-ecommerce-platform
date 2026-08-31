import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [html, app, css] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../app.js", import.meta.url), "utf8"),
  readFile(new URL("../appearance.css", import.meta.url), "utf8")
]);

test("cart is detached from the header action group and floats", () => {
  const headerActions = html.match(/<div class="header-commerce-actions">([\s\S]*?)<\/div>/)?.[1] || "";
  assert.doesNotMatch(headerActions, /cart-button/);
  assert.match(html, /class="cart-button floating-cart-button"/);
  assert.match(css, /\.floating-cart-button\.cart-button\{position:fixed!important/);
});

test("floating cart supports pointer dragging and persists its position", () => {
  assert.match(app, /function initializeFloatingCart\(\)/);
  assert.match(app, /origoFloatingCartPosition/);
  assert.match(app, /addEventListener\("pointermove"/);
  assert.match(app, /setPointerCapture/);
  assert.match(app, /suppressCartClick/);
});
