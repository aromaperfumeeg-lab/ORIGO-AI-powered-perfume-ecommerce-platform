import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const context = vm.createContext({ window: {} });
const knowledgeSource = await readFile(new URL("../fragrance-knowledge.js", import.meta.url), "utf8");
const librarySource = await readFile(new URL("../fragrance-notes-library.js", import.meta.url), "utf8");
vm.runInContext(knowledgeSource, context);
vm.runInContext(librarySource, context);

const library = context.window.ORIGOFragranceNotes;

test("builds the complete manager-provided fragrance library", () => {
  assert.ok(library.families.length >= 13);
  assert.ok(library.notes.length >= 1_871);
  assert.equal(library.familyById("flowers").nameEn, "Flowers");
});

test("resolves Arabic, English, and alias spellings to one note", () => {
  const slugs = ["Oud", "Oudh", "Agarwood", "عود"].map((value) => library.find(value)?.slug);
  assert.deepEqual([...new Set(slugs)], ["oud"]);
  assert.equal(library.find("ورد")?.slug, "rose");
  assert.equal(library.find("Taif Rose")?.slug, "rose");
});

test("provides bilingual data, family metadata, and automatic artwork", () => {
  const rose = library.find("Rose");
  assert.equal(rose.nameAr, "ورد");
  assert.equal(rose.nameEn, "Rose");
  assert.equal(rose.familyId, "flowers");
  assert.equal(rose.position, "heart");
  assert.match(library.artwork(rose), /^data:image\/svg\+xml/);
});

test("enriches English-only product notes without adding preview text to the review queue", () => {
  const before = library.unclassified.length;
  const result = library.enrichProduct({
    notes: {
      topAr: [], topEn: ["Rose", "Bergamot"],
      heartAr: [], heartEn: ["Jasmine", "Iris"],
      baseAr: [], baseEn: ["Oud", "Musk", "Vanilla"]
    }
  }, { registerUnknowns: false });

  assert.deepEqual(Array.from(result.notes.topAr), ["ورد", "برغموت"]);
  assert.deepEqual(Array.from(result.notes.heartAr), ["ياسمين", "سوسن"]);
  assert.deepEqual(Array.from(result.notes.baseAr), ["عود", "مسك", "فانيليا"]);
  assert.equal(result.matches.length, 7);
  assert.equal(result.unknown.length, 0);
  assert.equal(library.unclassified.length, before);
});

test("tracks unknown notes and allows later classification", () => {
  const originalState = library.getState();
  const result = library.enrichProduct({
    notes: {
      topAr: [], topEn: ["ORIGO Test Accord"],
      heartAr: [], heartEn: [],
      baseAr: [], baseEn: []
    }
  });
  assert.equal(result.unknown.length, 1);
  assert.ok(library.unclassified.some((item) => item.name === "ORIGO Test Accord"));

  const custom = library.upsertNote({
    slug: "origo-test-accord",
    nameAr: "أكورد أوريجو التجريبي",
    nameEn: "ORIGO Test Accord",
    aliases: ["Test Accord"],
    familyId: "natural-synthetic-unusual",
    position: "top"
  });
  assert.equal(custom.slug, "origo-test-accord");
  assert.equal(library.find("Test Accord").slug, "origo-test-accord");
  assert.ok(!library.unclassified.some((item) => item.name === "ORIGO Test Accord"));
  library.setState(originalState);
});
