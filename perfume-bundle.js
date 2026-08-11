(function (global) {
  "use strict";

  const isObject = (value) => value && typeof value === "object" && !Array.isArray(value);
  const text = (value) => typeof value === "string" ? value.trim() : "";
  const key = (value) => text(value).toLocaleLowerCase().replace(/\s+/g, " ");
  const pathError = (path, message) => new Error(`Invalid value: ${path} ${message}`);

  function parsePerfumeBundle(source) {
    if (typeof source !== "string" || !source.trim()) throw pathError("bundle", "must contain JSON text");
    try { return JSON.parse(source); }
    catch (error) { throw new Error(`Invalid JSON: ${error.message}`); }
  }

  function validateString(value, path, { optional = false } = {}) {
    if (value == null && optional) return;
    if (typeof value !== "string") throw pathError(path, "must be a string");
  }

  function validateArray(value, path, validator, { optional = true } = {}) {
    if (value == null && optional) return;
    if (!Array.isArray(value)) throw pathError(path, "must be an array");
    value.forEach((item, index) => validator(item, `${path}[${index}]`));
  }

  function validateBilingual(value, path, extra = null) {
    if (!isObject(value)) throw pathError(path, "must be an object");
    validateString(value.ar ?? value.name_ar, `${path}.${"ar" in value ? "ar" : "name_ar"}`);
    validateString(value.en ?? value.name_en, `${path}.${"en" in value ? "en" : "name_en"}`);
    if (extra) extra(value, path);
  }

  function validateScore(value, path) {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100) throw pathError(path, "must be between 0 and 100");
  }

  function validatePerfumeBundle(bundle) {
    if (!isObject(bundle)) throw pathError("bundle", "must be an object");
    if (!isObject(bundle.perfume)) throw pathError("perfume", "must be an object");
    ["name_ar","name_en","brand_ar","brand_en"].forEach((field) => validateString(bundle.perfume[field], `perfume.${field}`));
    validateArray(bundle.accords, "accords", (item, path) => {
      validateBilingual(item, path);
      validateScore(item.percentage, `${path}.percentage`);
    });
    if (bundle.notes != null && !isObject(bundle.notes)) throw pathError("notes", "must be an object");
    ["top","heart","base"].forEach((level) => validateArray(bundle.notes?.[level], `notes.${level}`, validateBilingual));
    if (bundle.derived != null && !isObject(bundle.derived)) throw pathError("derived", "must be an object");
    if (bundle.derived?.olfactive_family != null) validateBilingual(bundle.derived.olfactive_family, "derived.olfactive_family");
    if (bundle.derived?.gender != null) validateBilingual(bundle.derived.gender, "derived.gender");
    validateArray(bundle.derived?.scent_character, "derived.scent_character", validateBilingual);
    validateArray(bundle.derived?.seasons, "derived.seasons", (item, path) => validateBilingual(item, path, (entry) => validateScore(entry.score, `${path}.score`)));
    validateArray(bundle.derived?.time_of_day, "derived.time_of_day", (item, path) => validateBilingual(item, path, (entry) => validateScore(entry.score, `${path}.score`)));
    validateArray(bundle.derived?.occasions, "derived.occasions", validateBilingual);
    if (bundle.unknown_fields != null && !isObject(bundle.unknown_fields)) throw pathError("unknown_fields", "must be an object");
    if (bundle.unknown_fields) {
      const unknown = bundle.unknown_fields;
      ["concentration","sillage"].forEach((field) => { if (unknown[field] != null && typeof unknown[field] !== "string" && typeof unknown[field] !== "number") throw pathError(`unknown_fields.${field}`, "must be a string, number, or null"); });
      ["size_ml","longevity_hours"].forEach((field) => { if (unknown[field] != null && (typeof unknown[field] !== "number" || !Number.isFinite(unknown[field]) || unknown[field] < 0)) throw pathError(`unknown_fields.${field}`, "must be a non-negative number or null"); });
    }
    return true;
  }

  function bilingual(item = {}) {
    return { ar:text(item.ar ?? item.name_ar), en:text(item.en ?? item.name_en) };
  }

  function unique(items, identity = (item) => key(item.en || item.ar)) {
    const seen = new Set();
    return items.filter((item) => {
      const id = identity(item);
      if (!id || seen.has(id)) return false;
      seen.add(id); return true;
    });
  }

  function normalizedList(items, withScore = false) {
    return unique((Array.isArray(items) ? items : []).map((item) => ({ ...bilingual(item), ...(withScore ? { score:Number(item.score) } : {}) })).filter((item) => item.ar || item.en));
  }

  function normalizePerfumeBundle(bundle) {
    validatePerfumeBundle(bundle);
    const accords = unique((bundle.accords || []).map((item) => ({ ...bilingual(item), percentage:Number(item.percentage) })).filter((item) => item.ar || item.en)).sort((a,b) => b.percentage - a.percentage);
    return {
      perfume: { nameAr:text(bundle.perfume.name_ar), nameEn:text(bundle.perfume.name_en), brandAr:text(bundle.perfume.brand_ar), brandEn:text(bundle.perfume.brand_en) },
      accords,
      notes: { top:normalizedList(bundle.notes?.top), heart:normalizedList(bundle.notes?.heart), base:normalizedList(bundle.notes?.base) },
      derived: {
        dataType:text(bundle.derived?.data_type) || "inferred",
        olfactiveFamily:bilingual(bundle.derived?.olfactive_family),
        scentCharacter:normalizedList(bundle.derived?.scent_character),
        gender:bilingual(bundle.derived?.gender),
        seasons:normalizedList(bundle.derived?.seasons, true),
        timeOfDay:normalizedList(bundle.derived?.time_of_day, true),
        occasions:normalizedList(bundle.derived?.occasions)
      },
      unknownFields:Object.fromEntries(Object.entries(bundle.unknown_fields || {}).filter(([,value]) => value != null && value !== "")),
      source:"perfume_data_bundle"
    };
  }

  function applyPerfumeBundleToProduct(product = {}, bundle) {
    const normalized = bundle?.source === "perfume_data_bundle" ? bundle : normalizePerfumeBundle(bundle);
    const next = { ...product };
    const assign = (field, value) => { if (value != null && value !== "") next[field] = value; };
    assign("nameAr", normalized.perfume.nameAr); assign("nameEn", normalized.perfume.nameEn);
    assign("brandAr", normalized.perfume.brandAr); assign("brandEn", normalized.perfume.brandEn);
    assign("brand", normalized.perfume.brandEn || normalized.perfume.brandAr);
    next.accordProfile = normalized.accords.map((item) => ({ nameAr:item.ar, nameEn:item.en, strength:item.percentage, score:item.percentage, source:"bundle" }));
    next.noteSelectionsBundle = normalized.notes;
    next.familyAr = normalized.derived.olfactiveFamily.ar || next.familyAr || "";
    next.familyEn = normalized.derived.olfactiveFamily.en || next.familyEn || "";
    next.personalities = normalized.derived.scentCharacter.map((item) => item.en || item.ar);
    const genderKey = key(normalized.derived.gender.en || normalized.derived.gender.ar);
    if (["men","male","رجالي","للرجال"].includes(genderKey)) next.gender = "men";
    else if (["women","female","نسائي","للنساء"].includes(genderKey)) next.gender = "women";
    else if (["unisex","للجنسين","مشترك"].includes(genderKey)) next.gender = "unisex";
    next.seasons = normalized.derived.seasons.map((item) => item.en || item.ar);
    next.usageTimes = normalized.derived.timeOfDay.map((item) => item.en || item.ar);
    next.occasions = normalized.derived.occasions.map((item) => item.en || item.ar);
    const unknown = normalized.unknownFields;
    assign("concentration", unknown.concentration);
    if (unknown.size_ml != null) { next.size = `${Number(unknown.size_ml)} ml`; next.sizes = [next.size]; }
    if (unknown.longevity_hours != null) next.performance = { ...(next.performance || {}), longevity:Number(unknown.longevity_hours) };
    if (unknown.sillage != null) next.performance = { ...(next.performance || {}), sillage:unknown.sillage };
    next.perfumeBundle = normalized;
    return next;
  }

  global.ORIGOPerfumeBundle = { parsePerfumeBundle, validatePerfumeBundle, normalizePerfumeBundle, applyPerfumeBundleToProduct };
})(typeof window !== "undefined" ? window : globalThis);
