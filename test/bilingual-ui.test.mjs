import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const finderI18n = await readFile(new URL("../fragrance-finder-i18n.js", import.meta.url), "utf8");
const appearance = await readFile(new URL("../appearance.css", import.meta.url), "utf8");
const styles = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const productDetail = await readFile(new URL("../product-detail.css", import.meta.url), "utf8");
const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
const performance = app.slice(app.indexOf("function perfumePerformanceEditorSection"), app.indexOf("const PRODUCT_PROFILE_IMAGE_FIELDS"));

test("dark mode uses a black background behind product imagery", () => {
  assert.match(styles,/html\[data-theme="dark"\] \.product-image \{\s*background: #000/);
  assert.match(appearance,/html\[data-theme="dark"\] body :is\(#storefront-main,\.product-overlay\) \.product-card \.product-card-media-link/);
  assert.match(appearance,/object-fit:contain!important;[\s\S]{0,140}background:transparent!important;[\s\S]{0,100}mix-blend-mode:normal!important/);
  assert.match(productDetail,/html\[data-theme="dark"\] \.pdp-main-image/);
  assert.match(productDetail,/\.pdp-thumbnails button\{background:#000\}/);
  assert.match(appearance,/\.product-card\{\s*border:1px solid #7a001d!important/);
  assert.match(appearance,/border-radius:0!important;[\s\S]{0,80}overflow:hidden!important/);
  assert.match(appearance,/\.product-card \.exact-card-actions\{[\s\S]{0,140}place-items:center!important/);
  assert.match(appearance,/\.exact-card-actions \.card-add-button\{[\s\S]{0,120}justify-self:center!important/);
});

test("night mode uses one neutral palette across mobile, products and admin", () => {
  assert.match(appearance, /ORIGO monochrome night system/);
  assert.match(appearance, /--admin-bg:#000/);
  assert.match(appearance, /\.mobile-menu-panel :where\([\s\S]{0,220}background:#171717!important/);
  assert.match(appearance, /\.product-card \.card-add-button[\s\S]{0,180}background:#181818!important/);
  assert.match(appearance, /\.mobile-menu-active \.store-bottom-nav\{display:none!important\}/);
  assert.match(appearance, /\.home-gender-card\.gender-women \.gender-card-copy[\s\S]{0,180}background-color:#111!important/);
  assert.match(appearance, /article,section\[class\*="card"\][\s\S]{0,520}background-color:#111!important/);
});

test("light mode uses a white background behind transparent product imagery", () => {
  assert.match(styles,/html\[data-theme="light"\] \.product-image \{\s*background: #fff/);
  assert.match(productDetail,/html\[data-theme="light"\] \.pdp-main-image/);
  assert.match(productDetail,/\.pdp-thumbnails button\{background:#fff\}/);
});

test("homepage benefits use one admin source and transparent vector icons", () => {
  const admin = app.slice(app.indexOf("const benefitMarkup ="), app.indexOf("const categoryIconMarkup ="));
  const homeBenefits = app.slice(app.indexOf("function renderHomeBenefitsCurtain"), app.indexOf("function renderHomeNavigation"));
  assert.doesNotMatch(admin, /homeBenefitIconMarkup|data-benefit-icon-upload|data-home-benefit-icon-upload/);
  assert.doesNotMatch(app, /const homeBenefitIconMarkup/);
  assert.match(app, /data-action="add-store-benefit"/);
  assert.match(admin, /الرمز التعبيري الشفاف|Transparent expressive icon/);
  assert.match(homeBenefits, /footerBenefitIcon\(icon\)/);
  assert.doesNotMatch(homeBenefits, /benefit\.image|<img/);
  assert.match(app, /image: ""/);
});

test("brand rail keeps pagination while benefits use an accessible curtain", () => {
  assert.match(index, /id="home-brand-dots"/);
  assert.match(index, /id="home-benefits-curtain"/);
  assert.match(app, /function renderHomeRailDots/);
  assert.match(app, /function bindHomeBrandPagination/);
  assert.match(app, /track\.scrollWidth - track\.clientWidth/);
  assert.match(app, /track\.id === "home-brand-carousel-track" \? track\.clientWidth/);
  assert.match(appearance, /\.home-rail-dots i\.active/);
  assert.match(appearance, /Four brands per mobile swipe/);
  assert.match(appearance, /brand-marquee-set>button\{flex:0 0 calc\(\(100vw - 60px\)\/4\)!important/);
  assert.match(appearance, /button:nth-child\(4n \+ 1\)\{scroll-snap-align:start/);
  const brands = app.slice(app.indexOf("function renderBrandCarousel"), app.indexOf("function renderHomeBenefitsCurtain"));
  assert.match(brands, /const visibleBrands = brands;/);
  assert.doesNotMatch(brands, /brands\.slice\(0,\s*12\)/);
  assert.match(appearance, /brand-marquee-set>button>img\{\s*width:100%!important;height:100%!important/);
});

test("homepage directories avoid glass compositing and use unified gender controls", () => {
  assert.match(appearance, /Lightweight homepage directories: solid surfaces, no glass\/blur compositing/);
  assert.match(appearance, /-webkit-backdrop-filter:none!important;\s*backdrop-filter:none!important/);
  assert.match(index, /class="gender-button-icon"[^>]*><svg viewBox="0 0 24 24">/);
  assert.doesNotMatch(index, />[♂♀⚥]</u);
  assert.match(appearance, /\.home-gender-card:is\(\.gender-men,\.gender-women,\.gender-unisex\)\{[\s\S]{0,420}gap:clamp\(20px,3vw,34px\)!important;[\s\S]{0,180}border:1\.5px solid #790020!important/);
  assert.match(appearance, /--gender-edge:#790020!important;--gender-edge-soft:#790020!important/);
  assert.match(appearance, /\.gender-card-copy b,\.gender-button-icon\)\{\s*color:#fff!important;background:transparent!important/);
  assert.match(appearance, /html\[data-theme="dark"\] body\) #home :is\(h1,h2,h3,h4,h5,h6/);
});

test("season and time controls use inline decorative SVG instead of emoji", () => {
  assert.match(performance, /<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">/);
  assert.doesNotMatch(performance, /❄|🍂|🌸|☀|🌙/u);
  for (const id of ["winter", "autumn", "spring", "summer", "day", "night"]) assert.match(performance, new RegExp(`${id}:`));
});

test("season and time cards keep both translations but render only the active language", () => {
  for (const label of ["الشتاء", "Winter", "الخريف", "Autumn", "الربيع", "Spring", "الصيف", "Summer", "النهار", "Day", "الليل", "Night"]) assert.match(performance, new RegExp(label));
  assert.match(performance, /percentage-score-copy/);
  assert.match(performance, /localizedText\(nameAr, nameEn\)/);
  assert.doesNotMatch(performance, /<small dir="ltr">\$\{nameEn\}/);
});

test("responsive luxury score-card styling is shared without fixed card widths", () => {
  assert.match(appearance, /grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
  assert.match(appearance, /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(appearance, /\.percentage-score-icon svg/);
  assert.match(appearance, /stroke-width:1\.8/);
});

test("storefront, admin, product data and finder render one effective language", () => {
  assert.match(app, /function localizedText\(ar, en, language = state\.lang\)/);
  assert.doesNotMatch(app, /Object\.keys\(translations\.ar\)/);
  assert.match(app, /const adminCopy = \(ar, en\) => localizedText\(ar, en\)/);
  assert.match(app, /return localizedText\(product\.nameAr, product\.nameEn, language\)/);
  assert.match(finderI18n, /translate:\(lang,key\)=>copy\[lang\]/);
  assert.match(finderI18n, /مكتشف العطر المناسب لذوقك/);
  assert.match(finderI18n, /Find Your Perfect Fragrance/);
});

test("product editor exposes and persists missing Arabic product-data translations", () => {
  assert.match(app,/function productArabicTranslationEditor/);
  assert.match(app,/data-product-translation/);
  assert.match(app,/translationOverrides/);
  assert.match(app,/applyProductArabicTranslations\(product\)/);
  assert.match(app,/fragranceFamilyAr/);
  assert.match(app,/occasionLabels/);
  assert.match(app,/noteSelectionsBundle/);
  assert.match(app,/accordProfile/);
});

test("fragrance family and notes follow the active storefront language with fallback", () => {
  assert.match(app,/return localizedText\(note\?\.nameAr, note\?\.nameEn\)/);
  assert.match(app,/return localizedText\(family\?\.nameAr, family\?\.nameEn\)/);
});

test("product details use saved performance when artwork is absent", () => {
  const details = app.slice(app.indexOf("function productNoteGroups"), app.indexOf("function productIngredientsMarkup"));
  assert.match(details, /productPerformanceMarkup\(product\)/);
  assert.doesNotMatch(details, /لم تُرفع صور مؤشرات العطر بعد/);
});

test("product page does not render ORIGO usage, occasion or longevity suggestions", () => {
  const page = app.slice(app.indexOf("function showProductDetails"), app.indexOf("function closeProductPage"));
  const profile = app.slice(app.indexOf("function productProfileAccordions"), app.indexOf("async function persistNotesState"));
  const cards = app.slice(app.indexOf("function productCardDetailsMarkup"), app.indexOf("function productCardMarkup"));
  assert.doesNotMatch(page, /productSuitabilityMarkup\(product\)|productRelated\(product\)|عطور قريبة في الرائحة|Similar-smelling fragrances/);
  assert.doesNotMatch(profile, /productIntelligenceMarkup\(product\)|Character and usage|الطابع والاستخدام/);
  assert.doesNotMatch(cards, /estimatedHours|Times and occasions|الأوقات والمناسبات|card-season-grid/);
  assert.doesNotMatch(page, /productConfiguredLinksMarkup\(product\)|Recently viewed|شوهد مؤخرًا/);
  const performance = app.slice(app.indexOf("function productPerformanceMarkup"), app.indexOf("function productCardGenderLabel"));
  const cardPerformance = app.slice(app.indexOf("function productCardPerformance"), app.indexOf("let productCardRenderSerial"));
  assert.doesNotMatch(performance, /occasionLabels|product\.seasons|Occasion|Season/);
  assert.doesNotMatch(cardPerformance, /id: "occasion"|id: "season"|Suggested audience|الفئة المقترحة|isKhamrah/);
  assert.doesNotMatch(app.slice(app.indexOf("function productCardAuraNotes"), app.indexOf("function resolveProductCardComponents")), /FALLBACK_NOTES/);
});

test("note pyramid shows one language and replaces missing artwork", () => {
  const pyramid = app.slice(app.indexOf("function productNotePyramid"), app.indexOf("const PRODUCT_USE_CASES"));
  assert.match(pyramid, /data-note-artwork="true"/);
  assert.match(pyramid, /data-note-slug=/);
  assert.doesNotMatch(pyramid, /state\.lang === "ar" \? note\.nameEn : note\.nameAr/);
  assert.match(styles, /\.dialog-note-chip \{[\s\S]*grid-template-columns: 1fr;[\s\S]*text-align: center;/);
  assert.match(styles, /\.dialog-note-chip img \{[\s\S]*width: 100%;[\s\S]*height: 82px;/);
});

test("published product details expose saved public fields without admin metadata", () => {
  const details = app.slice(app.indexOf("function productPublicDetailsMarkup"), app.indexOf("function productProfileAccordions"));
  for (const field of ["fullDescriptionAr", "releaseYear", "originCountryAr", "perfumer", "typeAr", "typeEn", "barcode", "variants", "featuredNotes", "scentCharacterAr", "scentCharacterEn", "moods", "tags", "dynamicAttributes", "usageInstructionsAr", "usageInstructionsEn", "videoUrl", "longevityHours", "projectionAr", "projectionEn", "ratingDetails", "is_origo_customer_rating"]) assert.match(details, new RegExp(field));
  for (const privateField of ["minimumStock", "cost", "reserved", "internalNotes", "seoKeywords", "seoCanonical", "seoRobots", "manualSourceUrl", "sourceLog", "perfumeBundle", "translationOverrides", "profileStatus", "profileSource"]) assert.doesNotMatch(details, new RegExp(privateField));
  assert.match(productDetail, /\.pdp-public-details/);
  assert.match(productDetail, /white-space:pre-wrap/);
  assert.match(app, /function productConfiguredLinksMarkup\(product\)/);
  assert.match(app, /\["similarProductIds"[\s\S]*\["crossSellIds"[\s\S]*\["alternativeIds"/);
  assert.match(app, /product\.cardBadgeAr \|\| product\.badgeAr/);
  assert.match(details, /"الثبات بالساعات والفوحان" : "Longevity in hours and projection"/);
  assert.match(details, /formatNumber\(longevityHours\)/);
  assert.match(details, /product\.seasonScores/);
  assert.match(details, /product\.usageTimeScores/);
  assert.match(details, /product\.occasionLabels/);
  assert.match(details, /"ملاءمة الفصول" : "Season suitability"/);
  assert.match(details, /"وقت الاستخدام" : "Usage time"/);
  assert.match(details, /"عدد المقيّمين" : "Number of reviewers"/);
  assert.doesNotMatch(details, /اقتراح|suggested|recommended|Best season|أفضل فصل/);
  assert.match(details, /pdp-detail-gates/);
  assert.match(details, /pdp-detail-gate/);
  assert.match(details, /pdp-usage-visuals/);
  assert.match(details, /pdp-time-visual/);
  assert.match(details, /pdp-season-visual/);
  assert.match(details, /--usage-score:/);
  assert.match(details, /formatPercent\(item\.value\)/);
  assert.match(details, /"هوية المنتج" : "Product identity"/);
  assert.match(details, /"الأداء والاستخدام" : "Performance and usage"/);
  const accordsAt = app.indexOf("${productPublicAccordsMarkup(product)}");
  const detailsAt = app.indexOf("${productPublicDetailsMarkup(product)}");
  assert.ok(accordsAt >= 0 && detailsAt > accordsAt);
});

test("product description is collapsible and product identity is rendered once", () => {
  const details = app.slice(app.indexOf("function productPublicDetailsMarkup"), app.indexOf("function productConfiguredLinksMarkup"));
  assert.match(details, /وصف المنتج/);
  assert.match(details, /عرض المزيد/);
  assert.match(details, /pdp-description-more/);
  assert.match(details, /pdp-identity-strip/);
  assert.equal((details.match(/هوية المنتج/g) || []).length, 1);
  assert.doesNotMatch(details, /title:ar \? "هوية المنتج"/);
});

test("Arabic product identity resolves canonical gender and common fragrance-family labels", () => {
  assert.match(app, /unisex:"للجنسين"/);
  assert.match(app, /"oriental vanilla":\["شرقي فانيليا","Oriental Vanilla"\]/);
  assert.match(app, /typeLooksLikeGender/);
});

test("occasions and fragrance character render as localized compact tags", () => {
  const details = app.slice(app.indexOf("function productPublicDetailsMarkup"), app.indexOf("function productConfiguredLinksMarkup"));
  assert.match(details, /"evening-events":\["فعاليات مسائية","Evening events"\]/);
  assert.match(details, /warm:\["دافئ","Warm"\]/);
  assert.match(details, /class="pdp-detail-tags"/);
  assert.match(productDetail, /\.pdp-public-details \.pdp-detail-tags/);
  assert.doesNotMatch(details, /`\$\{formatRating\(ratingValue\)\} \/ 5`/);
});

test("top performance strip replaces the duplicate editorial performance panel", () => {
  const details = app.slice(app.indexOf("function productPublicDetailsMarkup"), app.indexOf("function productConfiguredLinksMarkup"));
  const profile = app.slice(app.indexOf("function productProfileAccordions"), app.indexOf("async function persistNotesState"));
  assert.match(details, /pdp-performance-strip/);
  assert.match(details, /الثبات بالساعات والفوحان/);
  assert.match(productDetail, /\.pdp-performance-strip/);
  assert.doesNotMatch(profile, /data-pdp-section="performance"|ملخص الأداء التحريري|Fragrance performance/);
});

test("product metadata resolves bilingual SEO and canonical product URLs", () => {
  assert.match(app, /localizedText\(manual\.titleAr, manual\.titleEn, language\)/);
  assert.match(app, /localizedText\(manual\.descriptionAr, manual\.descriptionEn, language\)/);
  assert.match(app, /seo\.canonical \|\| `\$\{location\.origin\}\/perfume\//);
  assert.match(app, /meta\[data-product-robots="true"\]/);
});

test("admin and storefront accords are ordered by descending strength", () => {
  assert.match(app,/orderedLibrary = ORIGO_ACCORD_LIBRARY[\s\S]*selected\.get\(b\.item\[0\]\)[\s\S]*selected\.get\(a\.item\[0\]\)/);
  assert.match(app,/filter\(\(item\) => item\.id[\s\S]*\.sort\(\(a,b\) => Number\(b\.strength/);
  assert.match(app,/accordProfile = \[\.\.\.libraryAccords, \.\.\.customAccords\]\.sort/);
});

test("admin and storefront accords use local photographic artwork instead of symbols", async () => {
  const accordDisplay = app.slice(app.indexOf("function accordPhotoCell"),app.indexOf("function productHeroProfileMarkup"));
  assert.match(accordDisplay,/accord-photo-atlas-v3-/);
  assert.match(accordDisplay,/atlas:atlas\+1, column:index%5, row:Math\.floor\(index\/5\)/);
  assert.match(app,/accordPhotoMarkup\(\{id,nameAr,nameEn\},"is-admin"\)/);
  assert.doesNotMatch(accordDisplay,/item\.icon\|\|item\.symbol/);
  for (let atlas=1; atlas<=5; atlas+=1) {
    const artwork = await readFile(new URL(`../assets/accords/accord-photo-atlas-v3-${atlas}.webp`,import.meta.url));
    assert.ok(artwork.length > 10000);
  }
});

test("product details expose every saved accord ordered by strength", () => {
  const publicAccords = app.slice(app.indexOf("function productAccordMarkup"),app.indexOf("function productProfileImage"));
  assert.match(app,/function productPublicAccordsMarkup\(product\)/);
  assert.match(app,/\$\{productPublicAccordsMarkup\(product\)\}/);
  assert.match(app,/الأكوردات الرئيسية/);
  assert.match(publicAccords,/const accords = perfumeResolvedAccords\(product\);/);
  assert.doesNotMatch(publicAccords,/perfumeResolvedAccords\(product\)\.slice\(0, 8\)/);
  assert.match(publicAccords,/localizedText\(item\.nameAr,item\.nameEn\)/);
});

test("theme action follows the active language and always names the opposite mode", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /data-theme-action-label/);
  assert.match(app, /state\.lang === "ar" \? "الوضع الفاتح" : "Light mode"/);
  assert.match(app, /state\.lang === "ar" \? "الوضع الداكن" : "Dark mode"/);
  assert.match(app, /mobileIcon\.dataset\.mobileMenuIcon = isDark \? "sun" : "moon"/);
});

test("footer directory centers every heading and keeps only the all-brands row icon", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(appearance, /\.origo-footer \.footer-directory > section\{[\s\S]*align-items:center!important;[\s\S]*text-align:center!important;/);
  assert.match(html, /class="footer-all-link"[^>]*>عرض جميع الماركات <span>▦<\/span>/);
  const directory = html.slice(html.indexOf('<div class="footer-directory">'), html.indexOf('<div class="footer-bottom-bar">'));
  const withoutAllBrands = directory.replace(/<a class="footer-all-link"[\s\S]*?<\/a>/, "");
  assert.doesNotMatch(withoutAllBrands, /[♙⇄‹ⓘ▱↶♢▣◇✉◉◷✦]/);
  assert.doesNotMatch(withoutAllBrands, />\?<\/span>/);
  assert.match(appearance, /\.origo-footer \.footer-brand-list > :where\(a,button\)\{[\s\S]*text-align:center!important;/);
});

test("brand labels follow the storefront language and newsletter keeps its arrow", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const footer = await readFile(new URL("../footer.css", import.meta.url), "utf8");
  assert.match(app, /function localizedBrandLabel\(brand\)/);
  assert.match(app, /"afnan perfumes":"أفنان للعطور"/);
  assert.match(app, /BRAND_ARABIC_LABELS\[normalizeOptionSearch\(brand\)\]/);
  assert.match(html, /<i aria-hidden="true">←<\/i>/);
  assert.match(footer, /newsletter-form \.footer-email-field>button>i\{display:block!important;visibility:visible!important;opacity:1!important/);
  assert.match(footer, /footer-directory>section\{padding:16px!important;border:1px solid #d9dce1/);
});

test("brands directory uses responsive centered homepage-style cards", () => {
  assert.match(appearance, /\.brands-page-grid > a\{[\s\S]*grid-template-rows:110px auto;[\s\S]*border-radius:18px;/);
  assert.match(appearance, /\.brands-page-grid > a > b\{[\s\S]*place-items:center;[\s\S]*text-align:center!important;/);
  assert.match(appearance, /@media\(max-width:600px\)\{[\s\S]*\.brands-page-grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)!important/);
});

test("mobile storefront exposes a persistent one-or-two product layout control", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /catalog-title-area[\s\S]{0,500}mobile-product-view-control/);
  assert.match(html, /data-columns="1"/);
  assert.match(html, /data-columns="2"/);
  assert.match(app, /origoMobileProductColumns/);
  assert.match(app, /documentElement\.dataset\.productCardView/);
  assert.match(app, /function mobileProductViewControlMarkup/);
  assert.doesNotMatch(app, /data-columns="1"[^>]*>[\s\S]{0,180}<span>1<\/span>/);
  assert.doesNotMatch(app, /data-columns="2"[^>]*>[\s\S]{0,220}<span>2<\/span>/);
  assert.match(app, /home-section-head[\s\S]{0,260}mobileProductViewControlMarkup\(\)/);
  assert.match(appearance, /data-product-card-view="one"/);
  assert.match(appearance, /data-product-card-view="two"/);
  assert.match(appearance, /\.catalog-product-grid,\.pdp-products-row,\.note-products-grid/);
  assert.match(appearance, /#home \.home-product-row-track\{display:flex!important;overflow-x:auto!important/);
  assert.match(appearance, /\.mobile-product-view-control\{position:static/);
  assert.match(appearance, /inset-inline-start:50%!important/);
  assert.doesNotMatch(appearance, /grid-column:3!important/);
  assert.doesNotMatch(app, /home-brand-carousel-track[^\n]+max-width: 700px[^\n]+return/);
  assert.match(app, /getComputedStyle\(brandTrack\)\.direction === "rtl"/);
  assert.match(app, /if \(action === "mobile-product-columns"\) \{\s*setMobileProductColumns/);
  const dragStart = app.slice(app.indexOf('document.addEventListener("dragstart"'), app.indexOf('document.addEventListener("dragover"'));
  assert.doesNotMatch(dragStart, /mobile-product-columns/);
  assert.match(html, /<rect x="5" y="5" width="14" height="14"/);
});

test("product detail facts render as one compact row per item", () => {
  assert.match(productDetail, /Product information groups: one compact fact per row/);
  assert.match(productDetail, /\.pdp-detail-gate dl,[\s\S]{0,180}grid-template-columns:1fr!important/);
  assert.match(productDetail, /grid-template-columns:minmax\(92px,34%\) minmax\(0,1fr\)!important/);
});
