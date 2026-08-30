import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");

test("only the first nonempty enabled product rail has the shared density control", async () => {
  const app = await read("app.js");
  const holder = { innerHTML: "" };
  const context = {
    $: () => holder, $$: () => [],
    state: { lang: "ar", adminWorkspace: { settings: {} } },
    mergeStoreSettings: () => ({ homeProductRows: [
      { source: "hidden", enabled: false }, { source: "empty", order: 1 },
      { source: "first", order: 2 }, { source: "second", order: 3 }
    ] }),
    homeProductRowProducts: row => row.source === "empty" ? [] : [{}],
    homeProductRowTitle: row => row.source,
    homeProductRowViewAll: () => "", escapeHTML: value => value,
    mobileProductViewControlMarkup: () => '<div class="mobile-product-view-control"></div>',
    productCardMarkup: () => "<article></article>",
    bindConfiguredHomeProductRow: () => {}, setMobileProductColumns: () => {},
    document: { documentElement: { dataset: {} } }, matchMedia: () => ({ matches: false })
  };
  runInNewContext(app.slice(app.indexOf("function renderConfiguredHomeProductRows()"), app.indexOf("function renderHomepageCommerce()")), context);
  context.renderConfiguredHomeProductRows();
  assert.equal((holder.innerHTML.match(/mobile-product-view-control/g) || []).length, 1);
  assert.match(holder.innerHTML.split("</section>")[0], /data-home-product-source="first"[\s\S]*mobile-product-view-control/);
  context.renderConfiguredHomeProductRows();
  assert.equal((holder.innerHTML.match(/mobile-product-view-control/g) || []).length, 1);
});

test("brand product rails match saved Arabic, English and slug aliases", async () => {
  const app = await read("app.js");
  const source = app.slice(app.indexOf("function homeProductMatchesBrand("), app.indexOf("function homeProductRowProducts("));
  const option = {group:"brand",slug:"lattafa",value:"lattafa",nameAr:"لطافة",nameEn:"Lattafa",metadata:{value:"lattafa-perfumes"}};
  const normalize = (value) => String(value || "").trim().toLocaleLowerCase("en").replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-+|-+$/g,"");
  const context = {
    state:{productOptions:[option]},
    brandIdentity:normalize,
    brandMatches:(brand,value) => [brand.slug,brand.value,brand.nameAr,brand.nameEn,brand.metadata?.value].some((alias) => normalize(alias) === normalize(value))
  };
  runInNewContext(source,context);
  assert.equal(context.homeProductMatchesBrand({brandAr:"لطافة"},"lattafa"),true);
  assert.equal(context.homeProductMatchesBrand({brandEn:"Lattafa"},"لطافة"),true);
  assert.equal(context.homeProductMatchesBrand({brand:"Other"},"lattafa"),false);
});

test("homepage brand matching does not depend on deferred product editor options", async () => {
  const app = await read("app.js");
  const source = app.slice(app.indexOf("function homeProductMatchesBrand("), app.indexOf("function homeProductRowProducts("));
  assert.doesNotMatch(source, /productOptionItems\(/);
});

test("every default benefit has bilingual detail and old settings retain edits when new benefits are added", async () => {
  const app = await read("app.js");
  const defaults = app.slice(app.indexOf("const defaultFooterBenefits ="), app.indexOf("const defaultStoreSettings ="));
  const merging = app.slice(app.indexOf("  const benefitMap ="), app.indexOf("  const savedAppearance ="));
  const context = { structuredClone };
  runInNewContext(`${defaults}; this.defaults = defaultFooterBenefits; this.merge = (saved) => { ${merging} return mergedBenefits; };`, context);
  assert.equal(context.defaults.length, 8);
  for (const benefit of context.defaults) {
    for (const field of ["titleAr","titleEn","descriptionAr","descriptionEn"]) assert.ok(benefit[field], `${benefit.slug}: ${field}`);
    for (const field of ["stepsAr","stepsEn","conditionsAr","conditionsEn","faqs"]) assert.ok(benefit[field].length, `${benefit.slug}: ${field}`);
  }
  const merged = context.merge({footerBenefits:[{id:"benefit-customer-service",slug:"customer-service",titleAr:"دعم مخصص",active:false},{id:"custom",slug:"custom",titleAr:"مخصصة"}]});
  assert.equal(merged.find((item) => item.id === "benefit-customer-service").titleAr, "دعم مخصص");
  assert.equal(merged.find((item) => item.id === "benefit-customer-service").active, false);
  assert.equal(merged.length, 9);
  assert.equal(context.merge({footerBenefits:merged}).length, 9);
  Object.assign(context, {
    state:{lang:"ar",adminWorkspace:{settings:{}}},
    mergeStoreSettings:() => ({footerBenefits:context.defaults}),
    adminCopy:(ar) => ar,
    escapeHTML:(value = "") => String(value).replaceAll('"','&quot;'),
    selectOptions:(options, selected) => options.map(([value,label]) => `<option value="${value}"${value === selected ? " selected" : ""}>${label}</option>`).join("")
  });
  runInNewContext(app.slice(app.indexOf("function benefitEditorForm("), app.indexOf("function settingsMarkup(")), context);
  const editor = context.benefitsManagementMarkup();
  assert.equal((editor.match(/data-benefit-editor/g) || []).length, 8);
  assert.match(editor,/data-action="add-managed-benefit"/);
  for (const benefit of context.defaults) assert.ok(editor.includes(`benefit.${benefit.id}.descriptionAr`));
});

test("benefit form edits can clear optional content and preserve the detail URL", async () => {
  const app = await read("app.js");
  const source = app.slice(app.indexOf("function benefitFromForm("), app.indexOf("function benefitSettingsCards("));
  const context = { FormData:class { constructor(form) { return form.data; } }, adminCopy:(ar,en) => en, safePublicHref:(url) => url.startsWith("/") ? url : "" };
  runInNewContext(source, context);
  const form = { dataset:{id:"sample"}, data:new Map(Object.entries({"benefit.sample.titleAr":"عنوان","benefit.sample.titleEn":"Title","benefit.sample.descriptionAr":"تفاصيل","benefit.sample.descriptionEn":"Details","benefit.sample.faqsAr":"سؤال|إجابة","benefit.sample.ctaUrl":"/perfumes"})) };
  const result = context.benefitFromForm(form,{slug:"stable-url",shortAr:"old",conditionsAr:["old"]});
  assert.equal(result.slug,"stable-url");
  assert.equal(result.shortAr,"");
  assert.equal(result.conditionsAr.length,0);
  assert.equal(result.active,false);
  assert.equal(result.faqs[0].qAr,"سؤال");
  form.data.set("benefit.sample.descriptionAr","");
  assert.throws(() => context.benefitFromForm(form),/title and details/);
});

test("brand rail moves continuously, changes speed, pauses and never clones cards", async () => {
  const frames = new Map();
  let id = 0;
  const mobile = Object.assign(new EventTarget(), {matches:true});
  const reduced = Object.assign(new EventTarget(), {matches:false});
  const document = Object.assign(new EventTarget(), {hidden:false, documentElement:{dir:"rtl"}, body:{classList:{contains:() => false}}});
  const window = new EventTarget();
  runInNewContext(await read("home-brand-navigation.js"), {
    window, document, AbortController,
    matchMedia:(query) => query.includes("700px") ? mobile : reduced,
    requestAnimationFrame:(callback) => {frames.set(++id, callback); return id;},
    cancelAnimationFrame:(key) => frames.delete(key), setTimeout:(callback) => callback()
  });
  const cards = Array.from({length:20}, (_, index) => ({index}));
  const track = Object.assign(new EventTarget(), {
    children:cards, dataset:{}, clientWidth:360, scrollWidth:1600, scrollLeft:0,
    style:{setProperty(){}}, classList:{add(){},remove(){}}, isConnected:true,
    closest:() => null, contains:() => false,
    append(card){cards.splice(cards.indexOf(card),1); cards.push(card);},
    prepend(card){cards.splice(cards.indexOf(card),1); cards.unshift(card);}
  });
  Object.defineProperties(track, {firstElementChild:{get:() => cards[0]}, lastElementChild:{get:() => cards.at(-1)}});
  const slider = window.ORIGOBrandSlider.mount(track, cards.map(card => `<button>${card.index}</button>`));
  const tick = (time) => {const callback = frames.values().next().value; frames.clear(); callback(time);};
  tick(100); tick(120);
  const firstDistance = Math.abs(track.scrollLeft);
  assert.ok(firstDistance > 0 && firstDistance < 3, "motion advances pixels, not a whole page");
  tick(140); assert.ok(Math.abs(track.scrollLeft) > firstDistance);
  slider.setInterval(6); tick(160);
  const beforeSlow = Math.abs(track.scrollLeft); tick(180);
  assert.ok(Math.abs(track.scrollLeft) - beforeSlow < firstDistance);
  for(let index=0;index<30;index++) slider.step(1);
  assert.equal(new Set(cards).size, 20);
  assert.equal(cards.length, 20);
  document.hidden=true; document.dispatchEvent(new Event("visibilitychange")); assert.equal(frames.size,0);
  document.hidden=false; document.dispatchEvent(new Event("visibilitychange")); assert.equal(frames.size,1);
  reduced.matches=true; reduced.dispatchEvent(new Event("change")); assert.equal(frames.size,0);
  reduced.matches=false; reduced.dispatchEvent(new Event("change"));
  mobile.matches=false; mobile.dispatchEvent(new Event("change")); assert.equal(frames.size,1);
  slider.destroy(); assert.equal(frames.size,0);
  track.scrollWidth=300;
  window.ORIGOBrandSlider.mount(track, ["<button>One</button>"]); assert.equal(frames.size,0);
});

test("homepage exposes the requested commerce hierarchy without duplicate benefit strips", async () => {
  const [html, app, css] = await Promise.all([read("index.html"), read("app.js"), read("home.css")]);
  assert.match(html, /id="header-brands-dropdown"/);
  assert.match(html, /id="header-categories-dropdown"/);
  assert.match(html, /id="home-brand-carousel-track"/);
  assert.match(html, /id="new-product-grid"/);
  assert.match(html, /id="best-sellers"/);
  assert.match(html, /id="home-configured-product-rows"/);
  assert.equal((html.match(/id="home-benefits-track"/g) || []).length, 1);
  assert.doesNotMatch(html, /data-action="benefits-slider-step"/);
  assert.match(html, /id="home-benefits-track" data-horizontal-rail/);
  assert.doesNotMatch(html, /toggle-benefits-curtain|id="home-benefits-curtain"/);
  assert.doesNotMatch(html, /benefit-carousel-track|data-benefit-marquee|home-benefit-dots/);
  ["authentic", "shipping", "returns", "prices", "cod", "gift", "support"].forEach((id) => assert.match(app, new RegExp(`icon:\\s*"${id}"`)));
  assert.match(app, /const ORIGO_PERFUME_BRANDS = \[/);
  assert.match(app, /"Lattafa"/);
  assert.match(app, /"الرونق للعطور"/);
  assert.match(app, /function renderHomepageCommerce\(\)/);
  assert.match(app, /placement === "hero"/);
  assert.match(css, /grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
});

test("benefit slider uses saved active benefits and retains detail links", async () => {
  const app = await read("app.js");
  const source = app.slice(app.indexOf("function renderHomeBenefitsSlider("), app.indexOf("function renderHomeNavigation("));
  const track = {}, title = {};
  let boundRail;
  const context = {
    state:{lang:"ar",adminWorkspace:{settings:{}}},
    $:(selector) => selector === "#home-benefits-track" ? track : title,
    activeFooterBenefits:() => [{slug:"secure-payment",titleAr:"دفع آمن",shortAr:"تفاصيل الدفع",icon:"cod"}],
    escapeHTML:(value) => String(value), footerBenefitIcon:() => "<svg></svg>",
    mergeStoreSettings:() => ({homepageRails:{benefits:{intervalSeconds:5,titleAr:"المزايا"}}}),
    bindHorizontalRail:(rail) => { boundRail = rail; },
    renderHomeRailDots:(selector, count, size) => {
      assert.equal(selector, "#home-benefits-pagination");
      assert.equal(count, 1);
      assert.equal(size, 4);
    },
    bindHomeBrandPagination:(rail, selector) => {
      assert.equal(rail, track);
      assert.equal(selector, "#home-benefits-pagination");
    }
  };
  runInNewContext(source,context);
  context.renderHomeBenefitsSlider();
  assert.equal(boundRail,track);
  assert.doesNotMatch(source,/ORIGOBrandSlider|setInterval|setTimeout/);
  assert.match(track.innerHTML,/data-action="benefit-link" data-slug="secure-payment"/);
  assert.match(track.innerHTML,/دفع آمن/);
  assert.equal(title.textContent,"المزايا");
});

test("benefit pagination follows swipe progress in both directions without duplicate listeners", async () => {
  const app = await read("app.js");
  const source = app.slice(app.indexOf("function bindHomeBrandPagination("), app.indexOf("function renderHomeBenefitsSlider("));
  const active = [false, false, false];
  const dots = {children:active.map((_, i) => ({classList:{toggle:(_name, value) => { active[i] = value; }}}))};
  let onScroll, bindings = 0;
  const track = {dataset:{}, scrollWidth:900, clientWidth:300, scrollLeft:0, addEventListener:(_event, callback) => { onScroll = callback; bindings++; }};
  const context = {$:() => dots, requestAnimationFrame:(callback) => callback()};
  runInNewContext(source, context);
  context.bindHomeBrandPagination(track, "#home-benefits-pagination");
  assert.deepEqual(active, [true,false,false]);
  track.scrollLeft = -300; onScroll();
  assert.deepEqual(active, [false,true,false]);
  track.scrollLeft = 600; onScroll();
  assert.deepEqual(active, [false,false,true]);
  context.bindHomeBrandPagination(track, "#home-benefits-pagination");
  assert.equal(bindings, 1);
});

test("homepage shows only the localized store title while retaining SEO description", async () => {
  const [html, app] = await Promise.all([read("index.html"), read("app.js")]);
  const intro = html.match(/<section class="home-seo-intro"[\s\S]*?<\/section>/)[0];
  assert.match(intro, /<h1 id="home-seo-title">أوريجو سينتس - متجر العطور الأصلية في مصر<\/h1>/);
  assert.doesNotMatch(intro, /<(?:p|a)\b/);
  assert.match(app, /setText\("#home-seo-title", "أوريجو سينتس - متجر العطور الأصلية في مصر", "ORIGO Scents - Original Perfume Store in Egypt"\)/);
  assert.match(html, /<meta\s+name="description"\s+content="[^"]+"/);
  const css = await read("appearance.css");
  assert.match(css, /@media\(max-width:700px\)\{\s*#home \.home-seo-intro\{width:calc\(100% - 20px\);padding:10px 6px\}\s*#home #home-seo-title\{font-size:clamp\(11px,3\.4vw,15px\);line-height:1\.4;white-space:nowrap;letter-spacing:0;zoom:1\}/);
});
