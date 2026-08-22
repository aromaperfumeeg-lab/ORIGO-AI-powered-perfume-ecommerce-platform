import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const finderI18n = await readFile(new URL("../fragrance-finder-i18n.js", import.meta.url), "utf8");
const appearance = await readFile(new URL("../appearance.css", import.meta.url), "utf8");
const styles = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const productDetail = await readFile(new URL("../product-detail.css", import.meta.url), "utf8");
const performance = app.slice(app.indexOf("function perfumePerformanceEditorSection"), app.indexOf("const PRODUCT_PROFILE_IMAGE_FIELDS"));

test("dark mode uses a black background behind product imagery", () => {
  assert.match(styles,/html\[data-theme="dark"\] \.product-image \{\s*background: #000/);
  assert.match(productDetail,/html\[data-theme="dark"\] \.pdp-main-image/);
  assert.match(productDetail,/\.pdp-thumbnails button\{background:#000\}/);
});

test("light mode uses a white background behind transparent product imagery", () => {
  assert.match(styles,/html\[data-theme="light"\] \.product-image \{\s*background: #fff/);
  assert.match(productDetail,/html\[data-theme="light"\] \.pdp-main-image/);
  assert.match(productDetail,/\.pdp-thumbnails button\{background:#fff\}/);
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

test("uses, fragrance family and notes follow the active storefront language with fallback", () => {
  assert.match(app,/return localizedText\(note\?\.nameAr, note\?\.nameEn\)/);
  assert.match(app,/return localizedText\(family\?\.nameAr, family\?\.nameEn\)/);
  assert.match(app,/Array\.isArray\(product\.occasionLabels\)/);
  assert.match(app,/localizedText\(item\?\.ar \|\| item\?\.name_ar, item\?\.en \|\| item\?\.name_en/);
  assert.match(app,/const importedOccasions = \(product\.occasionLabels \|\| \[\]\)/);
});

test("product details use canonical analysis and performance when artwork is absent", () => {
  const details = app.slice(app.indexOf("function productNoteGroups"), app.indexOf("function productIngredientsMarkup"));
  assert.match(details, /seasonScores \|\| \{\}/);
  assert.match(details, /usageTimeScores \|\| \{\}/);
  assert.match(details, /occasionLabels \|\| \[\]/);
  assert.match(details, /productPerformanceMarkup\(product\)/);
  assert.doesNotMatch(details, /لم تُرفع صور مؤشرات العطر بعد/);
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
  for (const field of ["fullDescriptionAr", "releaseYear", "originCountryAr", "perfumer"]) assert.match(details, new RegExp(field));
  for (const privateField of ["barcode", "minimumStock", "cost", "seoKeywords"]) assert.doesNotMatch(details, new RegExp(privateField));
  assert.match(productDetail, /\.pdp-public-details/);
  assert.match(productDetail, /white-space:pre-wrap/);
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
