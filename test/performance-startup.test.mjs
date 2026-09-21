import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");

test("homepage startup leaves fragrance knowledge interaction-driven", async () => {
  const source = await read("deferred-modules.js");
  const listeners = new Map();
  const appended = [];
  const knowledge = [{ dataset:{ knowledgeSrc:"fragrance-knowledge.js" } }, { dataset:{ knowledgeSrc:"fragrance-notes-library.js" } }];
  const document = {
    scripts:[], readyState:"loading", head:{ append(){} },
    body:{ append(node){ appended.push(node.src); queueMicrotask(() => node.onload?.()); } },
    createElement(){ return { dataset:{} }; },
    querySelectorAll(selector){ return selector === "script[data-knowledge-src]" ? knowledge : []; },
    addEventListener(name, handler){ listeners.set(name, handler); }
  };
  const context = {
    document, location:{ pathname:"/", href:"https://origoscents.com/" },
    navigator:{ connection:{} }, sessionStorage:{ getItem(){ return null; }, setItem(){} },
    window:{ dispatchEvent(){}, addEventListener(){} }, Event:class {}, URL, Promise,
    setTimeout(){ return 1; }, requestIdleCallback(){ return 1; }, addEventListener(){}, queueMicrotask
  };
  vm.runInNewContext(source, context);
  assert.deepEqual(appended, []);
  const target = { dataset:{ action:"open-note" }, getAttribute(){ return "/notes/rose"; }, closest(){ return this; } };
  listeners.get("pointerover")({ target });
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(appended, ["fragrance-knowledge.js", "fragrance-notes-library.js"]);
});

test("critical storefront geometry stays stable during hydration", async () => {
  const [app, html] = await Promise.all([read("app.js"), read("index.html")]);
  const brands = app.slice(app.indexOf("function renderBrandCarousel("), app.indexOf("function storefrontBrandEntries("));
  const rows = app.slice(app.indexOf("function renderConfiguredHomeProductRows("), app.indexOf("function renderHomepageCommerce("));
  assert.doesNotMatch(brands, /track\.innerHTML = ""/);
  assert.match(rows, /if \(!holder\.children\?\.length\)/);
  assert.match(html, /data-idle-src="home-brand-navigation\.js\?v=8"/);

  const functionSource = app.slice(app.indexOf("function renderConfiguredHomeProductRows("), app.indexOf("function renderHomepageCommerce("));
  const holder = { children:[{}], innerHTML:"SSR", setAttribute(name, value){ this[name] = value; }, removeAttribute(){} };
  vm.runInNewContext(`${functionSource}; renderConfiguredHomeProductRows();`, {
    state:{ storefrontReady:false, lang:"ar" }, $(){ return holder; }, sectionLoadingMarkup(){ return "LOADING"; }
  });
  assert.equal(holder.innerHTML, "SSR");
  assert.equal(holder["aria-busy"], "true");
});

test("only the PDP LCP image is high priority and carousel autoplay waits for interaction", async () => {
  const app = await read("app.js");
  const hero = app.slice(app.indexOf("function renderHomeHero("), app.indexOf("homeHeroMobileQuery.addEventListener"));
  assert.match(hero, /addEventListener\("pointerdown", armAutoplay/);
  assert.doesNotMatch(hero, /setTimeout\(beginAutoplay/);
  assert.match(app, /width="800" height="900" loading="eager" fetchpriority="high" decoding="async"/);
  const cards = app.slice(app.indexOf("function productCardMarkup("), app.indexOf("function setCardImage("));
  assert.doesNotMatch(cards, /fetchpriority="high"/);
  assert.match(app, /width="640" height="700" loading="\$\{options\.eager \? "eager" : "lazy"\}"/);
});

test("high-frequency observers and scroll work are frame-batched", async () => {
  const app = await read("app.js");
  assert.match(app, /const pendingLatinDigitRoots = new Set\(\)/);
  assert.match(app, /latinDigitFrame = requestAnimationFrame/);
  assert.match(app, /const requestBackToTopUpdate = \(\) =>/);
});

test("closing an overlay restores focus before making the surface inert", async () => {
  const app = await read("app.js");
  const source = app.slice(app.indexOf("function closeOverlay("), app.indexOf("function toggleDrawer("));
  const operations = [];
  const returnTarget = { isConnected:true, focus(){ operations.push("focus"); } };
  const overlay = {
    classList:{ remove(){ operations.push("remove-open"); } },
    set inert(value){ operations.push(`inert-${value}`); },
    setAttribute(name, value){ operations.push(`${name}-${value}`); },
    contains(){ return false; }
  };
  vm.runInNewContext(`${source}; dialogReturnFocus.set(overlay, returnTarget); closeOverlay(overlay);`, {
    overlay, returnTarget, dialogReturnFocus:new WeakMap(), document:{ activeElement:null }, syncBodyLock(){ operations.push("body-lock"); }
  });
  assert.ok(operations.indexOf("focus") < operations.indexOf("inert-true"));
  assert.ok(operations.includes("aria-hidden-true"));
});

test("service worker bypasses navigation and API while versioned assets use the static cache", async () => {
  const source = await read("sw.js");
  const handlers = new Map();
  const context = {
    self:{ addEventListener(name, handler){ handlers.set(name, handler); }, skipWaiting(){}, clients:{ claim(){} } },
    caches:{ open:async () => ({ addAll:async () => {}, put:async () => {} }), keys:async () => [], match:async () => null },
    fetch:async () => ({ ok:true, clone(){ return this; } }), location:{ origin:"https://origoscents.com" }, URL, Promise
  };
  vm.runInNewContext(source, context);
  for (const request of [
    { method:"GET", url:"https://origoscents.com/", mode:"navigate", destination:"document" },
    { method:"GET", url:"https://origoscents.com/api/products", mode:"cors", destination:"" }
  ]) {
    let intercepted = false;
    handlers.get("fetch")({ request, respondWith(){ intercepted = true; } });
    assert.equal(intercepted, false);
  }
  let intercepted = false;
  handlers.get("fetch")({ request:{ method:"GET", url:"https://origoscents.com/app.min.js?v=219", mode:"cors", destination:"script" }, respondWith(){ intercepted = true; } });
  assert.equal(intercepted, true);
});
