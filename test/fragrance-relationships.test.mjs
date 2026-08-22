import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const alternatives = await readFile(new URL("../alternatives.js", import.meta.url), "utf8");
const deferred = await readFile(new URL("../deferred-modules.js", import.meta.url), "utf8");

test("product editor provides two ordered bilingual relationship collections", () => {
  const editor = app.slice(app.indexOf("function fragranceRelationshipEditorCard"), app.indexOf("function collectProductRelationships"));
  for (const field of ["nameAr","nameEn","brandAr","brandEn","imageUrl","slug","similarityPercentage","reasonAr","reasonEn","sourceName","sourceUrl"]) assert.match(editor,new RegExp(field));
  assert.match(editor,/data-relationship-list="\$\{kind\}"/);
  assert.match(editor,/values\.length \? values : \[\{\}\]/);
  assert.match(editor,/إضافة علاقة أخرى/);
  assert.match(editor,/draggable="true"/);
  assert.match(app,/add-fragrance-relationship/);
  assert.match(app,/remove-fragrance-relationship/);
  assert.match(app,/move-fragrance-relationship/);
});

test("saved product model keeps inspired and similar relationships separate", () => {
  assert.match(app,/inspiration: \{ inspiredBy:inspiredByRelationships \}/);
  assert.match(app,/similarFragrances,/);
  assert.match(app,/imageUrl:value\("imageUrl"\)/);
  assert.doesNotMatch(app,/inspiration: \{ inspiredBy:similarFragrances \}/);
});

test("product detail hides empty groups and displays only explicit relationships", () => {
  const storefront = app.slice(app.indexOf("function resolveFragranceRelationship"), app.indexOf("let lastCommandFailure"));
  assert.match(storefront,/values\.length \?/);
  assert.match(storefront,/product\.inspiration\?\.inspiredBy/);
  assert.match(storefront,/product\.similarFragrances/);
  assert.match(storefront,/relation\.imageUrl/);
  assert.doesNotMatch(storefront,/perfumeResolvedAccords|productRelated/);
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
  assert.match(deferred,/alternatives\.js\?v=5/);
  assert.match(app,/managesLegacyAlternatives \? previousAlternativeMatches/);
});

test("relationship percentages use the existing Latin-digit formatter", () => {
  assert.match(app,/formatPercent\(relation\.similarityPercentage\)/);
  assert.match(alternatives,/number\(item\.similarity\)/);
});
