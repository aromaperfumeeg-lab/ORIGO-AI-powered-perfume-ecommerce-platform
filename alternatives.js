(() => {
  const page = document.querySelector("#alternatives-page");
  const root = document.querySelector("#alternatives-root");
  if (!page || !root) return;

  const copy = {
    ar: {
      alternatives: "البدائل", eyebrow: "اختيار ذكي · قيمة أفضل", title: "اكتشف بدائل عطورك المفضلة",
      intro: "بدائل منتقاة بطابع قريب من عطور عالمية معروفة، مع مقارنة واضحة للرائحة والأداء والسعر",
      browse: "تصفح البدائل", how: "كيف تتم المقارنة؟", searchLabel: "عن أي عطر تبحث؟",
      searchHint: "ابحث باسم العطر الأصلي أو البديل أو العلامة التجارية…", reference: "العطر الأصلي",
      referenceOnly: "مرجع فقط", referenceNotice: "مرجع للمقارنة فقط — غير متاح للبيع على ORIGO",
      availableAlternative: "بديل متوفر", luxuryAlternative: "بديل فاخر", similarity: "تشابه",
      confidence: "درجة الثقة", comparison: "عرض المقارنة", product: "عرض المنتج", add: "أضف للسلة",
      favorite: "المفضلة", savings: "توفير", available: "متوفر", unavailable: "غير متوفر",
      all: "الكل", popular: "الأكثر طلبًا", highestMatch: "الأعلى تشابهًا", bestSaving: "الأكثر توفيرًا",
      men: "رجالية", women: "نسائية", unisex: "يونيسكس", summer: "مناسب للصيف", winter: "مناسب للشتاء",
      strongLongevity: "ثبات قوي", strongProjection: "فوحان قوي", filters: "الفلاتر", sort: "الترتيب",
      recommended: "موصى به", priceLow: "السعر من الأقل", priceHigh: "السعر من الأعلى", results: "بديل",
      noResults: "لم نجد بديلًا مطابقًا لبحثك", noResultsBody: "جرّب اسم العلامة أو العطر بالإنجليزية، أو امسح الفلاتر.",
      clear: "مسح الفلاتر", retry: "إعادة المحاولة", error: "تعذر تحميل قسم البدائل.",
      worthTrying: "بدائل تستحق التجربة", worthSub: "عطور متوفرة بطابع قريب من أشهر العطور العالمية",
      viewAll: "عرض جميع البدائل", promoTitle: "تحب عطرًا عالميًا؟ اكتشف بديله بسعر أفضل",
      promoBody: "اكتشف بدائل مختارة بعناية، بطابع قريب وأداء مميز وتوفير أكبر", explore: "استكشف البدائل",
      compareTitle: "مقارنة البديل المقترح", compareSub: "مقارنة واضحة بين العطر المرجعي والبديل المتوفر",
      suggested: "البديل المقترح", highMatch: "تشابه مرتفع", reason: "سبب الترشيح",
      performance: "مقارنة الأداء بسرعة", longevity: "الثبات", projection: "الفوحان", fullComparison: "المقارنة الكاملة",
      family: "العائلة العطرية", topNotes: "النوتات العليا", heartNotes: "النوتات الوسطى", baseNotes: "النوتات الأساسية",
      character: "الطابع العام", sweetness: "الحلاوة", freshness: "الانتعاش", warmth: "الدفء", woods: "الخشبية",
      spice: "التوابل", concentration: "التركيز", season: "الموسم", occasion: "المناسبة", rating: "تقييم العملاء",
      price: "السعر", inspiredTitle: "هذا البديل مستوحى من هذا العطر الأصلي", commonNotes: "النوتات المشتركة",
      priceDifference: "فرق السعر", suitableSeason: "الموسم المناسب", similarities: "أوجه التشابه",
      differences: "أوجه الاختلاف", scentJourney: "تطور الرائحة", opening: "الافتتاحية", heart: "قلب العطر",
      base: "القاعدة بعد الاستقرار", disclaimer: "نسبة التشابه تقديرية مبنية على الخصائص العطرية والأداء، وقد يختلف إدراك الرائحة من شخص إلى آخر.",
      loading: "نجهز لك أفضل المقارنات…", prev: "السابق", next: "التالي", productsFound: "النتائج المتاحة",
      whyAlternative: "بدائل ذكية موثوقة", originalPrice: "السعر المرجعي", alternativePrice: "سعر البديل",
      returnAlternatives: "العودة إلى البدائل", similarSearch: "نتائج مقترحة", quickLinks: "تصفح سريع"
    },
    en: {
      alternatives: "Alternatives", eyebrow: "SMART CHOICE · BETTER VALUE", title: "Discover Alternatives to Your Favorite Fragrances",
      intro: "Curated alternatives inspired by renowned fragrances, with a clear comparison of scent, performance and price",
      browse: "Browse alternatives", how: "How comparison works", searchLabel: "Which fragrance are you looking for?",
      searchHint: "Search by reference fragrance, alternative or brand…", reference: "Reference fragrance",
      referenceOnly: "Reference only", referenceNotice: "For comparison only — not available for sale on ORIGO",
      availableAlternative: "Available alternative", luxuryAlternative: "Luxury alternative", similarity: "Similarity",
      confidence: "Confidence", comparison: "View comparison", product: "View product", add: "Add to cart",
      favorite: "Wishlist", savings: "Save", available: "In stock", unavailable: "Unavailable",
      all: "All", popular: "Most popular", highestMatch: "Highest match", bestSaving: "Best savings",
      men: "Men", women: "Women", unisex: "Unisex", summer: "Summer", winter: "Winter",
      strongLongevity: "Strong longevity", strongProjection: "Strong projection", filters: "Filters", sort: "Sort",
      recommended: "Recommended", priceLow: "Price: low to high", priceHigh: "Price: high to low", results: "alternatives",
      noResults: "No alternatives matched your search", noResultsBody: "Try the fragrance or brand name in English, or clear the filters.",
      clear: "Clear filters", retry: "Try again", error: "Alternatives could not be loaded.",
      worthTrying: "Alternatives Worth Trying", worthSub: "Available fragrances inspired by renowned scents",
      viewAll: "View all alternatives", promoTitle: "Love an iconic fragrance? Discover a better-value alternative",
      promoBody: "Explore carefully selected alternatives with a familiar character, excellent performance and better value", explore: "Explore alternatives",
      compareTitle: "Recommended Alternative Comparison", compareSub: "A clear comparison between the reference fragrance and the available alternative",
      suggested: "Suggested alternative", highMatch: "High similarity", reason: "Why we recommend it",
      performance: "Quick performance comparison", longevity: "Longevity", projection: "Projection", fullComparison: "Full comparison",
      family: "Fragrance family", topNotes: "Top notes", heartNotes: "Heart notes", baseNotes: "Base notes",
      character: "Overall character", sweetness: "Sweetness", freshness: "Freshness", warmth: "Warmth", woods: "Woodiness",
      spice: "Spice", concentration: "Concentration", season: "Season", occasion: "Occasion", rating: "Customer rating",
      price: "Price", inspiredTitle: "This alternative is inspired by this reference fragrance", commonNotes: "Shared notes",
      priceDifference: "Price difference", suitableSeason: "Best season", similarities: "Similarities",
      differences: "Differences", scentJourney: "Scent development", opening: "Opening", heart: "Heart",
      base: "Dry-down", disclaimer: "Similarity is an estimate based on fragrance characteristics and performance. Scent perception may vary from person to person.",
      loading: "Preparing the best comparisons…", prev: "Previous", next: "Next", productsFound: "Available results",
      whyAlternative: "Trusted smart alternatives", originalPrice: "Reference price", alternativePrice: "Alternative price",
      returnAlternatives: "Back to alternatives", similarSearch: "Suggested results", quickLinks: "Quick browse"
    }
  };

  const model = { payload: null, loading: null, query: "", sort: "recommended", quick: "all", minMatch: 0, drawer: false };
  const mobileFilterMedia = matchMedia("(max-width: 800px)");
  const store = () => window.ORIGOStore;
  const lang = () => store()?.state?.lang === "en" ? "en" : "ar";
  const t = (key) => copy[lang()][key] || key;
  const esc = (value) => store()?.escapeHTML?.(String(value ?? "")) || String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (value) => store()?.formatPrice?.(Number(value || 0)) || `${Number(value || 0).toLocaleString(lang() === "ar" ? "ar-EG" : "en-EG")} ${lang() === "ar" ? "ج.م" : "EGP"}`;
  const label = (item, key) => lang() === "ar" ? item?.[`${key}Ar`] || item?.[`${key}En`] : item?.[`${key}En`] || item?.[`${key}Ar`];
  const go = (path) => { if (location.pathname !== path) history.pushState({ alternatives: true }, "", path); route(); };
  const postEvent = (item, eventType) => store()?.api?.("/api/alternatives/events", { method: "POST", body: JSON.stringify({ referenceId: item?.reference?.id, productId: item?.product?.id, eventType, sessionKey: sessionStorage.getItem("origoAltSession") || "" }) }).catch(() => {});

  function savings(item) { return Math.max(0, Number(item.reference.referencePrice || 0) - Number(item.product.price || 0)); }
  function available(item) { return item.product.status === "published" && Number(item.product.inventory?.available ?? item.product.inventory?.quantity ?? 1) > 0; }
  function notes(item, side = "shared") {
    if (side === "shared") return lang() === "ar" ? item.sharedNotesAr : item.sharedNotesEn;
    const block = item.reference.notes || {};
    return block[`${side}${lang() === "ar" ? "Ar" : "En"}`] || [];
  }
  function similarityRing(item, small = false) {
    return `<div class="alt-similarity${small ? " small" : ""}" style="--match:${item.similarity * 3.6}deg"><div><b>${item.similarity}%</b><span>${t("similarity")}</span></div></div>`;
  }
  function stars(item) {
    const average = Number(item.product.reviewSummary?.average || 4.7);
    const count = Number(item.product.reviewSummary?.count || 0);
    return `<span class="alt-stars" aria-label="${average} / 5"><b>★ ${average.toFixed(1)}</b><i>★★★★★</i>${count ? `<small>(${count.toLocaleString()})</small>` : ""}</span>`;
  }
  function actionButtons(item, compact = false) {
    return `<div class="alt-actions${compact ? " compact" : ""}">
      <button class="alt-primary" data-alt="add" data-product="${esc(item.product.id)}" data-reference="${esc(item.reference.id)}"${available(item) ? "" : " disabled"}>♧ ${available(item) ? t("add") : t("unavailable")}</button>
      <button class="alt-icon" data-alt="wishlist" data-product="${esc(item.product.id)}" data-reference="${esc(item.reference.id)}" aria-label="${t("favorite")}">♡</button>
      <button class="alt-secondary alt-product-link" data-alt="product" data-product="${esc(item.product.id)}" data-reference="${esc(item.reference.id)}">${t("product")} ◇</button>
      <button class="alt-secondary" data-alt="compare" data-slug="${esc(item.reference.slug)}">${t("comparison")} ◉</button>
    </div>`;
  }

  function homeCard(item) {
    return `<article class="home-alt-card" data-reference="${esc(item.reference.id)}">
      <div class="home-alt-reference"><span>${t("reference")}</span><img src="${esc(item.reference.image)}" alt="${esc(label(item.reference, "name"))}" loading="lazy"/><b>${esc(label(item.reference, "name"))}</b><small>${esc(item.reference.brand)}</small><em>${t("referenceOnly")}</em></div>
      <div class="home-alt-match">${similarityRing(item, true)}<span aria-hidden="true">⇄</span></div>
      <div class="home-alt-product"><span>${t("availableAlternative")}</span><img src="${esc(item.product.image)}" alt="${esc(label(item.product, "name"))}" loading="lazy"/><b>${esc(label(item.product, "name"))}</b><small>${esc(item.product.brand)}</small><div>${stars(item)}<strong>${money(item.product.price)}</strong></div></div>
      ${actionButtons(item, true)}
    </article>`;
  }

  function renderHome() {
    const promo = document.querySelector("#home-alternatives-promo");
    const section = document.querySelector("#home-alternatives-section");
    if (!promo || !section || !model.payload) return;
    const settings = model.payload.settings || {};
    const now = Date.now(), scheduled = (!settings.startsAt || new Date(settings.startsAt).getTime() <= now) && (!settings.endsAt || new Date(settings.endsAt).getTime() >= now);
    const items = model.payload.items.filter((item) => !settings.featuredProductIds?.length || settings.featuredProductIds.includes(item.product.id)).slice(0, Number(settings.count || 4));
    if (!settings.enabled || !scheduled || !items.length) { promo.hidden = true; section.hidden = true; return; }
    const lead = items[0];
    promo.hidden = !settings.bannerEnabled;
    promo.innerHTML = settings.bannerEnabled ? `<div class="alt-promo-copy"><small>${t("eyebrow")}</small><h2>${esc(lang() === "ar" ? settings.bannerTitleAr || t("promoTitle") : settings.bannerTitleEn || t("promoTitle"))}</h2><p>${esc(lang() === "ar" ? settings.bannerDescriptionAr || t("promoBody") : settings.bannerDescriptionEn || t("promoBody"))}</p><div><a href="/alternatives" data-alt="open">${t("explore")} ←</a><button data-alt="how">${t("how")}</button></div></div><div class="alt-promo-pair"><figure><img src="${esc(lead.reference.image)}" alt=""/><figcaption>${t("referenceOnly")}</figcaption></figure>${similarityRing(lead, true)}<figure class="available"><img src="${esc(lead.product.image)}" alt=""/><figcaption>${t("availableAlternative")}</figcaption></figure></div>` : "";
    section.hidden = !settings.sectionEnabled;
    section.innerHTML = settings.sectionEnabled ? `<header><div><small>${t("eyebrow")}</small><h2>${esc(lang() === "ar" ? settings.titleAr || t("worthTrying") : settings.titleEn || t("worthTrying"))}</h2><p>${esc(lang() === "ar" ? settings.descriptionAr || t("worthSub") : settings.descriptionEn || t("worthSub"))}</p></div><a href="/alternatives" data-alt="open">${t("viewAll")} ←</a></header><div class="home-alt-slider-wrap"><button data-alt="slide" data-direction="-1" aria-label="${t("prev")}">‹</button><div class="home-alt-slider">${items.map(homeCard).join("")}</div><button data-alt="slide" data-direction="1" aria-label="${t("next")}">›</button></div>` : "";
  }

  function filterItems() {
    const items = [...(model.payload?.items || [])];
    const q = model.query.trim().toLocaleLowerCase("ar");
    let result = q ? items.filter((item) => [label(item.reference, "name"), item.reference.brand, label(item.product, "name"), item.product.brand, ...notes(item)].join(" ").toLocaleLowerCase("ar").includes(q)) : items;
    const quick = model.quick;
    if (["men", "women", "unisex"].includes(quick)) result = result.filter((item) => item.reference.gender === quick || item.product.gender === quick);
    if (quick === "summer" || quick === "winter") result = result.filter((item) => item.reference.seasons.includes(quick) || item.product.seasons?.includes(quick));
    if (quick === "strongLongevity") result = result.filter((item) => Number(item.comparison.longevity || 0) >= 8);
    if (quick === "strongProjection") result = result.filter((item) => Number(item.comparison.projection || 0) >= 8);
    if (model.minMatch) result = result.filter((item) => Number(item.similarity || 0) >= model.minMatch);
    if (quick === "highestMatch") result.sort((a, b) => b.similarity - a.similarity);
    if (quick === "bestSaving") result.sort((a, b) => savings(b) - savings(a));
    if (quick === "popular") result.sort((a, b) => b.activityScore - a.activityScore || b.similarity - a.similarity);
    const sorters = { similarity: (a,b) => b.similarity-a.similarity, savings:(a,b)=>savings(b)-savings(a), price_asc:(a,b)=>a.product.price-b.product.price, price_desc:(a,b)=>b.product.price-a.product.price, popular:(a,b)=>b.activityScore-a.activityScore };
    if (sorters[model.sort]) result.sort(sorters[model.sort]);
    return result;
  }

  function listingCard(item) {
    return `<article class="alternative-card">
      <div class="alternative-card-visual"><span class="alt-ribbon">${t("luxuryAlternative")}</span><figure class="reference"><img src="${esc(item.reference.image)}" alt="${esc(label(item.reference, "name"))}" loading="lazy"/><figcaption><small>${t("reference")}</small><b>${esc(label(item.reference, "name"))}</b><span>${esc(item.reference.brand)}</span></figcaption></figure>${similarityRing(item, true)}<figure class="alternative"><img src="${esc(item.product.image)}" alt="${esc(label(item.product, "name"))}" loading="lazy"/><figcaption><small>${t("availableAlternative")}</small><b>${esc(label(item.product, "name"))}</b><span>${esc(item.product.brand)}</span></figcaption></figure></div>
      <div class="alternative-card-body"><div class="alt-shared-notes">${notes(item).map((note) => `<span>✦ ${esc(note)}</span>`).join("")}</div><p>${esc(label(item, "reason"))}</p><div class="alt-card-commerce">${stars(item)}<div><strong>${money(item.product.price)}</strong><small>${t("savings")} ${money(savings(item))}</small></div></div>${actionButtons(item)}</div>
    </article>`;
  }

  function quickFilters() {
    return [["all", "all"], ["popular", "popular"], ["highestMatch", "highestMatch"], ["bestSaving", "bestSaving"], ["men", "men"], ["women", "women"], ["unisex", "unisex"], ["strongLongevity", "strongLongevity"], ["strongProjection", "strongProjection"], ["summer", "summer"], ["winter", "winter"]]
      .map(([value, key]) => `<button class="${model.quick === value ? "active" : ""}" data-alt="quick" data-value="${value}">${t(key)}</button>`).join("");
  }

  function renderListing() {
    const items = filterItems();
    root.innerHTML = `<nav class="alt-breadcrumb"><a href="/" data-alt="home">${lang() === "ar" ? "الرئيسية" : "Home"}</a><span>‹</span><b>${t("alternatives")}</b></nav>
      <header class="alternatives-hero"><div><small>${t("eyebrow")}</small><h1>${t("title")}</h1><p>${t("intro")}</p><div><button data-alt="browse">${t("browse")}</button><button data-alt="how">${t("how")}</button></div></div><div class="alternatives-hero-art">${model.payload.items.slice(0,2).map((item,index)=>`<figure class="${index ? "available" : "reference"}"><img src="${esc(index ? item.product.image : item.reference.image)}" alt=""/></figure>`).join("")}<span>⇄</span></div></header>
      <section class="alternatives-search"><label for="alternatives-search">${t("searchLabel")}</label><div><span>⌕</span><input id="alternatives-search" type="search" value="${esc(model.query)}" placeholder="${t("searchHint")}" autocomplete="off"/><button data-alt="search">${lang() === "ar" ? "بحث" : "Search"}</button></div><div class="alternatives-suggestions" id="alternatives-suggestions" hidden></div></section>
      <section class="alternatives-quick"><h2>${t("quickLinks")}</h2><div>${quickFilters()}</div></section>
      <div class="alternatives-toolbar"><div><b>${t("productsFound")}</b><span>${items.length} ${t("results")}</span></div><button class="mobile-filter-button" data-alt="drawer">☷ ${t("filters")}</button><label>${t("sort")}<select id="alternatives-sort"><option value="recommended">${t("recommended")}</option><option value="popular">${t("popular")}</option><option value="similarity">${t("highestMatch")}</option><option value="savings">${t("bestSaving")}</option><option value="price_asc">${t("priceLow")}</option><option value="price_desc">${t("priceHigh")}</option></select></label></div>
      <div class="alternatives-content"><aside class="alternatives-filters ${model.drawer ? "open" : ""}" aria-hidden="${mobileFilterMedia.matches && !model.drawer ? "true" : "false"}"><header><h2>${t("filters")}</h2><button data-alt="drawer" aria-label="${t("clear")}">×</button></header><div class="alt-filter-group"><b>${t("similarity")}</b><label><input type="radio" name="altMatch" data-alt-filter="match" value="90"${model.minMatch === 90 ? " checked" : ""}/> 90%+</label><label><input type="radio" name="altMatch" data-alt-filter="match" value="85"${model.minMatch === 85 ? " checked" : ""}/> 85%+</label></div><div class="alt-filter-group"><b>${t("season")}</b><button data-alt="quick" data-value="summer">${t("summer")}</button><button data-alt="quick" data-value="winter">${t("winter")}</button></div><button class="alt-clear" data-alt="clear">${t("clear")}</button></aside><button class="alternatives-filter-backdrop ${model.drawer ? "open" : ""}" data-alt="drawer" aria-label="${t("filters")}"></button><main id="alternatives-results">${items.length ? `<div class="alternatives-grid">${items.map(listingCard).join("")}</div>` : `<div class="alternatives-empty"><span>⌕</span><h2>${t("noResults")}</h2><p>${t("noResultsBody")}</p><button data-alt="clear">${t("clear")}</button></div>`}</main></div>
      <p class="alternatives-disclaimer">ⓘ ${t("disclaimer")}</p>`;
    const select = root.querySelector("#alternatives-sort"); if (select) select.value = model.sort;
    document.body.classList.toggle("alternatives-drawer-open", model.drawer);
  }

  function syncFilterAccessibility() {
    const filter = root.querySelector(".alternatives-filters");
    if (filter) filter.setAttribute("aria-hidden", String(mobileFilterMedia.matches && !model.drawer));
  }

  function scoreBar(labelText, referenceValue, alternativeValue) {
    return `<div class="comparison-score"><b>${labelText}</b><div><span>${t("reference")}</span><i><em style="width:${Math.min(100, Number(referenceValue || 0) * 10)}%"></em></i><strong>${referenceValue}/10</strong></div><div><span>${t("availableAlternative")}</span><i><em style="width:${Math.min(100, Number(alternativeValue || 0) * 10)}%"></em></i><strong>${alternativeValue}/10</strong></div></div>`;
  }
  function compareValue(value) { return Array.isArray(value) ? value.map((v) => esc(v)).join(" · ") : esc(value || "—"); }
  function comparisonRows(item) {
    const ref = item.reference, product = item.product, refNotes = ref.notes || {}, isAr = lang() === "ar";
    const productNotes = product.notes || {};
    const rows = [
      [t("family"), label(ref, "family"), isAr ? product.familyAr : product.familyEn],
      [t("topNotes"), refNotes[isAr ? "topAr" : "topEn"], productNotes[isAr ? "topAr" : "topEn"] || (isAr ? product.notesAr : product.notesEn)],
      [t("heartNotes"), refNotes[isAr ? "heartAr" : "heartEn"], productNotes[isAr ? "heartAr" : "heartEn"] || notes(item)],
      [t("baseNotes"), refNotes[isAr ? "baseAr" : "baseEn"], productNotes[isAr ? "baseAr" : "baseEn"] || (isAr ? product.notesAr : product.notesEn)],
      [t("character"), ref.accords, notes(item)], [t("concentration"), ref.concentration, product.concentration],
      [t("season"), ref.seasons, product.seasons], [t("occasion"), ref.occasions, product.occasions],
      [t("price"), money(ref.referencePrice), money(product.price)], [t("savings"), "—", money(savings(item))], [t("similarity"), "—", `${item.similarity}%`]
    ];
    return rows.map(([name, left, right]) => `<div class="comparison-row"><b>${name}</b><span data-label="${t("reference")}">${compareValue(left)}</span><span data-label="${t("availableAlternative")}">${compareValue(right)}</span></div>`).join("");
  }

  function renderCompare(item) {
    postEvent(item, "comparison");
    const ref = item.reference, product = item.product, comp = item.comparison || {};
    root.innerHTML = `<nav class="alt-breadcrumb"><a href="/" data-alt="home">${lang() === "ar" ? "الرئيسية" : "Home"}</a><span>‹</span><a href="/alternatives" data-alt="open">${t("alternatives")}</a><span>‹</span><b>${esc(label(ref, "name"))}</b></nav>
      <header class="comparison-title"><small>${t("eyebrow")}</small><h1>${t("compareTitle")}</h1><p>${t("compareSub")}</p></header>
      <section class="comparison-hero"><article class="comparison-product reference"><span>${t("reference")}</span><img src="${esc(ref.image)}" alt="${esc(label(ref,"name"))}"/><div><h2>${esc(label(ref,"name"))}</h2><b>${esc(ref.brand)}</b><p>${esc(ref.concentration)} · ${esc(ref.size)}</p><strong>${money(ref.referencePrice)}</strong><em>${t("referenceNotice")}</em></div></article><div class="comparison-center">${similarityRing(item)}<b>${t("highMatch")}</b><small>${t("confidence")}: ${item.confidence}%</small></div><article class="comparison-product alternative"><span>${t("suggested")}</span><img src="${esc(product.image)}" alt="${esc(label(product,"name"))}"/><div><h2>${esc(label(product,"name"))}</h2><b>${esc(product.brand)}</b><p>${esc(product.concentration)} · ${esc(product.sizes?.[0] || "")}</p>${stars(item)}<strong>${money(product.price)}</strong><em class="stock">● ${available(item) ? t("available") : t("unavailable")}</em>${actionButtons(item)}</div></article></section>
      <section class="comparison-insights"><article><span>✦</span><div><h2>${t("reason")}</h2><p>${esc(label(item,"reason"))}</p></div></article><article class="saving"><span>♕</span><div><h2>${t("savings")}</h2><strong>${money(savings(item))}</strong><p>${t("originalPrice")}: ${money(ref.referencePrice)}</p></div></article><article><span>◷</span><div><h2>${t("performance")}</h2>${scoreBar(t("longevity"), ref.performance.longevity, comp.longevity)}${scoreBar(t("projection"), ref.performance.projection, comp.projection)}</div></article></section>
      <section class="comparison-table"><header><small>${t("eyebrow")}</small><h2>${t("fullComparison")}</h2></header><div class="comparison-row head"><b></b><span>${t("reference")}<small>${esc(label(ref,"name"))}</small></span><span>${t("availableAlternative")}<small>${esc(label(product,"name"))}</small></span></div>${comparisonRows(item)}</section>
      <section class="inspired-section"><header><span></span><h2>${t("inspiredTitle")}</h2><span></span></header><div class="inspired-pair"><article><b>${t("referenceNotice")}</b><img src="${esc(ref.image)}" alt=""/><h3>${esc(label(ref,"name"))}</h3></article><div>⇄</div><article class="available"><b>${t("availableAlternative")}</b><img src="${esc(product.image)}" alt=""/><h3>${esc(label(product,"name"))}</h3><strong>${item.similarity}%</strong>${actionButtons(item,true)}</article></div><div class="inspired-facts"><article><h3>${t("commonNotes")}</h3><div>${notes(item).map(n=>`<span>✦ ${esc(n)}</span>`).join("")}</div></article><article><h3>${t("performance")}</h3><p>${t("longevity")}: ${comp.longevity}/10</p><p>${t("projection")}: ${comp.projection}/10</p></article><article><h3>${t("priceDifference")}</h3><p>${t("originalPrice")}: ${money(ref.referencePrice)}</p><b>${t("alternativePrice")}: ${money(product.price)}</b></article><article><h3>${t("suitableSeason")}</h3><p>${ref.seasons.map(s=>`<span>${s === "summer" ? "☀" : s === "winter" ? "❄" : "❧"} ${esc(s)}</span>`).join(" ")}</p></article></div></section>
      <section class="alternative-narrative"><article><h2>${t("similarities")}</h2><ul>${(lang()==="ar"?item.similaritiesAr:item.similaritiesEn).map(v=>`<li>✓ ${esc(v)}</li>`).join("")}</ul></article><article><h2>${t("differences")}</h2><ul>${(lang()==="ar"?item.differencesAr:item.differencesEn).map(v=>`<li>◇ ${esc(v)}</li>`).join("")}</ul></article><article><h2>${t("scentJourney")}</h2><p><b>${t("opening")}:</b> ${compareValue(notes(item,"top"))}</p><p><b>${t("heart")}:</b> ${compareValue(notes(item))}</p><p><b>${t("base")}:</b> ${compareValue(notes(item,"base"))}</p></article></section>
      <p class="alternatives-disclaimer">ⓘ ${t("disclaimer")}</p><a class="comparison-back" href="/alternatives" data-alt="open">← ${t("returnAlternatives")}</a>`;
  }

  function productPanel(productId) {
    const item = model.payload?.items?.find((entry) => entry.product.id === productId);
    if (!item) return "";
    return `<section class="pdp-alternative-reference"><div><small>${t("availableAlternative")}</small><h2>${lang() === "ar" ? "بديل لعطر تعرفه" : "An alternative to a fragrance you know"}</h2><p>${t("referenceNotice")}</p><button data-alt="compare" data-slug="${esc(item.reference.slug)}">${t("fullComparison")} ←</button></div><img src="${esc(item.reference.image)}" alt="${esc(label(item.reference,"name"))}"/><div><b>${esc(label(item.reference,"name"))}</b><span>${esc(item.reference.brand)}</span>${similarityRing(item,true)}</div></section>`;
  }

  function setRoute(active) {
    document.body.classList.toggle("alternatives-route", active);
    page.hidden = !active;
    if (!active) document.body.classList.remove("alternatives-drawer-open");
    document.querySelectorAll(".category-nav a").forEach((link) => link.classList.toggle("active", active && link.getAttribute("href") === "/alternatives"));
  }
  async function load(force = false) {
    if (model.payload && !force) return model.payload;
    if (!model.loading) model.loading = store().api("/api/alternatives").then((payload) => { model.payload = payload; model.loading = null; renderHome(); return payload; }).catch((error) => { model.loading = null; throw error; });
    return model.loading;
  }
  async function route() {
    const match = location.pathname.match(/^\/alternatives(?:\/compare\/([^/]+))?\/?$/i);
    if (!match) { setRoute(false); return false; }
    setRoute(true); root.innerHTML = `<div class="alternatives-loading"><i></i><i></i><i></i><p>${t("loading")}</p></div>`;
    try {
      await load();
      if (match[1]) {
        const slug = decodeURIComponent(match[1]);
        const item = model.payload.items.find((entry) => entry.reference.slug === slug || entry.product.id === slug);
        if (!item) throw new Error(t("noResults"));
        renderCompare(item);
      } else {
        model.query = new URL(location.href).searchParams.get("q") || model.query;
        renderListing();
      }
    } catch (error) {
      root.innerHTML = `<div class="alternatives-error"><span>!</span><h1>${t("error")}</h1><p>${esc(error.message)}</p><button data-alt="retry">${t("retry")}</button></div>`;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }

  function suggestions(value) {
    const host = root.querySelector("#alternatives-suggestions"); if (!host) return;
    const q = value.trim().toLocaleLowerCase("ar"); if (!q) { host.hidden = true; return; }
    const items = model.payload.items.filter((item) => [label(item.reference,"name"), item.reference.brand, label(item.product,"name"), item.product.brand].join(" ").toLocaleLowerCase("ar").includes(q)).slice(0,5);
    host.innerHTML = items.length ? `<small>${t("similarSearch")}</small>${items.map(item=>`<button data-alt="suggestion" data-value="${esc(label(item.reference,"name"))}"><img src="${esc(item.reference.image)}" alt=""/><span><b>${esc(label(item.reference,"name"))}</b><small>${esc(item.reference.brand)} · ${item.similarity}%</small></span><em>${t("comparison")} ←</em></button>`).join("")}` : `<p>${t("noResults")}</p>`;
    host.hidden = false;
  }

  document.addEventListener("click", (event) => {
    const el = event.target.closest("[data-alt],[data-action='open-alternatives']"); if (!el) return;
    const action = el.dataset.alt || "open";
    if (["open","compare","home"].includes(action) || el.tagName === "A") event.preventDefault();
    if (action === "open") { toggleMobileMenuSafe(); go("/alternatives"); }
    if (action === "home") go("/");
    if (action === "compare") go(`/alternatives/compare/${encodeURIComponent(el.dataset.slug)}`);
    if (action === "add") { const item=model.payload.items.find(i=>i.product.id===el.dataset.product); store().addToCart(store().getProduct(el.dataset.product)); postEvent(item,"add_to_cart"); }
    if (action === "wishlist") { const item=model.payload.items.find(i=>i.product.id===el.dataset.product); store().toggleWishlist(el.dataset.product); postEvent(item,"wishlist"); }
    if (action === "product") { const item=model.payload.items.find(i=>i.product.id===el.dataset.product); store().showProductDetails(store().getProduct(el.dataset.product)); postEvent(item,"product_view"); }
    if (action === "quick") { model.quick=el.dataset.value; model.drawer=false; renderListing(); }
    if (action === "clear") { model.quick="all"; model.query=""; model.sort="recommended"; model.minMatch=0; model.drawer=false; history.replaceState(history.state, "", "/alternatives"); renderListing(); }
    if (action === "drawer") { model.drawer=!model.drawer; renderListing(); }
    if (action === "browse") root.querySelector("#alternatives-results")?.scrollIntoView({behavior:"smooth"});
    if (action === "how") store().showToast(t("disclaimer"));
    if (action === "retry") { model.payload=null; load(true).then(route); }
    if (action === "slide") document.querySelector(".home-alt-slider")?.scrollBy({left:Number(el.dataset.direction)*390,behavior:"smooth"});
    if (action === "suggestion") { model.query=el.dataset.value; renderListing(); }
    if (action === "search") { const input=root.querySelector("#alternatives-search"); model.query=input?.value.trim()||""; history.replaceState(history.state,"",`/alternatives${model.query?`?q=${encodeURIComponent(model.query)}`:""}`); store().api("/api/alternatives/events",{method:"POST",body:JSON.stringify({eventType:"search",query:model.query,resultsCount:filterItems().length})}).catch(()=>{}); renderListing(); }
  });
  function toggleMobileMenuSafe(){ document.querySelector(".mobile-menu-panel")?.classList.remove("open"); document.querySelector(".mobile-menu-backdrop")?.classList.remove("open"); }
  document.addEventListener("submit", (event) => {
    if (event.target.id === "home-alternative-search") { event.preventDefault(); const q=event.target.querySelector("input").value.trim(); go(`/alternatives${q?`?q=${encodeURIComponent(q)}`:""}`); }
  });
  document.addEventListener("input", (event) => { if (event.target.id === "alternatives-search") { model.query=event.target.value; suggestions(model.query); } });
  document.addEventListener("keydown", (event) => { if (event.target.id === "alternatives-search" && event.key === "Enter") { event.preventDefault(); root.querySelector('[data-alt="search"]')?.click(); } });
  document.addEventListener("change", (event) => {
    if (event.target.id === "alternatives-sort") { model.sort=event.target.value; renderListing(); }
    if (event.target.matches('[data-alt-filter="match"]')) { model.minMatch=Number(event.target.value)||0; model.drawer=false; renderListing(); }
  });
  window.addEventListener("popstate", route);
  window.addEventListener("resize", syncFilterAccessibility, { passive: true });
  mobileFilterMedia.addEventListener?.("change", syncFilterAccessibility);
  if ("ResizeObserver" in window) new ResizeObserver(syncFilterAccessibility).observe(document.documentElement);
  document.addEventListener("click", (event) => { if (event.target.closest("[data-action='language'],[data-action='theme']")) setTimeout(() => { renderHome(); if (document.body.classList.contains("alternatives-route")) route(); }, 0); });
  if (!sessionStorage.getItem("origoAltSession")) sessionStorage.setItem("origoAltSession", `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`);
  window.ORIGOAlternatives = { route, renderHome, productPanel, refresh: () => load(true).then(() => route()) };
  load().then(() => { renderHome(); route(); }).catch(() => route());
})();
