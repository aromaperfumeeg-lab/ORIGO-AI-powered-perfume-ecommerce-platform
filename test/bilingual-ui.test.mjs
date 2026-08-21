import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const finderI18n = await readFile(new URL("../fragrance-finder-i18n.js", import.meta.url), "utf8");
const appearance = await readFile(new URL("../appearance.css", import.meta.url), "utf8");
const performance = app.slice(app.indexOf("function perfumePerformanceEditorSection"), app.indexOf("const PRODUCT_PROFILE_IMAGE_FIELDS"));

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
