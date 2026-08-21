(function (global) {
  "use strict";

  const UNSUPPORTED = "صيغة حزمة العطر غير مدعومة. استخدم حزمة ORIGO الجديدة.";
  const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
  const text = (value) => typeof value === "string" ? value.trim() : "";
  const numberOrNull = (value) => value === null || value === "" || value === undefined ? null : Number(value);
  const normalizedKey = (value) => text(String(value ?? "")).toLocaleLowerCase().replace(/[\u064B-\u065F\u0670]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/[\s-]+/g, "_");
  const fail = (path, message) => { throw new Error(`${path}: ${message}`); };

  function parsePerfumeBundle(source) {
    if (typeof source !== "string" || !source.trim()) fail("bundle", "أدخل حزمة JSON أولًا.");
    try { return JSON.parse(source); }
    catch (error) { throw new Error(`JSON غير صالح: ${error.message}`); }
  }

  function validateNumber(value, path, minimum, maximum = Infinity, { positive = false } = {}) {
    if (value === null) return;
    if (typeof value !== "number" || !Number.isFinite(value) || value < minimum || value > maximum || (positive && value === 0)) {
      fail(path, maximum === Infinity ? `يجب أن يكون رقمًا ${positive ? "موجبًا" : `لا يقل عن ${minimum}`}` : `يجب أن يكون بين ${minimum} و${maximum}`);
    }
  }

  function validateArray(value, path) {
    if (!Array.isArray(value)) fail(path, "يجب أن يكون Array.");
  }

  function validatePerfumeBundle(bundle) {
    if (!isObject(bundle)) fail("root", "يجب أن يكون Object.");
    if (!isObject(bundle.perfume)) fail("perfume", "يجب أن يكون Object.");
    const perfume = bundle.perfume;
    const requiredShape = ["accords", "notes", "performance", "seasons", "time", "occasions"].every((field) => Object.prototype.hasOwnProperty.call(perfume, field));
    const legacyShape = ["derived", "unknown_fields", "accords", "notes"].some((field) => Object.prototype.hasOwnProperty.call(bundle, field)) || ["main_accords", "top_notes", "heart_notes", "base_notes", "usage_time"].some((field) => Object.prototype.hasOwnProperty.call(perfume, field));
    if (!requiredShape || legacyShape) throw new Error(UNSUPPORTED);

    validateArray(perfume.accords, "perfume.accords");
    perfume.accords.forEach((accord, index) => {
      if (!isObject(accord)) fail(`perfume.accords[${index}]`, "يجب أن يكون Object.");
      validateNumber(accord.percentage, `perfume.accords[${index}].percentage`, 0, 100);
    });
    if (!isObject(perfume.notes)) fail("perfume.notes", "يجب أن يكون Object.");
    ["top", "heart", "base"].forEach((level) => validateArray(perfume.notes[level], `perfume.notes.${level}`));
    if (!isObject(perfume.performance)) fail("perfume.performance", "يجب أن يكون Object.");
    validateNumber(perfume.performance.longevity_hours, "perfume.performance.longevity_hours", 0);
    if (!isObject(perfume.seasons)) fail("perfume.seasons", "يجب أن يكون Object.");
    ["winter", "autumn", "spring", "summer"].forEach((season) => validateNumber(perfume.seasons[season], `perfume.seasons.${season}`, 0, 100));
    if (!isObject(perfume.time)) fail("perfume.time", "يجب أن يكون Object.");
    ["day", "night"].forEach((period) => validateNumber(perfume.time[period], `perfume.time.${period}`, 0, 100));
    validateArray(perfume.occasions, "perfume.occasions");
    validateArray(perfume.scent_character_ar, "perfume.scent_character_ar");
    validateArray(perfume.scent_character_en, "perfume.scent_character_en");
    validateArray(perfume.search_keywords_ar, "perfume.search_keywords_ar");
    validateArray(perfume.search_keywords_en, "perfume.search_keywords_en");
    validateNumber(perfume.size_ml, "perfume.size_ml", 0, Infinity, { positive: true });
    validateNumber(perfume.release_year, "perfume.release_year", 1800, new Date().getFullYear() + 2);
    if (perfume.rating !== undefined) validateNumber(perfume.rating, "perfume.rating", 0, 5);
    if (perfume.review_count !== undefined) validateNumber(perfume.review_count, "perfume.review_count", 0);
    if (perfume.review_count != null && !Number.isInteger(perfume.review_count)) fail("perfume.review_count", "يجب أن يكون عددًا صحيحًا.");
    if (isObject(perfume.rating_details)) {
      if (perfume.rating_details.value !== undefined) validateNumber(perfume.rating_details.value, "perfume.rating_details.value", 0, 5);
      if (perfume.rating_details.max !== undefined) validateNumber(perfume.rating_details.max, "perfume.rating_details.max", 0, Infinity, { positive:true });
      if (perfume.rating_details.votes !== undefined) validateNumber(perfume.rating_details.votes, "perfume.rating_details.votes", 0);
    }
    return true;
  }

  function unique(values, identity = (value) => normalizedKey(value.en || value.ar || value)) {
    const seen = new Set();
    return values.filter((value) => { const key = identity(value); if (!key || seen.has(key)) return false; seen.add(key); return true; });
  }

  function bilingual(value) {
    return { ar: text(value?.name_ar ?? value?.ar), en: text(value?.name_en ?? value?.en) };
  }

  function normalizeGender(...values) {
    const keys = values.map(normalizedKey);
    if (keys.some((key) => ["رجالي", "للرجال", "men", "male"].includes(key))) return "men";
    if (keys.some((key) => ["نسائي", "للنساء", "women", "female"].includes(key))) return "women";
    if (keys.some((key) => ["للجنسين", "unisex", "مشترك"].includes(key))) return "unisex";
    return "";
  }

  function normalizeProjection(...values) {
    const keys = values.map(normalizedKey);
    const map = { "ضعيف":"weak", weak:"weak", "متوسط":"moderate", moderate:"moderate", "قوي":"strong", strong:"strong", "قوي_جدا":"very_strong", "قوي_جدًا":"very_strong", very_strong:"very_strong" };
    return keys.map((key) => map[key]).find(Boolean) || "";
  }

  function normalizePerfumeBundle(bundle) {
    validatePerfumeBundle(bundle);
    const perfume = bundle.perfume;
    const noteList = (level) => unique(perfume.notes[level].map(bilingual).filter((note) => note.ar || note.en));
    return {
      source: "origo_perfume_bundle_v2",
      perfume: {
        nameAr: text(perfume.name_ar), nameEn: text(perfume.name_en),
        brandAr: text(perfume.brand_ar), brandEn: text(perfume.brand_en),
        genderAr: text(perfume.gender_ar), genderEn: text(perfume.gender_en), gender: normalizeGender(perfume.gender, perfume.gender_code, perfume.gender_ar, perfume.gender_en),
        concentrationAr: text(perfume.concentration_ar), concentrationEn: text(perfume.concentration_en), concentrationCode: text(perfume.concentration_code),
        sizeMl: numberOrNull(perfume.size_ml), releaseYear: numberOrNull(perfume.release_year),
        fragranceFamilyAr: text(perfume.fragrance_family_ar), fragranceFamilyEn: text(perfume.fragrance_family_en),
        descriptionAr: text(perfume.short_description_ar), descriptionEn: text(perfume.short_description_en),
        fullDescriptionAr: text(perfume.full_description_ar), fullDescriptionEn: text(perfume.full_description_en),
        rating: perfume.rating == null ? numberOrNull(perfume.rating_details?.value) : numberOrNull(perfume.rating),
        reviewCount: perfume.review_count == null ? numberOrNull(perfume.rating_details?.votes) : numberOrNull(perfume.review_count),
        ratingDetails: isObject(perfume.rating_details) ? { ...perfume.rating_details } : null,
        slug: text(perfume.slug), productUrl: text(perfume.product_url), canonicalUrl: text(perfume.canonical_url),
        seo: isObject(perfume.seo) ? {
          titleAr:text(perfume.seo.title_ar), titleEn:text(perfume.seo.title_en),
          descriptionAr:text(perfume.seo.description_ar), descriptionEn:text(perfume.seo.description_en),
          canonical:text(perfume.seo.canonical), robots:text(perfume.seo.robots)
        } : null
      },
      accords: unique(perfume.accords.map((accord) => ({ ...bilingual(accord), percentage: Number(accord.percentage) })).filter((accord) => accord.ar || accord.en)),
      notes: { top: noteList("top"), heart: noteList("heart"), base: noteList("base") },
      performance: {
        longevityAr: text(perfume.performance.longevity_ar), longevityEn: text(perfume.performance.longevity_en),
        longevityHours: numberOrNull(perfume.performance.longevity_hours),
        projectionAr: text(perfume.performance.projection_ar), projectionEn: text(perfume.performance.projection_en),
        projection: normalizeProjection(perfume.performance.projection_ar, perfume.performance.projection_en)
      },
      seasons: Object.fromEntries(["winter", "autumn", "spring", "summer"].map((key) => [key, numberOrNull(perfume.seasons[key])])),
      time: Object.fromEntries(["day", "night"].map((key) => [key, numberOrNull(perfume.time[key])])),
      occasions: unique(perfume.occasions.map(bilingual).filter((occasion) => occasion.ar || occasion.en)),
      scentCharacter: { ar: unique(perfume.scent_character_ar.map(text).filter(Boolean), normalizedKey), en: unique(perfume.scent_character_en.map(text).filter(Boolean), normalizedKey) },
      searchKeywords: { ar: unique(perfume.search_keywords_ar.map(text).filter(Boolean), normalizedKey), en: unique(perfume.search_keywords_en.map(text).filter(Boolean), normalizedKey) }
    };
  }

  function applyPerfumeBundleToProduct(product = {}, bundle) {
    const normalized = bundle?.source === "origo_perfume_bundle_v2" ? bundle : normalizePerfumeBundle(bundle);
    const perfume = normalized.perfume;
    const result = { ...product, images: Array.isArray(product.images) ? [...product.images] : [] };
    Object.assign(result, {
      nameAr: perfume.nameAr, nameEn: perfume.nameEn,
      brandAr: perfume.brandAr, brandEn: perfume.brandEn, brand: perfume.brandEn || perfume.brandAr,
      gender: perfume.gender, genderAr: perfume.genderAr, genderEn: perfume.genderEn,
      concentration: perfume.concentrationCode, concentrationAr: perfume.concentrationAr, concentrationEn: perfume.concentrationEn,
      releaseYear: perfume.releaseYear, fragranceFamilyAr: perfume.fragranceFamilyAr, fragranceFamilyEn: perfume.fragranceFamilyEn,
      families: [perfume.fragranceFamilyEn || perfume.fragranceFamilyAr].filter(Boolean),
      descriptionAr: perfume.descriptionAr, descriptionEn: perfume.descriptionEn,
      fullDescriptionAr: perfume.fullDescriptionAr, fullDescriptionEn: perfume.fullDescriptionEn,
      accordProfile: normalized.accords.map((accord) => ({ nameAr: accord.ar, nameEn: accord.en, strength: accord.percentage, score: accord.percentage, source: "bundle" })),
      noteSelectionsBundle: normalized.notes,
      notes: unique(Object.values(normalized.notes).flat().map((note) => note.en || note.ar).filter(Boolean), normalizedKey),
      seasonScores: { ...normalized.seasons }, usageTimeScores: { ...normalized.time },
      seasons: [],
      usageTimes: [],
      occasions: normalized.occasions.map((occasion) => occasion.en || occasion.ar), occasionLabels: normalized.occasions,
      scentCharacterAr: [...normalized.scentCharacter.ar], scentCharacterEn: [...normalized.scentCharacter.en],
      personalities: unique([...normalized.scentCharacter.ar, ...normalized.scentCharacter.en], normalizedKey),
      perfumeBundle: normalized
    });
    const urlSlug = [perfume.slug, perfume.productUrl, perfume.canonicalUrl].map((value) => text(value)).find(Boolean) || "";
    if (urlSlug) result.slug = urlSlug.replace(/[?#].*$/, "").replace(/\/$/, "").split("/").pop();
    if (perfume.rating != null) {
      result.rating = perfume.rating;
      result.reviewSummary = { ...(product.reviewSummary || {}), average:perfume.rating };
    }
    if (perfume.reviewCount != null) result.reviewSummary = { ...(result.reviewSummary || product.reviewSummary || {}), count:perfume.reviewCount };
    if (perfume.ratingDetails) result.ratingDetails = { ...perfume.ratingDetails };
    if (perfume.sizeMl === null) { result.size = ""; result.sizes = []; }
    else { result.size = `${perfume.sizeMl} ml`; result.sizes = [result.size]; }
    result.performance = {
      ...(product.performance || {}),
      longevity: normalized.performance.longevityHours,
      longevityHours: normalized.performance.longevityHours,
      longevityAr: normalized.performance.longevityAr,
      longevityEn: normalized.performance.longevityEn,
      projection: normalized.performance.projection,
      projectionAr: normalized.performance.projectionAr,
      projectionEn: normalized.performance.projectionEn
    };
    result.seo = {
      ...(product.seo || {}),
      ...(perfume.seo || {}),
      keywordsAr:[...normalized.searchKeywords.ar], keywordsEn:[...normalized.searchKeywords.en],
      keywords: unique([...normalized.searchKeywords.ar, ...normalized.searchKeywords.en], normalizedKey)
    };
    return result;
  }

  function buildPerfumeBundleFromProduct(product = {}) {
    const imported = product.perfumeBundle?.source === "origo_perfume_bundle_v2" ? product.perfumeBundle : {};
    const importedPerfume = imported.perfume || {};
    const notes = product.noteSelectionsBundle || imported.notes || { top:[], heart:[], base:[] };
    const pair = (value) => ({ name_ar: text(value?.ar ?? value?.nameAr), name_en: text(value?.en ?? value?.nameEn) });
    const size = Number.parseFloat(product.size || importedPerfume.sizeMl);
    const keywords = Array.isArray(product.seo?.keywords) ? product.seo.keywords : [];
    const importedArabicKeywords = imported.searchKeywords?.ar || [];
    const arabicKeys = new Set(importedArabicKeywords.map(normalizedKey));
    return { perfume: {
      name_ar: text(product.nameAr), name_en: text(product.nameEn), brand_ar: text(product.brandAr || importedPerfume.brandAr), brand_en: text(product.brandEn || product.brand),
      gender_ar: text(product.genderAr || importedPerfume.genderAr), gender_en: text(product.genderEn || importedPerfume.genderEn),
      gender: text(product.gender || importedPerfume.gender), gender_code: text(product.gender || importedPerfume.gender),
      concentration_ar: text(product.concentrationAr || importedPerfume.concentrationAr), concentration_en: text(product.concentrationEn || importedPerfume.concentrationEn), concentration_code: text(product.concentration),
      size_ml: Number.isFinite(size) ? size : null, release_year: product.releaseYear ?? importedPerfume.releaseYear ?? null,
      fragrance_family_ar: text(product.fragranceFamilyAr || importedPerfume.fragranceFamilyAr), fragrance_family_en: text(product.fragranceFamilyEn || product.families?.[0] || importedPerfume.fragranceFamilyEn),
      accords: (product.accordProfile || []).map((accord) => ({ name_ar:text(accord.nameAr), name_en:text(accord.nameEn), percentage:Number(accord.strength ?? accord.score ?? 0) })),
      notes: Object.fromEntries(["top", "heart", "base"].map((level) => [level, (notes[level] || []).map(pair)])),
      performance: {
        longevity_ar:text(product.performance?.longevityAr || imported.performance?.longevityAr), longevity_en:text(product.performance?.longevityEn || imported.performance?.longevityEn),
        longevity_hours:product.performance?.longevityHours ?? product.performance?.longevity ?? null,
        projection_ar:text(product.performance?.projectionAr || imported.performance?.projectionAr), projection_en:text(product.performance?.projectionEn || imported.performance?.projectionEn)
      },
      seasons: Object.fromEntries(["winter", "autumn", "spring", "summer"].map((key) => [key, product.seasonScores?.[key] ?? null])),
      time: Object.fromEntries(["day", "night"].map((key) => [key, product.usageTimeScores?.[key] ?? null])),
      occasions: (product.occasionLabels || product.occasions || []).map((value) => typeof value === "string" ? { name_ar:value, name_en:value } : pair(value)),
      short_description_ar:text(product.descriptionAr), short_description_en:text(product.descriptionEn),
      full_description_ar:text(product.fullDescriptionAr || importedPerfume.fullDescriptionAr), full_description_en:text(product.fullDescriptionEn || importedPerfume.fullDescriptionEn),
      rating:product.reviewSummary?.average ?? product.rating ?? null, review_count:product.reviewSummary?.count ?? null,
      rating_details:product.ratingDetails || importedPerfume.ratingDetails || undefined,
      slug:text(product.slug || importedPerfume.slug), product_url:text(importedPerfume.productUrl), canonical_url:text(importedPerfume.canonicalUrl),
      seo:{
        title_ar:text(product.seo?.titleAr || importedPerfume.seo?.titleAr), title_en:text(product.seo?.titleEn || importedPerfume.seo?.titleEn),
        description_ar:text(product.seo?.descriptionAr || importedPerfume.seo?.descriptionAr), description_en:text(product.seo?.descriptionEn || importedPerfume.seo?.descriptionEn),
        canonical:text(product.seo?.canonical || importedPerfume.seo?.canonical), robots:text(product.seo?.robots || importedPerfume.seo?.robots)
      },
      scent_character_ar:[...(product.scentCharacterAr || imported.scentCharacter?.ar || [])], scent_character_en:[...(product.scentCharacterEn || imported.scentCharacter?.en || [])],
      search_keywords_ar:keywords.filter((value) => arabicKeys.has(normalizedKey(value)) || /[\u0600-\u06FF]/.test(value)),
      search_keywords_en:keywords.filter((value) => !arabicKeys.has(normalizedKey(value)) && !/[\u0600-\u06FF]/.test(value))
    } };
  }

  global.ORIGOPerfumeBundle = { parsePerfumeBundle, validatePerfumeBundle, normalizePerfumeBundle, applyPerfumeBundleToProduct, buildPerfumeBundleFromProduct };
})(typeof window !== "undefined" ? window : globalThis);
