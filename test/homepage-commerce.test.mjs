import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");

test("homepage exposes the requested commerce hierarchy without duplicate benefit strips", async () => {
  const [html, app, css] = await Promise.all([read("index.html"), read("app.js"), read("home.css")]);
  assert.match(html, /id="header-brands-dropdown"/);
  assert.match(html, /id="header-categories-dropdown"/);
  assert.match(html, /id="home-brand-carousel-track"/);
  assert.match(html, /id="new-product-grid"/);
  assert.match(html, /id="best-sellers"/);
  assert.match(html, /id="home-brand-showcases"/);
  assert.equal((html.match(/class="home-benefits horizontal-rail"/g) || []).length, 1);
  ["منتجات أصلية 100%", "شحن سريع", "استرجاع واستبدال سهل", "أسعار منافسة", "دفع عند الاستلام", "تغليف فاخر", "دعم العملاء 24\/7"].forEach((label) => assert.match(html, new RegExp(label)));
  assert.match(app, /const ORIGO_PERFUME_BRANDS = \[/);
  assert.match(app, /"Lattafa"/);
  assert.match(app, /"الرونق للعطور"/);
  assert.match(app, /function renderHomepageCommerce\(\)/);
  assert.match(app, /placement === "brand-banner"/);
  assert.match(app, /placement === "hero"/);
  assert.match(css, /grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
});
