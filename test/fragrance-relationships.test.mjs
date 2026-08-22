import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const alternatives = await readFile(new URL("../alternatives.js", import.meta.url), "utf8");
const deferred = await readFile(new URL("../deferred-modules.js", import.meta.url), "utf8");

test("product editor separates official inspiration from unofficial closest matches", () => {
  const editor = app.slice(app.indexOf("function fragranceRelationshipEditorCard"), app.indexOf("function collectProductRelationships"));
  for (const field of ["nameAr","nameEn","brandAr","brandEn","imageUrl","slug","similarityPercentage","reasonAr","reasonEn","sourceName","sourceUrl"]) assert.match(editor,new RegExp(field));
  assert.match(editor,/data-relationship-list="\$\{kind\}"/);
  assert.match(editor,/values\.length \? values : \[\{\}\]/);
  assert.match(editor,/إضافة علاقة أخرى/);
  assert.match(editor,/data-relation-image-upload/);
  assert.match(app,/function handleRelationshipImageUpload\(input\)/);
  assert.match(app,/folder:"relationship"/);
  assert.match(editor,/list\("inspiredBy",inspired/);
  assert.match(editor,/list\("closestMatches",closest/);
  assert.doesNotMatch(editor,/list\("similarFragrances"/);
  for (const field of ["notesSimilarity","accordsSimilarity","characterSimilarity","communitySimilarity","sourcesText"]) assert.match(editor,new RegExp(field));
  assert.match(editor,/تقديرية وليست تصريحًا رسميًا/);
  assert.match(editor,/draggable="true"/);
  assert.match(app,/add-fragrance-relationship/);
  assert.match(app,/remove-fragrance-relationship/);
  assert.match(app,/move-fragrance-relationship/);
});

test("saved product model edits inspired-by and preserves legacy similar data without exposing it", () => {
  assert.match(app,/inspiration: \{ inspiredBy:inspiredByRelationships, closestMatches:closestMatchRelationships \}/);
  assert.match(app,/similarFragrances: base\.similarFragrances \|\| \[\]/);
  assert.match(app,/imageUrl:value\("imageUrl"\)/);
  assert.doesNotMatch(app,/inspiration: \{ inspiredBy:similarFragrances \}/);
});

test("product detail displays official inspiration and clearly labelled estimated closest matches", () => {
  const storefront = app.slice(app.indexOf("function resolveFragranceRelationship"), app.indexOf("let lastCommandFailure"));
  assert.match(storefront,/if \(!values\.length\) return ""/);
  assert.match(storefront,/product\.inspiration\?\.inspiredBy/);
  assert.match(storefront,/product\.inspiration\?\.closestMatches/);
  assert.match(storefront,/تقدير تحليلي غير رسمي من الشركة/);
  assert.match(storefront,/relationship-evidence/);
  assert.match(storefront,/relationship-sources/);
  assert.match(storefront,/relationship-alternatives-link/);
  assert.match(storefront,/\/alternatives\?q=/);
  for (const field of ["notesSimilarity","accordsSimilarity","characterSimilarity","communitySimilarity"]) assert.match(storefront,new RegExp(field));
  assert.doesNotMatch(storefront,/product\.similarFragrances/);
  assert.match(storefront,/relation\.imageUrl/);
  assert.doesNotMatch(storefront,/perfumeResolvedAccords|productRelated/);
});

test("similar-scent products require complete data and a meaningful note-and-accord score", () => {
  const matcher = app.slice(app.indexOf("function fragranceMatchData"), app.indexOf("function rememberProduct"));
  assert.match(matcher,/\["top","heart","base"\]/);
  assert.match(matcher,/product\.accordProfile/);
  assert.match(matcher,/noteLayers\.every\(\(layer\) => layer\.length\)/);
  assert.match(matcher,/sharedNotes/);
  assert.match(matcher,/sharedAccords/);
  assert.match(matcher,/score != null && score >= 65/);
  assert.match(matcher,/sort\(\(a,b\) => b\.score-a\.score/);
  assert.match(app,/عطور قريبة في الرائحة/);
});

test("internal slug resolution requires an exact published product", () => {
  const resolver = app.slice(app.indexOf("function resolveFragranceRelationship"), app.indexOf("function fragranceRelationshipCard"));
  assert.match(resolver,/product\.status === "published"/);
  assert.match(resolver,/product\.slug/);
  assert.match(app,/data-action="open-product"/);
});

test("external references display only an explicitly saved image and never invent price or percentage", () => {
  const card = app.slice(app.indexOf("function fragranceRelationshipCard"), app.indexOf("function productFragranceRelationshipsMarkup"));
  assert.match(card,/similarityPercentage == null \? ""/);
  assert.match(card,/relation\.imageUrl/);
  assert.match(card,/is-external/);
  assert.doesNotMatch(card,/PRODUCT_IMAGE_PLACEHOLDER|price|href=/);
});

test("alternatives panel prioritizes canonical groups then calculated alternatives", () => {
  const panel = alternatives.slice(alternatives.indexOf("function productPanel"), alternatives.indexOf("function setRoute"));
  assert.match(panel,/canonicalRelationships/);
  assert.match(panel,/calculatedAlternatives/);
  assert.match(panel,/return `\$\{canonicalRelationships\}\$\{calculatedAlternatives\}`/);
  assert.match(deferred,/alternatives\.js\?v=6/);
  assert.match(panel,/closestKeys/);
  assert.match(app,/managesLegacyAlternatives \? previousAlternativeMatches/);
});

test("relationship percentages use the existing Latin-digit formatter", () => {
  assert.match(app,/formatPercent\(relation\.similarityPercentage\)/);
  assert.match(alternatives,/number\(item\.similarity\)/);
});
