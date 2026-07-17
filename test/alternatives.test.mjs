import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.ORIGO_DB_PATH = join(tmpdir(), `origo-alternatives-${process.pid}-${Date.now()}.db`);

test("alternatives data separates reference perfumes from purchasable ORIGO products", async () => {
  const database = await import("../db.mjs");
  const payload = database.alternativesPayload();
  assert.ok(payload.items.length >= 4);
  for (const item of payload.items) {
    assert.notEqual(item.reference.id, item.product.id);
    assert.ok(item.reference.slug);
    assert.ok(item.product.id);
    assert.equal(item.product.status, "published");
    assert.ok(item.similarity >= 0 && item.similarity <= 100);
    assert.ok(item.confidence >= 0 && item.confidence <= 100);
  }
  assert.equal(database.getAlternative(payload.items[0].reference.slug).product.id, payload.items[0].product.id);
});

test("similarity calculator weights scent properties and stays within safe limits", async () => {
  const database = await import("../db.mjs");
  const score = database.calculateAlternativeScore(
    { concentration: "EDP", familyAr: "خشبي", notes: { topAr: ["برغموت"], heartAr: ["ورد"], baseAr: ["عود"] } },
    { concentration: "EDP", familyAr: "خشبي", notesAr: ["برغموت", "ورد", "عود"] }
  );
  assert.ok(score.similarity >= 90);
  assert.ok(score.similarity <= 98);
  assert.deepEqual(score.shared.sort(), ["برغموت", "عود", "ورد"].sort());
});

test("public alternatives UI never offers the reference fragrance for purchase", async () => {
  const [script, html, server] = await Promise.all([
    readFile(new URL("../alternatives.js", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../server.mjs", import.meta.url), "utf8")
  ]);
  assert.match(script, /referenceNotice/);
  assert.match(script, /data-alt="add" data-product="\$\{esc\(item\.product\.id\)\}/);
  assert.doesNotMatch(script, /data-alt="add" data-product="\$\{esc\(item\.reference\.id\)\}/);
  assert.match(script, /data-alt="product"/);
  assert.match(html, /id="home-alternative-search"/);
  assert.match(html, /href="\/alternatives"/);
  assert.match(server, /\/api\/admin\/alternatives/);
  assert.match(script, /\/alternatives\/compare/);
});

test("alternative events and homepage settings are managed by the shared backend", async () => {
  const database = await import("../db.mjs");
  database.recordAlternativeEvent({ eventType: "search", query: "Aventus", resultsCount: 1 });
  const before = database.getHomepageAlternativesSettings();
  const updated = database.saveAlternativesAdmin({ settings: { ...before, count: 3, enabled: true } });
  assert.equal(updated.settings.count, 3);
  assert.ok(updated.analytics.topSearches.some((item) => item.query === "Aventus"));
  database.saveAlternativesAdmin({ settings: before });
});

test("admin can create a reference and link it to live catalog inventory without duplicating commerce data", async () => {
  const database = await import("../db.mjs");
  const product = database.listProducts()[0];
  const result = database.saveAlternativesAdmin({
    reference: {
      id: "test-reference", slug: "test-reference", nameAr: "عطر مرجعي تجريبي", nameEn: "Test Reference",
      brand: "Reference Brand", image: "/assets/references/ombre-leather.svg", concentration: product.concentration,
      referencePrice: 9000, familyAr: product.familyAr, familyEn: product.familyEn,
      notes: { topAr: product.notesAr, topEn: product.notesEn }
    },
    link: { productId: product.id, similarity: null, confidence: null, reasonAr: "تقارب واضح", reasonEn: "Clear similarity" }
  });
  const match = result.items.find((item) => item.reference.id === "test-reference");
  assert.ok(match);
  assert.equal(match.product.id, product.id);
  assert.equal(match.product.price, product.price);
  assert.ok(match.similarity >= 55 && match.similarity <= 98);
});
