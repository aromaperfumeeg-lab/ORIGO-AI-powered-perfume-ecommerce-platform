import { readFile } from "node:fs/promises";
import { catalogKeyDifferences } from "../fragrance-finder-i18n.js";

const differences = catalogKeyDifferences();
if (differences.missingInArabic.length || differences.missingInEnglish.length) {
  throw new Error(`Translation catalogs differ: ${JSON.stringify(differences)}`);
}

const finderSource = await readFile(new URL("../fragrance-finder.js", import.meta.url), "utf8");
const directArabic = finderSource.match(/[\u0600-\u06ff]{3,}/g) || [];
if (directArabic.length) throw new Error(`Hardcoded Arabic found in fragrance-finder.js: ${[...new Set(directArabic)].join(", ")}`);

const visibleFiles = ["../index.html", "../app.js", "../account.js", "../commerce.js", "../fragrance-finder.js", "../fragrance-finder-i18n.js"];
const obsolete = [
  "مكتشف العطر الذكي", "اختيار العطر الذكي", "اختر عطرك الذكي", "اكتشف عطرك المثالي", "مكتشف عطرك المثالي",
  "مكتشف العطر المناسب لك", "Smart Fragrance Finder", "Smart Fragrance Selection", "Perfect Fragrance Finder",
  "Your Perfect Fragrance Finder", "Choose Your Smart Fragrance", "Discover Your Perfect Fragrance"
];
for (const file of visibleFiles) {
  const source = await readFile(new URL(file, import.meta.url), "utf8");
  for (const phrase of obsolete) if (source.includes(phrase)) throw new Error(`${file} contains obsolete visible label: ${phrase}`);
}

console.log(`i18n check passed: ${Object.keys((await import("../fragrance-finder-i18n.js")).fragranceFinderCatalog.ar).length} matched keys.`);
