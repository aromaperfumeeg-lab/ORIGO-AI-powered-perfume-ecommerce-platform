import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.ORIGO_DB_PATH = join(tmpdir(), `origo-commerce-${process.pid}-${Date.now()}.db`);

function commerceFixtureProduct(database) {
  const existing = database.listProducts()[0];
  if (existing) return existing;
  return database.upsertProduct({ id:"commerce-fixture", sku:"TEST-ORDER-1", brand:"ORIGO", nameAr:"عطر اختبار الطلبات", nameEn:"Order test perfume", category:"perfume", price:1000, status:"published", inventory:{ quantity:20, reserved:0, tracked:true } });
}

test("guest checkout, status history, feedback, complaint and analytics share real order data", async () => {
  const service = await import("../commerce-service.mjs");
  const database = await import("../db.mjs");
  const product = commerceFixtureProduct(database);
  const owner = { guestToken: "checkout-test-guest" };
  service.replaceCommerceCart(owner, [{ id: product.id, quantity: 1 }]);
  const governorate = service.listDeliveryLocations()[0];
  const area = governorate.areas[0];
  const quote = service.quoteCheckout(owner, {
    governorateId: governorate.id,
    areaId: area.id,
    couponCode: "ORIGO10"
  });
  assert.equal(quote.items.length, 1);
  assert.ok(quote.total > 0);
  assert.equal(quote.couponCode, "ORIGO10");

  const created = service.createCommerceOrder(owner, {
    firstName: "أحمد",
    lastName: "محمد",
    phone: "01012345678",
    email: "guest@example.com",
    governorateId: governorate.id,
    areaId: area.id,
    streetAddress: "١٢ شارع النصر مدينة نصر القاهرة",
    paymentMethod: "cod",
    couponCode: "ORIGO10"
  });
  assert.equal(created.order.status, "received");
  assert.ok(created.accessToken);
  assert.equal(service.getCommerceCart(owner).length, 0);
  assert.equal(service.getCommerceOrder(created.order.orderNumber, { token: created.accessToken }).id, created.order.id);

  for (const status of ["processing", "ready_to_ship", "shipped", "out_for_delivery", "delivered"]) {
    assert.equal(service.updateCommerceOrder(created.order.id, { status }, 1).order.status, status);
  }
  const request = service.feedbackRequestForOrder(created.order.orderNumber, { token: created.accessToken });
  assert.ok(request.token);
  const result = service.submitFeedback(request.token, {
    overallScore: 4,
    aspectScores: {
      productQuality: 5,
      websiteUsability: 4,
      deliverySpeed: 4,
      packaging: 5,
      customerService: 4,
      pricingClarity: 4,
      paymentExperience: 4
    },
    liked: ["product_quality", "delivery"],
    problemState: "unresolved",
    problemCategory: "delivery",
    problemDescription: "تأخر المندوب",
    suggestions: "تحسين تحديثات الشحنة",
    productReviews: [{ orderItemId: created.order.items[0].id, rating: 5, text: "ممتاز" }]
  });
  assert.equal(result.supportCase.status, "open");
  const analytics = service.feedbackAnalytics(90);
  assert.equal(analytics.responseCount, 1);
  assert.equal(analytics.averageOverall, 4);
  assert.equal(analytics.metrics.productQuality, 100);
  assert.equal(analytics.publishable, false);

  const account = service.accountDashboard(created.order.userId);
  assert.equal(account.stats.totalOrders, 1);
  assert.equal(account.stats.inShipping, 0);
  assert.equal(account.stats.delivered, 1);
  assert.equal(account.loyalty.balance, created.order.loyaltyPoints);
  assert.equal(account.recentOrders[0].orderNumber, created.order.orderNumber);
  assert.ok(account.loyalty.currentTier);
  assert.equal(service.checkoutSettings().freeShippingThreshold, 3000);

  const wishlist = service.syncWishlist(created.order.userId, [product.id]);
  assert.equal(wishlist.count, 1);
  assert.equal(service.accountDashboard(created.order.userId).stats.wishlistCount, 1);

  const updatedProfile = service.updateCustomerProfile(created.order.userId, {
    name: "أحمد محمد",
    phone: "01098765432"
  });
  assert.equal(updatedProfile.name, "أحمد محمد");
  assert.equal(updatedProfile.phone, "01098765432");

  const readDashboard = service.markNotificationsRead(created.order.userId);
  assert.equal(readDashboard.stats.notificationsUnread, 0);

  const finderSession = service.saveFragranceFinderSession(created.order.userId, {
    session: {
      version: 2,
      started: true,
      currentStep: 4,
      answers: { forWhom: "unisex", feelings: ["woodyDeep"] },
      updatedAt: new Date().toISOString()
    }
  });
  assert.equal(finderSession.currentStep, 4);
  assert.equal(service.getFragranceFinderSession(created.order.userId).answers.forWhom, "unisex");
});

test("order center supports manual drafts, search, audit, notes, notifications and safe inventory release", async () => {
  const service = await import("../commerce-service.mjs");
  const database = await import("../db.mjs");
  const product = commerceFixtureProduct(database);
  const before = database.getPublishedProduct(product.id).inventory.quantity;
  const draft = service.createManualOrder({ draft:true, orderSource:"phone", customerName:"عميل هاتفي", phone:"01012345678", items:[{ productId:product.id, quantity:2 }] }, 1);
  assert.equal(draft.status, "draft");
  assert.equal(draft.inventoryState, "none");
  assert.equal(database.getPublishedProduct(product.id).inventory.quantity, before);

  const order = service.createManualOrder({ orderSource:"whatsapp", priority:"urgent", customerName:"عميل واتساب", phone:"01112345678", address:"القاهرة، شارع الاختبار", items:[{ productId:product.id, quantity:1 }] }, 1);
  assert.equal(order.status, "confirmed");
  assert.equal(order.orderSource, "whatsapp");
  assert.equal(database.getPublishedProduct(product.id).inventory.quantity, before - 1);
  const found = service.listManagedOrders({ q:"واتساب", source:"whatsapp", pageSize:10 });
  assert.equal(found.orders.some((item) => item.id === order.id), true);
  assert.ok(found.summary.pendingCollectionTotal >= order.total);
  assert.ok(service.adminOrderNotifications().unread >= 1);
  assert.equal(service.markOrderViewed(order.id, 1).firstViewedBy, 1);
  assert.equal(service.addOrderNote(order.id, { note:"اتصل قبل الشحن", type:"internal" }, 1).orderNotes[0].note, "اتصل قبل الشحن");
  const cancelled = service.updateCommerceOrder(order.id, { status:"cancelled", rowVersion:service.markOrderViewed(order.id,1).rowVersion }, 1).order;
  assert.equal(cancelled.inventoryState, "released");
  assert.equal(database.getPublishedProduct(product.id).inventory.quantity, before);
  assert.ok(cancelled.audit.length >= 1);
  assert.equal(service.archiveManagedOrder(order.id, "archive", 1).archivedAt != null, true);
  assert.equal(service.archiveManagedOrder(order.id, "restore", 1).archivedAt, null);
  assert.equal(service.archiveManagedOrder(order.id, "trash", 1, "اختبار").deletedAt != null, true);
});
