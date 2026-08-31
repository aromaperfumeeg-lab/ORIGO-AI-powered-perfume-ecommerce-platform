import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
globalThis.window = globalThis;
await import("../fragrance-finder-i18n.js");
import "../fragrance-finder-engine.js";

const { buildFinderProfileFromProduct, scoreFinderProfile, rankProducts } = globalThis.ORIGOFragranceFinderEngine;
const translateFinder = (lang,key) => globalThis.ORIGOFragranceFinderI18n.translate(lang,key);

const product = (overrides = {}) => ({
  id: "ideal", category: "perfume", status: "published", nameAr: "عطر الاختبار", nameEn: "Test fragrance", brand: "ORIGO",
  gender: "unisex", familyAr: "خشبي شرقي", familyEn: "Woody Oriental", families:["woody","oriental"], noteSelectionsBundle:{top:[{ar:"عود",en:"Oud"}],heart:[{ar:"عنبر",en:"Amber"}],base:[{ar:"فانيليا",en:"Vanilla"}]},
  price: 2200, sizes: ["100 ML"], inventory: { quantity: 4 }, seasonScores:{winter:90,autumn:80}, usageTimeScores:{night:92,day:20}, performance:{longevity:10,projection:"strong"},
  ...overrides
});

test("fragrance finder exposes the current profile and ranking engine", () => {
  assert.equal(typeof buildFinderProfileFromProduct, "function");
  assert.equal(typeof scoreFinderProfile, "function");
  assert.equal(typeof rankProducts, "function");
});

test("Arabic and English finder catalogs expose current bilingual copy", () => {
  assert.equal(translateFinder("ar", "title"), "رحلتك إلى العطر الأنسب");
  assert.equal(translateFinder("en", "title"), "Your Journey to the Right Fragrance");
  assert.equal(translateFinder("ar", "results"), "أفضل العطور المناسبة لك");
  assert.equal(translateFinder("en", "results"), "Your best fragrance matches");
});

test("weighted matching uses saved product details without note preferences", () => {
  const answers = { gender:"unisex", families:["woody"], accords:["woody"], seasons:["winter"], times:["night"], sillage:"strong", longevity:"long" };
  const disliked = product({ id: "disliked", noteSelectionsBundle:{top:[{ar:"جلد",en:"Leather"}],heart:[{ar:"باتشولي",en:"Patchouli"}],base:[]}, families:["leather"], familyAr: "جلدي", familyEn: "Leather" });
  const unavailable = product({ id: "unavailable", inventory: { quantity: 0 } });
  const result = rankProducts([disliked, unavailable, product()], answers);
  assert.equal(result[0].profile.product.id, "ideal");
  assert.ok(result[0].score > result.at(-1).score);
  assert.equal(result.find(item=>item.profile.product.id==="unavailable").profile.available, false);
});

test("removed finder options and obsolete stage counts are absent from the implementation", async () => {
  const source = `${await readFile(new URL("../fragrance-finder.js", import.meta.url), "utf8")}\n${await readFile(new URL("../fragrance-finder-i18n.js", import.meta.url), "utf8")}`;
  for (const forbidden of ["آمن للحساسية", "تركيز عالٍ", "عطور فاخرة", "1/11", "11 مراحل", "10 مراحل"]) assert.equal(source.includes(forbidden), false, forbidden);
});

test("Finder options are derived centrally from the published product profiles", async () => {
  const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");
  const finderSource = await readFile(new URL("../fragrance-finder.js", import.meta.url), "utf8");
  assert.match(appSource, /fragranceFinder:\s*\{\s*enabled:/);
  assert.match(appSource, /name="finder\.\$\{group\}\.\$\{id\}"/);
  assert.match(appSource, /getFragranceFinderSettings\(\)/);
  assert.match(finderSource, /function profiles\(\)\{return g\.ORIGOFragranceFinderEngine\.profilesFromProducts\(products\(\)\)\}/);
  assert.match(finderSource, /function options\(field\)/);
  assert.match(finderSource, /new Set\(values\.filter\(Boolean\)\)/);
  assert.doesNotMatch(finderSource, /likedNotes|rejectedNotes|profile\.notes/);
  assert.doesNotMatch(finderSource, /t\("notes"\)/);
});

test("catalog filters use saved product profile fields and exclude notes", async () => {
  const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");
  const filters = appSource.slice(appSource.indexOf("function catalogValues"), appSource.indexOf("function catalogSortMarkup"));
  for (const key of ["accords", "character", "season", "time", "occasion", "longevity", "projection"]) assert.match(filters, new RegExp(`catalogFilterSection\\(\"${key}\"`));
  assert.doesNotMatch(filters, /catalogFilterSection\("notes"/);
  assert.doesNotMatch(filters, /product\.notesAr|product\.notesEn/);
});
