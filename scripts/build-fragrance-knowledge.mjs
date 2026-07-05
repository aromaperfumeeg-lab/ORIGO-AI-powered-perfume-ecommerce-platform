import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const sourcePath = process.argv[2];
if (!sourcePath) {
  console.error("Usage: node scripts/build-fragrance-knowledge.mjs <pasted-text.txt>");
  process.exit(1);
}

const categories = [
  ["citrus", "الموالح و الحمضيات", "Citrus"],
  ["fruits-vegetables-nuts", "الفواكة و الخضروات و المكسرات", "Fruits, vegetables & nuts"],
  ["flowers", "الزهور", "Flowers"],
  ["white-flowers", "الزهور البيضاء", "White flowers"],
  ["greens-herbs-fougere", "النباتات العشبيه(الجرين) و الأعشاب و الطحالب", "Greens, herbs & fougère"],
  ["spices", "التوابل", "Spices"],
  ["sweets-gourmand", "الحلوي و النكهات", "Sweets & gourmand"],
  ["woods-mosses", "الأخشاب و الطحالب", "Woods & mosses"],
  ["resins-balsams", "الراتنجات(الصمغيات) و البلسم", "Resins & balsams"],
  ["musk-amber-animalic", "المسك، العنبر، و المكونات ذات الأصل الحيواني", "Musk, amber & animalic"],
  ["beverages", "المشروبات", "Beverages"],
  ["natural-synthetic-unusual", "طبيعي و مصطنع ، شائع و غريب", "Natural, synthetic & unusual"],
  ["uncategorized", "غير مصنف", "Uncategorized"]
];

const text = await readFile(resolve(sourcePath), "utf8");
const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).map((line) => line.trim());
let cursor = 3;
const parsed = [];

for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex += 1) {
  const [id, nameAr, nameEn] = categories[categoryIndex];
  const start = lines.findIndex((line, index) => index >= cursor && line === nameAr);
  if (start < 0) throw new Error(`Missing category heading: ${nameAr}`);
  const nextName = categories[categoryIndex + 1]?.[1];
  const end = nextName
    ? lines.findIndex((line, index) => index > start && line === nextName)
    : lines.length;
  if (end < 0) throw new Error(`Missing next category heading: ${nextName}`);

  const section = lines.slice(start + 1, end);
  const moreIndex = section.indexOf("المزيد");
  const descriptionAr = section
    .slice(0, moreIndex < 0 ? 0 : moreIndex)
    .filter(Boolean)
    .join("\n");
  const ingredients = [...new Set(section
    .slice(moreIndex < 0 ? 0 : moreIndex + 1)
    .filter((line) => line && line !== "المزيد"))];

  parsed.push({ id, nameAr, nameEn, descriptionAr, ingredients });
  cursor = end;
}

const payload = {
  version: 1,
  locale: "ar",
  sourceType: "manager-provided-reference",
  categoryCount: parsed.length,
  ingredientCount: parsed.reduce((sum, category) => sum + category.ingredients.length, 0),
  categories: parsed
};

const runtime = `(function fragranceKnowledgeBootstrap(global) {
  "use strict";
  const database = ${JSON.stringify(payload, null, 2)};

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\\u0300-\\u036f]/g, "")
      .replace(/[^\\p{L}\\p{N}]+/gu, " ")
      .trim()
      .toLowerCase();
  }

  const index = new Map();
  database.categories.forEach((category) => {
    category.ingredients.forEach((ingredient) => {
      const key = normalize(ingredient);
      if (key && !index.has(key)) index.set(key, { ingredient, category });
    });
  });

  function findIngredient(value) {
    const key = normalize(value);
    if (!key) return null;
    if (index.has(key)) return index.get(key);
    return [...index.entries()]
      .find(([candidate]) => candidate.length > 3 && (candidate.includes(key) || key.includes(candidate)))?.[1] || null;
  }

  function search(query, limit = 16) {
    const key = normalize(query);
    if (!key) return [];
    return [...index.entries()]
      .filter(([candidate]) => candidate.includes(key))
      .slice(0, limit)
      .map(([, value]) => ({
        ingredient: value.ingredient,
        categoryId: value.category.id,
        categoryAr: value.category.nameAr,
        categoryEn: value.category.nameEn
      }));
  }

  function enrichProduct(product) {
    const notes = product?.notes || {};
    const noteValues = Object.values(notes).flat().filter(Boolean);
    const matches = noteValues.map(findIngredient).filter(Boolean);
    if (!matches.length) return { data: {}, matches: [], fields: [] };

    const counts = new Map();
    matches.forEach(({ category }) => counts.set(category.id, (counts.get(category.id) || 0) + 1));
    const dominant = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    const family = database.categories.find((category) => category.id === dominant);
    const arabicNotes = noteValues.filter((value) => /[\\u0600-\\u06ff]/.test(value));
    const englishNotes = noteValues.filter((value) => /[A-Za-z]/.test(value));
    const familiesAr = [...new Set(matches.map(({ category }) => category.nameAr))].slice(0, 3);
    const familiesEn = [...new Set(matches.map(({ category }) => category.nameEn))].slice(0, 3);
    const data = {};

    if (family) {
      data.familyAr = family.nameAr;
      data.familyEn = family.nameEn;
    }
    if (!product.descriptionAr && arabicNotes.length) {
      data.descriptionAr = \`تركيبة عطرية تجمع بين \${[...new Set(arabicNotes)].slice(0, 5).join("، ")}، ضمن طابع \${familiesAr.join(" و")}. راجع تفاصيل المنتج ومصادره قبل النشر.\`;
    }
    if (!product.descriptionEn && englishNotes.length) {
      data.descriptionEn = \`A fragrance composition built around \${[...new Set(englishNotes)].slice(0, 5).join(", ")}, with a \${familiesEn.join(" and ").toLowerCase()} character. Review the product sources before publishing.\`;
    }
    return {
      data,
      matches: matches.map(({ ingredient, category }) => ({
        ingredient,
        categoryId: category.id,
        categoryAr: category.nameAr,
        categoryEn: category.nameEn
      })),
      fields: Object.keys(data)
    };
  }

  global.ORIGOFragranceKnowledge = Object.freeze({
    database,
    findIngredient,
    search,
    enrichProduct
  });
})(window);
`;

await writeFile(resolve("fragrance-knowledge.js"), runtime, "utf8");
console.log(`Built fragrance-knowledge.js with ${payload.ingredientCount} ingredients in ${payload.categoryCount} categories.`);
