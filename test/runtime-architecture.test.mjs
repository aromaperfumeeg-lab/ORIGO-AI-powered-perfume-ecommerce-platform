import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { gzipSync } from "node:zlib";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("home loads production storefront core without admin editor or finder runtimes", async () => {
  const [html, loader, core] = await Promise.all([read("../index.html"), read("../runtime-loader.js"), read("../chunks/storefront-core.min.js")]);
  assert.match(html, /chunks\/storefront-core\.min\.js\?v=12/);
  assert.match(html, /runtime-loader\.js\?v=8/);
  assert.doesNotMatch(html, /<script[^>]+(?:admin-runtime|product-editor-runtime|storefront-settings-runtime|fragrance-finder-(?:engine|i18n)|fragrance-finder\.js)/);
  assert.doesNotMatch(core, /function settingsMarkup\(|function renderImportReview\(|function overviewMarkup\(/);
  assert.match(loader, /const promises = new Map\(\)/);
  assert.match(loader, /finder:\["fragrance-finder-engine\.js/);
});

test("runtime chunks and their CSS exist and Hostinger copies the chunks tree", async () => {
  const deploy = await read("../scripts/build-deploy.mjs");
  for (const path of [
    "../chunks/storefront-core.min.js", "../chunks/admin-runtime.min.js", "../chunks/product-editor-runtime.min.js",
    "../chunks/storefront-settings-runtime.min.js", "../product-editor-runtime.css", "../storefront-settings-runtime.css"
  ]) assert.equal((await stat(new URL(path, import.meta.url))).isFile(), true, path);
  assert.match(deploy, /copyTree\("chunks"\)/);
  assert.match(deploy, /copyTree\("lib"\)/);
  assert.match(deploy, /"storefront-media\.mjs"/);
  for (const moduleName of ["seo.mjs", "commerce-service.mjs", "performance-service.mjs"]) {
    assert.match(deploy, new RegExp(`"${moduleName.replace(".", "\\.")}"`));
  }
});

test("product cards use valid semantic links and finder never emits an empty image source", async () => {
  const [app, finder, html] = await Promise.all([read("../app.js"), read("../fragrance-finder.js"), read("../index.html")]);
  const card = app.slice(app.indexOf("function productCardMarkup"), app.indexOf("function setCardImage"));
  assert.match(card, /<a class="product-card-media-link" href="\/perfume\//);
  assert.match(card, /exact-card-product-name[\s\S]+<a href="\/perfume\//);
  assert.doesNotMatch(card, /<button[^>]+product-card-media-link/);
  assert.match(finder, /p\.image\|\|"assets\/product-image-placeholder\.svg"/);
  assert.doesNotMatch(finder, /<img src="\$\{esc\(p\.image\)\}"/);
  assert.doesNotMatch(`${html}\n${app}\n${finder}`, /<img[^>]+src=["']\s*["']/i);
  assert.match(html, /product-image-lightbox-image" src="assets\/product-image-placeholder\.svg"/);
});

test("service worker cache manifest matches every versioned initial runtime asset", async () => {
  const [html, worker] = await Promise.all([read("../index.html"), read("../sw.js")]);
  const initial = [...html.matchAll(/(?:src|href)="((?:runtime-loader|chunks\/)[^"]+\?v=\d+)"/g)].map((match) => match[1]);
  for (const asset of initial) assert.match(worker, new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(worker, /origo-static-v\d+/);
  assert.doesNotMatch(html, /<script(?:\s[^>]*)?>\s*(?!<\/script>)/);
});

test("initial asset budgets keep admin and finder out of storefront", async () => {
  const html = await read("../index.html");
  const initialScripts = [...html.matchAll(/<script defer src="([^"]+)"/g)].map((match) => match[1].split("?")[0]);
  const initialStyles = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((match) => match[1].split("?")[0]);
  const bytes = async (paths) => (await Promise.all(paths.map((path) => stat(new URL(`../${path}`, import.meta.url))))).reduce((sum, item) => sum + item.size, 0);
  const gzipBytes = async (paths) => (await Promise.all(paths.map((path) => readFile(new URL(`../${path}`, import.meta.url))))).reduce((sum, item) => sum + gzipSync(item).length, 0);
  assert.ok(await bytes(initialScripts) < 550_000, "initial JS raw budget");
  assert.ok(await bytes(initialStyles) < 660 * 1024, "initial CSS raw budget");
  assert.ok(await gzipBytes(initialScripts) < 160 * 1024, "initial JS gzip budget");
  assert.ok(await gzipBytes(initialStyles) < 130 * 1024, "initial CSS gzip budget");
  assert.equal(initialScripts.some((path) => /admin|product-editor|storefront-settings|fragrance-finder/.test(path)), false);
});
