export async function loadProductCustomerReviews(productId, helpers) {
  const { api, lang, escapeHTML, formatNumber } = helpers;
  const holder = document.querySelector("#pdp-customer-reviews");
  if (!holder || holder.dataset.productId !== String(productId)) return;
  const ar = lang === "ar";
  try {
    const result = await api(`/api/products/${encodeURIComponent(productId)}/reviews`);
    if (!holder.isConnected || holder.dataset.productId !== String(productId)) return;
    const summary = result.summary || { count:0, average:0 };
    holder.innerHTML = `<header><div><span class="eyebrow">ORIGO COMMUNITY</span><h2>${ar ? "تقييمات العملاء" : "Customer reviews"}</h2><p>${ar ? "تجارب حقيقية من مشتريات موثقة" : "Real experiences from verified purchases"}</p></div>${summary.count ? `<strong><b>★ ${formatNumber(summary.average,{maximumFractionDigits:1})}</b><small>${formatNumber(summary.count)} ${ar ? "تقييم" : "reviews"}</small></strong>` : ""}</header>${result.reviews?.length ? `<div class="pdp-review-grid">${result.reviews.map(review => `<article><div><b>${escapeHTML(review.customerName)}</b><span>${"★".repeat(review.rating)}${"☆".repeat(5-review.rating)}</span></div><p>${escapeHTML(review.reviewText || (ar ? "تقييم دون تعليق مكتوب" : "Rating without a written comment"))}</p><small>${review.verifiedPurchase ? (ar ? "✓ شراء موثّق" : "✓ Verified purchase") : ""} · ${new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG",{year:"numeric",month:"short",day:"numeric"}).format(new Date(review.createdAt))}</small></article>`).join("")}</div>` : `<div class="pdp-reviews-empty"><b>${ar ? "كن أول من يقيّم هذا العطر" : "Be the first to review this fragrance"}</b><p>${ar ? "يصبح التقييم متاحًا في حسابك بعد استلام الطلب." : "Reviews become available in your account after delivery."}</p></div>`}`;
  } catch {
    holder.innerHTML = `<div class="pdp-reviews-empty"><p>${ar ? "تعذر تحميل التقييمات الآن." : "Reviews could not be loaded right now."}</p></div>`;
  }
}
