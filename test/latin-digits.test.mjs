import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const finder = await readFile(new URL("../fragrance-finder.js", import.meta.url), "utf8");
const helperSource = app.slice(app.indexOf("function normalizeLatinDigits"), app.indexOf("const formatPrice"));
const helpers = Function(`${helperSource}; return { normalizeLatinDigits, formatNumber, formatPercent, formatRating };`)();

test("Arabic and Persian digits normalize without changing surrounding Arabic text", () => {
  assert.equal(helpers.normalizeLatinDigits("متبقي ٣ قطع"), "متبقي 3 قطع");
  assert.equal(helpers.normalizeLatinDigits("۰۱۲۳۴۵۶۷۸۹"), "0123456789");
  assert.equal(helpers.normalizeLatinDigits("٩٥٪"), "95%");
  assert.equal(helpers.normalizeLatinDigits("٤٫٧"), "4.7");
});

test("central number helpers always emit Latin digits", () => {
  assert.equal(helpers.formatNumber(12500), "12,500");
  assert.equal(helpers.formatPercent(95), "95%");
  assert.equal(helpers.formatRating(4.7), "4.7 / 5");
  for (const output of [helpers.formatNumber(100), helpers.formatPercent(45), helpers.formatRating(4.8)]) assert.doesNotMatch(output, /[٠-٩۰-۹]/u);
});

test("price and dates explicitly request Latin numbering", () => {
  assert.match(app, /new Intl\.NumberFormat\("en-US"/);
  assert.match(app, /numberingSystem:\s*"latn"/);
  assert.doesNotMatch(app, /Intl\.NumberFormat\("ar(?:-EG)?"/);
  assert.doesNotMatch(app, /toLocale(?:Date|Time)?String\("ar-EG"\)/);
  assert.match(app, /ar-EG-u-nu-latn/);
});

test("rendered UI, attributes, escaped content and finder scores use the central layer", () => {
  assert.match(app, /function normalizeRenderedLatinDigits/);
  assert.match(app, /latinDigitObserver\.observe/);
  assert.match(app, /return normalizeLatinDigits\(value\)\.replace/);
  assert.match(app, /formatPercent\(shown\)/);
  assert.match(app, /formatPercent\(strength\)/);
  assert.match(finder, /ORIGOStore\.formatPercent\(item\.score\)/);
  assert.match(finder, /ORIGOStore\.formatNumber\(r\.hours\)/);
});

test("Arabic-Indic literals exist only inside the conversion utility", () => {
  const withoutNormalizer = app.replace(helperSource, "");
  assert.doesNotMatch(withoutNormalizer, /[٠-٩۰-۹]/u);
  assert.doesNotMatch(finder, /[٠-٩۰-۹]/u);
});

