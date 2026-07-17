import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { catalogKeyDifferences, translateFinder } from "../fragrance-finder-i18n.js";
import { createEmptyFinderAnswers, FINDER_STEP_IDS, FINDER_WEIGHTS, rankFragrances } from "../fragrance-finder-engine.js";

const product = (overrides = {}) => ({
  id: "ideal", category: "perfume", status: "published", nameAr: "عطر الاختبار", nameEn: "Test fragrance", brand: "ORIGO",
  type: "للجنسين", typeEn: "Unisex", familyAr: "خشبي شرقي", familyEn: "Woody Oriental", notesAr: ["عود", "عنبر", "فانيليا"], notesEn: ["Oud", "Amber", "Vanilla"],
  price: 2200, sizes: ["100 ML"], inventory: { quantity: 4 }, insights: { longevity: 5, sillage: 4, value: 4, seasons: { winter: 90, autumn: 80, night: 92, day: 20 } },
  ...overrides
});

test("fragrance finder has exactly nine canonical stages and weights total 100", () => {
  assert.deepEqual(FINDER_STEP_IDS, ["for-whom", "feeling", "families", "notes", "personality", "usage", "features", "budget", "results"]);
  assert.equal(FINDER_STEP_IDS.length, 9);
  assert.equal(Object.values(FINDER_WEIGHTS).reduce((sum, value) => sum + value, 0), 100);
});

test("Arabic and English finder catalogs have identical keys", () => {
  assert.deepEqual(catalogKeyDifferences(), { missingInArabic: [], missingInEnglish: [] });
  assert.equal(translateFinder("ar", "feature.name"), "مكتشف العطر المناسب لذوقك");
  assert.equal(translateFinder("en", "feature.name"), "Fragrance Finder for Your Taste");
});

test("weighted matching uses stock, current price and disliked-note penalties", () => {
  const answers = createEmptyFinderAnswers();
  Object.assign(answers, {
    forWhom: "unisex", feelings: ["woodyDeep", "warmSweet"], families: ["woody", "oriental"], personality: ["bold"],
    usage: ["special"], seasons: ["winter"], times: ["night"], features: ["longLasting", "strongProjection"], budget: "1500to3000"
  });
  answers.notes.liked = ["oud", "amber", "vanilla"];
  const disliked = product({ id: "disliked", notesAr: ["جلد", "باتشولي"], notesEn: ["Leather", "Patchouli"], familyAr: "جلدي", familyEn: "Leather" });
  answers.notes.disliked = ["leather"];
  const unavailable = product({ id: "unavailable", inventory: { quantity: 0 } });
  const result = rankFragrances([disliked, unavailable, product()], answers);
  assert.equal(result.available[0].product.id, "ideal");
  assert.ok(result.available[0].percentage > result.available[1].percentage);
  assert.equal(result.unavailable[0].product.id, "unavailable");
  assert.equal(result.available[0].categoryScores.budget, 1);
});

test("removed finder options and obsolete stage counts are absent from the implementation", async () => {
  const source = `${await readFile(new URL("../fragrance-finder.js", import.meta.url), "utf8")}\n${await readFile(new URL("../fragrance-finder-i18n.js", import.meta.url), "utf8")}`;
  for (const forbidden of ["آمن للحساسية", "تركيز عالٍ", "عطور فاخرة", "1/11", "11 مراحل", "10 مراحل"]) assert.equal(source.includes(forbidden), false, forbidden);
});

test("Finder options are centrally manageable and consumed by the storefront", async () => {
  const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");
  const finderSource = await readFile(new URL("../fragrance-finder.js", import.meta.url), "utf8");
  assert.match(appSource, /fragranceFinder:\s*\{\s*enabled:/);
  assert.match(appSource, /name="finder\.\$\{group\}\.\$\{id\}"/);
  assert.match(appSource, /getFragranceFinderSettings\(\)/);
  assert.match(finderSource, /getFragranceFinderSettings/);
  assert.match(finderSource, /available\(config\.features, "features"\)/);
});
