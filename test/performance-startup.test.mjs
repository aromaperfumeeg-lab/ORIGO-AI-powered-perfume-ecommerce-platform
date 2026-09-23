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
  const [app, html, serviceWorker] = await Promise.all([read("app.js"), read("index.html"), read("sw.js")]);
  const brands = app.slice(app.indexOf("function renderBrandCarousel("), app.indexOf("function storefrontBrandEntries("));
  const rows = app.slice(app.indexOf("function renderConfiguredHomeProductRows("), app.indexOf("function renderHomepageCommerce("));
  assert.doesNotMatch(brands, /track\.innerHTML = ""/);
  assert.match(rows, /if \(!holder\.children\?\.length\)/);
  const brandRuntime = html.match(/data-idle-src="(home-brand-navigation\.js\?v=\d+)"/)?.[1];
  assert.ok(brandRuntime, "the home brand runtime is versioned in HTML");
  assert.ok(serviceWorker.includes(`/${brandRuntime}`), "HTML and the service worker cache the same brand runtime version");

  const functionSource = app.slice(app.indexOf("function renderConfiguredHomeProductRows("), app.indexOf("function renderHomepageCommerce("));
  const holder = { children:[{}], innerHTML:"SSR", setAttribute(name, value){ this[name] = value; }, removeAttribute(){} };
  vm.runInNewContext(`${functionSource}; renderConfiguredHomeProductRows();`, {
    state:{ storefrontReady:false, lang:"ar" }, $(){ return holder; }, sectionLoadingMarkup(){ return "LOADING"; }
  });
  assert.equal(holder.innerHTML, "SSR");
  assert.equal(holder["aria-busy"], "true");
});

test("only the PDP LCP image is high priority and hero autoplay starts after a stable first paint", async () => {
  const app = await read("app.js");
  const hero = app.slice(app.indexOf("function renderHomeHero("), app.indexOf("homeHeroMobileQuery.addEventListener"));
  assert.match(hero, /scheduleNext\(20000\)/);
  assert.match(hero, /image\.fetchPriority = "low"/);
  assert.doesNotMatch(hero, /setInterval/);
  assert.match(app, /width="800" height="900" loading="eager" fetchpriority="high" decoding="async"/);
  const cards = app.slice(app.indexOf("function productCardMarkup("), app.indexOf("function setCardImage("));
  assert.doesNotMatch(cards, /fetchpriority="high"/);
  assert.match(app, /width="640" height="700" loading="\$\{options\.eager \? "eager" : "lazy"\}"/);
});

test("the homepage LCP hero is a stable eager SSR image and hydrated rails reserve space", async () => {
  const [app, html, server, css] = await Promise.all([read("app.js"), read("index.html"), read("server.mjs"), read("home.css")]);
  assert.match(html, /class="home-hero-image" width="1600" height="900" loading="eager" decoding="async" ORIGO_INITIAL_HERO_IMAGE/);
  assert.doesNotMatch(html, /ORIGO_INITIAL_HERO_STYLE/);
  assert.match(server, /fetchpriority=\\\"high\\\"/);
  assert.match(server, /media=\"\(max-width:900px\)\"/);
  assert.match(css, /#home \.home-hero-picture,#home \.home-hero-image/);
  assert.match(css, /#home #home-brand-carousel-track\{min-height:/);
  assert.match(css, /#home #home-benefits-track\{min-height:126px\}/);
  assert.match(css, /#home #home-configured-product-rows\[data-ssr-home-products\]\{min-height:620px\}/);
  assert.match(css, /#home #home-configured-product-rows\[data-ssr-home-products\]\{min-height:693px\}/);
  assert.match(css, /#home \.home-gender-section\{[\s\S]*content-visibility:visible;[\s\S]*contain:none;/);
  const brands = app.slice(app.indexOf("function renderBrandCarousel("), app.indexOf("function storefrontBrandEntries("));
  assert.match(brands, /width=\"96\" height=\"96\" loading=\"lazy\" decoding=\"async\"/);
});

test("high-frequency observers and scroll work are frame-batched", async () => {
  const [app, brands] = await Promise.all([read("app.js"), read("home-brand-navigation.js")]);
  assert.match(app, /const pendingLatinDigitRoots = new Set\(\)/);
  assert.match(app, /latinDigitFrame = requestAnimationFrame/);
  assert.match(app, /const requestBackToTopUpdate = \(\) =>/);
  assert.match(brands, /translate3d/);
  assert.match(brands, /IntersectionObserver/);
  assert.doesNotMatch(brands, /scrollLeft\s*=/);
  assert.doesNotMatch(brands, /\.append\(|\.prepend\(/);
  assert.match(brands, /requestAnimationFrame\(applyDrag\)/);
  assert.match(brands, /releasePointerCapture/);
  assert.match(brands, /controllers\.get\(track\)\?\.destroy\(\)/);
  const hero = app.slice(app.indexOf("function renderHomeHero("), app.indexOf("homeHeroMobileQuery.addEventListener"));
  assert.match(hero, /requestAnimationFrame\(paintDrag\)/);
  assert.match(hero, /lostpointercapture/);
  assert.match(hero, /Math\.abs\(deltaY\) >= Math\.abs\(deltaX\) \* 1\.15/);
  const marquee = app.slice(app.indexOf("function bindBrandMarquee("), app.indexOf("function bindHorizontalRail("));
  assert.match(marquee, /requestAnimationFrame\(paintBrandDrag\)/);
  assert.doesNotMatch(marquee, /scrollLeft\s*[+=]/);
  assert.doesNotMatch(marquee, /getComputedStyle/);
  const rail = app.slice(app.indexOf("function bindHorizontalRail("), app.indexOf("initializeFloatingCart\(\)"));
  assert.match(rail, /requestAnimationFrame/);
});

test("drag surfaces batch transform work and avoid per-event layout measurement", async () => {
  const app = await read("app.js");
  const lightbox = app.slice(app.indexOf("const productImageLightboxState"), app.indexOf("function productDetailsMarkup("));
  assert.match(lightbox, /requestAnimationFrame/);
  const lightboxMove = lightbox.slice(lightbox.indexOf('stage.addEventListener("pointermove"'), lightbox.indexOf("const release"));
  assert.doesNotMatch(lightboxMove, /clientWidth|clientHeight|getBoundingClientRect|offsetWidth|offsetHeight/);
  const cart = app.slice(app.indexOf("function initializeFloatingCart("), app.indexOf("initializeFloatingCart();"));
  const cartMove = cart.slice(cart.indexOf('button.addEventListener("pointermove"'), cart.indexOf("const finish"));
  assert.match(cartMove, /requestAnimationFrame\(paintDrag\)/);
  assert.doesNotMatch(cartMove, /getBoundingClientRect|offsetWidth|offsetHeight|style\.(left|top)/);
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
