import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { injectSeoIntoHtml, seoForRoute } from "../seo.mjs";

const payloads = ["<script>alert(1)</script>", '<img src=x onerror=alert(1)>'];

test("server-rendered SEO neutralizes script and event-handler payloads", () => {
  for (const payload of payloads) {
    const product = { id:"xss", slug:"xss", status:"published", nameAr:payload, nameEn:payload, brand:payload, price:1, images:[] };
    const html = injectSeoIntoHtml('<html><head><title>x</title></head><body></body></html>', seoForRoute("/perfume/xss", [product]));
    assert.doesNotMatch(html, /<script>alert\(1\)<\/script>|<img src=x onerror=/i);
    assert.match(html, /&lt;|\\u003c/);
  }
});

test("reviewed client templates escape external text before innerHTML sinks", async () => {
  const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
  for (const expression of ["localizedProductName(product)", "localizedProductBrand(product)", "state.catalogQuery", "error.message", "item.productName"]) {
    assert.match(app, new RegExp(`escapeHTML\\(${expression.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\)`));
  }
  assert.match(app, /function escapeHTML\(value = ""\)/);
  assert.match(app, /replace\(\/\[&<>"'\]\/g/);
});
