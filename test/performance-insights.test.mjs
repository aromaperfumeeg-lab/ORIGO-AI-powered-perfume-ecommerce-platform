import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.ORIGO_DB_PATH ||= join(tmpdir(), `origo-performance-${process.pid}-${Date.now()}.db`);

test("performance insights keep editorial, customers, verified purchases, and star reviews separate", async () => {
  const database = await import("../db.mjs");
  const commerce = await import("../commerce-service.mjs");
  const performance = await import("../performance-service.mjs");
  const suffix = `${process.pid}-${Date.now()}`;
  const product = database.listProducts()[0];
  assert.ok(product?.id);

  const owner = database.createUser({
    name: "Performance Owner",
    email: `performance-owner-${suffix}@origo.test`,
    passwordHash: "test-hash",
    role: "owner"
  });
  const customer = database.createUser({
    name: "Verified Customer",
    email: `performance-customer-${suffix}@origo.test`,
    passwordHash: "test-hash"
  });

  const initial = performance.productPerformance(product.id, customer.id);
  assert.equal(initial.counts.customers, 0);
  assert.equal(initial.counts.verifiedCustomers, 0);
  assert.equal(initial.mode, "editorial_only");

  const governorate = commerce.listDeliveryLocations()[0];
  const area = governorate.areas[0];
  commerce.replaceCommerceCart({ userId: customer.id }, [{ id: product.id, quantity: 1 }]);
  const created = commerce.createCommerceOrder({ userId: customer.id }, {
    firstName: "عميل",
    lastName: "موثق",
    phone: "01098765432",
    email: customer.email,
    governorateId: governorate.id,
    areaId: area.id,
    streetAddress: "١٢ شارع الاختبار القاهرة",
    paymentMethod: "cod"
  });
  for (const status of ["processing", "ready_to_ship", "shipped", "out_for_delivery", "delivered"]) {
    commerce.updateCommerceOrder(created.order.id, { status }, owner.id);
  }

  const admin = performance.productPerformanceAdmin(product.id, true);
  performance.saveProductPerformanceAdmin(product.id, {
    enabled: true,
    showOverallResult: true,
    visibleMetrics: Object.keys(performance.PERFORMANCE_OPTIONS),
    cardOrder: Object.keys(performance.PERFORMANCE_OPTIONS),
    weights: { editorial: 30, customers: 70 },
    minimumVerifiedVotes: 1,
    allowUnverified: false,
    editorial: admin.editorial,
    editorialDetails: { longevityMinHours: 6, longevityMaxHours: 8, reviewerName: "ORIGO" }
  }, { id: owner.id, allowImported: true });

  const beforeReviewCount = Number(database.db.prepare("SELECT COUNT(*) count FROM product_reviews WHERE product_id=?").get(product.id)?.count || 0);
  const submitted = performance.submitProductPerformanceVote(product.id, customer.id, {
    orderItemId: created.order.items[0].id,
    data: {
      scent: "loved",
      wear: ["winter", "night"],
      longevity: "long",
      sillage: "moderate",
      value: "good",
      gender: "unisex",
      experienceLevel: "several_times",
      comment: "أداء متوازن"
    }
  });
  assert.equal(submitted.vote.verifiedPurchase, true);
  assert.equal(submitted.aggregate.counts.customers, 1);
  assert.equal(submitted.aggregate.counts.verifiedCustomers, 1);
  assert.equal(submitted.aggregate.mode, "blended");
  assert.equal(Number(database.db.prepare("SELECT COUNT(*) count FROM product_reviews WHERE product_id=?").get(product.id)?.count || 0), beforeReviewCount);

  const updated = performance.submitProductPerformanceVote(product.id, customer.id, {
    orderItemId: created.order.items[0].id,
    data: { scent: "good", longevity: "very_long", sillage: "strong", value: "great", gender: "unisex", wear: ["day", "night"] }
  });
  assert.equal(updated.aggregate.counts.customers, 1, "one active performance vote is kept per customer and product");
  const partial = performance.submitProductPerformanceVote(product.id, customer.id, {
    orderItemId: created.order.items[0].id,
    data: { scent: "acceptable" }
  });
  assert.equal(partial.vote.data.scent, "acceptable");
  assert.equal(partial.vote.data.longevity, "very_long", "one-tap updates merge without deleting other metric answers");
  assert.deepEqual(partial.vote.data.wear, ["day", "night"]);
  assert.equal(partial.aggregate.counts.customers, 1, "editing a metric never creates a second participant");

  const unverified = database.createUser({
    name: "Unverified Customer",
    email: `performance-unverified-${suffix}@origo.test`,
    passwordHash: "test-hash"
  });
  assert.throws(
    () => performance.submitProductPerformanceVote(product.id, unverified.id, { data: { scent: "good" } }),
    (error) => error.code === "PERFORMANCE_PURCHASE_REQUIRED"
  );

  assert.throws(
    () => performance.saveProductPerformanceAdmin(product.id, {
      editorial: { ...admin.editorial, gender: { women: 20, unisex: 20, men: 20 } },
      weights: { editorial: 30, customers: 70 }
    }, { id: owner.id }),
    (error) => error.code === "INVALID_PERFORMANCE_DISTRIBUTION"
  );

  const voteId = partial.vote.id;
  assert.throws(
    () => performance.setProductPerformanceVoteStatus(voteId, "hidden", owner.id, ""),
    (error) => error.code === "PERFORMANCE_HIDE_REASON_REQUIRED"
  );
  assert.equal(performance.productPerformance(product.id, customer.id).currentVote.id, voteId, "failed moderation must not mutate the vote");
  performance.setProductPerformanceVoteStatus(voteId, "hidden", owner.id, "اختبار الإشراف");
  assert.equal(performance.productPerformance(product.id, customer.id).currentVote, null);
  performance.setProductPerformanceVoteStatus(voteId, "active", owner.id);
  assert.equal(performance.productPerformance(product.id, customer.id).currentVote.id, voteId);
});

test("performance insight UI exposes six direct one-tap metrics, verified sources, and no fabricated customer values", async () => {
  const { readFile } = await import("node:fs/promises");
  const [script, styles] = await Promise.all([
    readFile(new URL("../performance-insights.js", import.meta.url), "utf8"),
    readFile(new URL("../performance-insights.css", import.meta.url), "utf8")
  ]);
  for (const metric of ["scent", "wear", "longevity", "sillage", "gender", "value"]) assert.match(script, new RegExp(`\\b${metric}\\b`));
  assert.match(script, /data-performance-action=\"choose\"/);
  assert.match(script, /aria-checked/);
  assert.match(script, /performance-save-state/);
  assert.doesNotMatch(script, /openVote|performance-vote-form/);
  assert.match(styles, /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(styles, /performance-choice\.is-selected/);
  assert.doesNotMatch(script, /11,?710|11710|92%/);
});
