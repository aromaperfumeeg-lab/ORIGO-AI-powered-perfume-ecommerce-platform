import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { gzipSync } from "node:zlib";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("brand management counts aliases and keeps hidden defaults out of product choices", async () => {
  const source = await read("../app.js");
  const helpers = source.slice(source.indexOf("function brandIdentity("), source.indexOf("function brandsManagementMarkup("));
  const options = source.slice(source.indexOf("const PRODUCT_OPTION_DEFAULTS ="), source.indexOf("function smartSelectOptionMarkup("));
  const state = {
    catalogProducts: [{ brand:"Test House" }, { brand:"test-house" }, { brand:"other", brandAr:"دار الاختبار" }, { brand:"Other" }],
    productOptions: [{ group:"brand", slug:"test-house", nameEn:"Test House", nameAr:"دار الاختبار", active:false }]
  };
  const context = { state, ORIGO_PERFUME_BRANDS:["Test House", "Other"], window:{} };
  runInNewContext(`${options}\n${helpers}`, context);
  assert.equal(context.linkedBrandProducts(state.productOptions[0]).length, 3);
  assert.equal(context.productOptionItems("brand").some((item) => context.brandMatches(item, "Test House")), false);
  state.productOptions[0].active = true;
  assert.equal(context.productOptionItems("brand").filter((item) => context.brandMatches(item, "Test House")).length, 1);
  state.productOptions[0].active = false;
  state.productOptions[0].metadata = { deleted:true };
  assert.equal(context.productOptionItems("brand").some((item) => context.brandMatches(item, "Test House")), false);
});

test("product studio click passes through both asynchronous loaders exactly once", async () => {
  const listeners = [];
  const appended = [];
  let clicks = 0;
  let handled = 0;
  const target = {
    dataset: { action: "open-product-studio" },
    closest: () => target,
    getAttribute: () => null,
    click() {
      if (++clicks > 10) return; // Bound the broken replay loop so the test can fail.
      const event = { target, preventDefault() {}, stopImmediatePropagation() { this.stopped = true; } };
      for (const listener of listeners) {
        listener(event);
        if (event.stopped) return;
      }
      handled++;
    }
  };
  const append = (node) => { appended.push(node); queueMicrotask(() => node.onload?.()); };
  const context = {
    window: { dispatchEvent() {} },
    document: {
      scripts: [], readyState: "loading",
      createElement: () => ({}), querySelector: () => null, querySelectorAll: () => [],
      head: { append }, body: { append },
      addEventListener: (type, listener) => { if (type === "click") listeners.push(listener); }
    },
    location: { pathname: "/", href: "https://origo.test/" },
    navigator: {}, URL, Event, addEventListener() {}, setTimeout
  };
  runInNewContext(await read("../runtime-loader.js"), context);
  runInNewContext(await read("../deferred-modules.js"), context);
  target.click();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(handled, 1, "the editor action must run after both loaders finish");
  assert.ok(clicks <= 3, "loaders must not replay each other's clicks forever");
  assert.equal(appended.filter((node) => node.src?.includes("product-editor-runtime")).length, 1);
  target.click();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(handled, 2, "the same button remains usable");
});

test("home loads production storefront core without admin editor or finder runtimes", async () => {
  const [html, loader, core] = await Promise.all([read("../index.html"), read("../runtime-loader.js"), read("../chunks/storefront-core.min.js")]);
  assert.match(html, /chunks\/storefront-core\.min\.js\?v=25/);
  assert.match(html, /runtime-loader\.js\?v=15/);
  assert.doesNotMatch(html, /<script[^>]+(?:admin-runtime|product-editor-runtime|storefront-settings-runtime|fragrance-finder-(?:engine|i18n)|fragrance-finder\.js)/);
  assert.doesNotMatch(core, /function settingsMarkup\(|function renderImportReview\(|function overviewMarkup\(/);
  assert.match(core, /function homeHeroTargetHref\(/);
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
