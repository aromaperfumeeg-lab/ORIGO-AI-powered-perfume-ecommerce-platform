import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../catalog-providers.js", import.meta.url), "utf8");
const window = { location:{ protocol:"http:" } };
vm.runInNewContext(source, { window, fetch, URL, AbortController, console });
const search = window.ORIGOCatalog;

test("Arabic search ignores hamza, diacritics, tatweel, and letter variants", () => {
  assert.equal(search.normalize("أَسَــد"), search.normalize("اسد"));
  assert.equal(search.normalize("هدى"), search.normalize("هدي"));
  assert.equal(search.normalize("رائحة"), search.normalize("رايحه"));
});

test("search corrects a mismatched Arabic or English keyboard layout", () => {
  assert.ok(search.searchVariants("hs]").includes(search.normalize("اسد")));
  assert.ok(search.searchVariants("شسشي").includes("asad"));
  assert.ok(search.searchScore("hs]", ["أسد", "Asad"]) > 0);
  assert.ok(search.searchScore("شسشي", ["Asad"]) > 0);
});

test("search tolerates small misspellings and matches multi-word terms in any order", () => {
  assert.ok(search.searchScore("asd", ["Asad"]) > 0);
  assert.ok(search.searchScore("greatness oud", ["Oud for Greatness"]) > 0);
  assert.equal(search.searchScore("completely unrelated", ["Asad"]), 0);
});
