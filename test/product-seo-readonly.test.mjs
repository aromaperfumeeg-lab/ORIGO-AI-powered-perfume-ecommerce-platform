import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const app=await readFile(new URL("../app.js",import.meta.url),"utf8");
const server=await readFile(new URL("../server.mjs",import.meta.url),"utf8");

test("product SEO is derived as read-only rendering data",()=>{const start=app.indexOf("function buildProductSeo");const end=app.indexOf("function productStructuredData",start);const implementation=app.slice(start,end);assert.match(implementation,/const manual = product\.seo \|\| \{\}/);assert.match(implementation,/Object\.freeze/);assert.doesNotMatch(implementation,/product\.[\w.]+\s*=/)});

test("canonical bundle products bypass server-side enrichment",()=>{const start=server.indexOf("function preparePerfumeProduct");const end=server.indexOf("function allowPerformanceRequest",start);const implementation=server.slice(start,end);assert.match(implementation,/if \(product\.perfumeBundle && typeof product\.perfumeBundle === "object"\) return product/);assert.ok(implementation.indexOf("return product;")<implementation.indexOf("analyzePerfume"))});
