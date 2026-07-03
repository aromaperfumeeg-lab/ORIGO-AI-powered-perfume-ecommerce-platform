(function catalogProvidersBootstrap(global) {
  "use strict";

  const providers = [];
  const NOTE_DICTIONARY = [
    ["bergamot", "برغموت", "Bergamot"],
    ["lemon", "ليمون", "Lemon"],
    ["orange blossom", "زهر البرتقال", "Orange blossom"],
    ["neroli", "نيرولي", "Neroli"],
    ["saffron", "زعفران", "Saffron"],
    ["cardamom", "هيل", "Cardamom"],
    ["pepper", "فلفل", "Pepper"],
    ["rose", "ورد", "Rose"],
    ["jasmine", "ياسمين", "Jasmine"],
    ["iris", "سوسن", "Iris"],
    ["lavender", "لافندر", "Lavender"],
    ["oud", "عود", "Oud"],
    ["agarwood", "عود", "Agarwood"],
    ["amber", "عنبر", "Amber"],
    ["musk", "مسك", "Musk"],
    ["vanilla", "فانيليا", "Vanilla"],
    ["cedar", "أرز", "Cedar"],
    ["sandalwood", "صندل", "Sandalwood"],
    ["leather", "جلد", "Leather"],
    ["tobacco", "تبغ", "Tobacco"],
    ["patchouli", "باتشولي", "Patchouli"],
    ["vetiver", "فيتيفر", "Vetiver"],
    ["tonka", "تونكا", "Tonka bean"]
  ];

  const emptyProduct = () => ({
    nameAr: "",
    nameEn: "",
    brand: "",
    category: "",
    gender: "",
    concentration: "",
    sizes: [],
    descriptionAr: "",
    descriptionEn: "",
    notes: {
      topAr: [],
      topEn: [],
      heartAr: [],
      heartEn: [],
      baseAr: [],
      baseEn: []
    },
    familyAr: "",
    familyEn: "",
    seasons: [],
    usageTimes: [],
    images: [],
    originCountryAr: "",
    originCountryEn: "",
    barcode: "",
    sku: "",
    price: "",
    status: "draft",
    sourceLog: [],
    confidence: { level: "incomplete", score: 0, missing: [] }
  });

  function registerProvider(provider) {
    if (!provider?.id || providers.some((item) => item.id === provider.id)) {
      throw new Error("Catalog providers require a unique id.");
    }
    providers.push(provider);
    providers.sort((a, b) => (a.order || 100) - (b.order || 100));
  }

  function apiURL(base, params) {
    const url = new URL(base);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
    });
    return url;
  }

  async function fetchJSON(url, signal) {
    const response = await fetch(url, {
      signal,
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  function localAPI(path) {
    const configuredBase = String(global.ORIGO_API_BASE || "").replace(/\/+$/, "");
    if (configuredBase) return `${configuredBase}${path}`;
    if (global.location.protocol === "file:") return `http://127.0.0.1:4173${path}`;
    return path;
  }

  async function aiStatus(signal) {
    return fetchJSON(localAPI("/api/health"), signal);
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .toLowerCase();
  }

  function unique(values) {
    return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))];
  }

  function isBlank(value) {
    return value === "" || value === null || value === undefined || (Array.isArray(value) && !value.length);
  }

  function mergeProduct(target, incoming) {
    Object.entries(incoming || {}).forEach(([key, value]) => {
      if (key === "notes") {
        Object.entries(value || {}).forEach(([noteKey, notes]) => {
          target.notes[noteKey] = unique([...(target.notes[noteKey] || []), ...(notes || [])]);
        });
      } else if (key === "images") {
        const seen = new Set(target.images.map((image) => image.url));
        (value || []).forEach((image) => {
          if (image?.url && !seen.has(image.url)) {
            seen.add(image.url);
            target.images.push(image);
          }
        });
      } else if (Array.isArray(value)) {
        target[key] = unique([...(target[key] || []), ...value]);
      } else if (isBlank(target[key]) && !isBlank(value)) {
        target[key] = value;
      }
    });
    return target;
  }

  function sourceEntry(provider, url, fields, status = "success", note = "") {
    return {
      provider,
      url,
      fields: unique(fields),
      status,
      note,
      fetchedAt: new Date().toISOString()
    };
  }

  async function wikipediaPage(title, lang, signal) {
    if (!title) return null;
    const endpoint = apiURL(`https://${lang}.wikipedia.org/w/api.php`, {
      action: "query",
      prop: "extracts|pageimages|pageprops|langlinks|info",
      titles: title,
      exintro: "1",
      explaintext: "1",
      exsentences: "8",
      piprop: "thumbnail|original",
      pithumbsize: "1200",
      lllimit: "max",
      inprop: "url",
      format: "json",
      formatversion: "2",
      origin: "*"
    });
    const json = await fetchJSON(endpoint, signal);
    const page = json.query?.pages?.[0];
    return page && !page.missing ? page : null;
  }

  async function wikipediaSuggestions(query, lang, signal) {
    const endpoint = apiURL(`https://${lang}.wikipedia.org/w/api.php`, {
      action: "query",
      list: "search",
      srsearch: `${query} perfume`,
      srlimit: "7",
      srnamespace: "0",
      srprop: "snippet",
      format: "json",
      formatversion: "2",
      origin: "*"
    });
    const json = await fetchJSON(endpoint, signal);
    return (json.query?.search || []).map((item) => ({
      id: `wikipedia:${lang}:${item.title}`,
      title: item.title,
      description: String(item.snippet || "").replace(/<[^>]*>/g, ""),
      url: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, "_"))}`,
      lang,
      provider: "Wikipedia",
      query
    }));
  }

  function wikidataValue(entity, property) {
    return entity?.claims?.[property]?.[0]?.mainsnak?.datavalue?.value;
  }

  function entityId(value) {
    return value?.id || (value?.["numeric-id"] ? `Q${value["numeric-id"]}` : "");
  }

  async function wikidataEntity(id, signal) {
    if (!id) return null;
    const endpoint = apiURL("https://www.wikidata.org/w/api.php", {
      action: "wbgetentities",
      ids: id,
      props: "labels|descriptions|claims|sitelinks",
      languages: "ar|en",
      format: "json",
      origin: "*"
    });
    const json = await fetchJSON(endpoint, signal);
    return json.entities?.[id] || null;
  }

  async function wikidataSearch(query, signal) {
    const endpoint = apiURL("https://www.wikidata.org/w/api.php", {
      action: "wbsearchentities",
      search: query,
      language: "en",
      uselang: "en",
      limit: "1",
      type: "item",
      format: "json",
      origin: "*"
    });
    const json = await fetchJSON(endpoint, signal);
    return json.search?.[0]?.id || "";
  }

  async function entityLabels(ids, signal) {
    const cleanIds = unique(ids);
    if (!cleanIds.length) return {};
    const endpoint = apiURL("https://www.wikidata.org/w/api.php", {
      action: "wbgetentities",
      ids: cleanIds.join("|"),
      props: "labels",
      languages: "ar|en",
      format: "json",
      origin: "*"
    });
    const json = await fetchJSON(endpoint, signal);
    return Object.fromEntries(cleanIds.map((id) => {
      const entity = json.entities?.[id] || {};
      return [id, {
        ar: entity.labels?.ar?.value || "",
        en: entity.labels?.en?.value || ""
      }];
    }));
  }

  function commonsImage(filename) {
    if (!filename) return "";
    return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(String(filename).replace(/ /g, "_"))}?width=1200`;
  }

  function inferCategory(text) {
    const value = normalize(text);
    if (/(perfume|parfum|fragrance|eau de|عطر|كولونيا)/.test(value)) return "perfume";
    if (/(skin care|skincare|serum|cream|moistur|العناية بالبشرة|كريم|سيروم)/.test(value)) return "skincare";
    if (/(hair care|shampoo|conditioner|hair oil|العناية بالشعر|شامبو)/.test(value)) return "haircare";
    if (/(incense|bakhoor|bukhoor|oud chips|بخور|مبخرة)/.test(value)) return "incense";
    if (/(deodorant|antiperspirant|مزيل عرق)/.test(value)) return "deodorant";
    return "";
  }

  function inferConcentration(text) {
    const value = String(text || "");
    const options = [
      [/extrait(?: de parfum)?/i, "Extrait"],
      [/\bparfum\b/i, "Parfum"],
      [/\beau de parfum\b|\bEDP\b/i, "EDP"],
      [/\beau de toilette\b|\bEDT\b/i, "EDT"],
      [/\bbody mist\b|\bfragrance mist\b/i, "Body Mist"]
    ];
    return options.find(([pattern]) => pattern.test(value))?.[1] || "";
  }

  function inferGender(text) {
    const value = normalize(text);
    if (/(unisex|للجنسين|genderless)/.test(value)) return "unisex";
    if (/(pour homme|for men|masculine|رجالي|men s)/.test(value)) return "men";
    if (/(pour femme|for women|feminine|نسائي|women s)/.test(value)) return "women";
    return "";
  }

  function inferSizes(text) {
    return unique([...String(text || "").matchAll(/\b(\d{1,4}(?:\.\d+)?)\s?(ml|mL|ML|oz|g)\b/g)].map((match) => `${match[1]} ${match[2].toUpperCase()}`));
  }

  function inferFamily(text) {
    const value = normalize(text);
    const families = [
      ["oriental", "شرقية", "Oriental"],
      ["amber", "عنبرية", "Amber"],
      ["woody", "خشبية", "Woody"],
      ["floral", "زهرية", "Floral"],
      ["citrus", "حمضية", "Citrus"],
      ["aromatic", "عطرية", "Aromatic"],
      ["gourmand", "جورماند", "Gourmand"],
      ["chypre", "شيبر", "Chypre"],
      ["leather", "جلدية", "Leather"],
      ["fresh", "منعشة", "Fresh"]
    ];
    const found = families.find(([key]) => value.includes(key));
    return found ? { familyAr: found[1], familyEn: found[2] } : {};
  }

  function noteMatches(text) {
    const value = normalize(text);
    return NOTE_DICTIONARY.filter(([key]) => value.includes(key));
  }

  function inferNotes(text) {
    const source = String(text || "");
    const sections = [
      ["top", /(?:top notes?|opening notes?|notes? de tête)\s*(?:are|include|:|-)?\s*([^.;]{0,220})/i],
      ["heart", /(?:heart notes?|middle notes?|notes? de cœur)\s*(?:are|include|:|-)?\s*([^.;]{0,220})/i],
      ["base", /(?:base notes?|drydown)\s*(?:are|include|:|-)?\s*([^.;]{0,220})/i]
    ];
    const notes = {};
    sections.forEach(([level, pattern]) => {
      const match = source.match(pattern);
      if (!match) return;
      const found = noteMatches(match[1]);
      notes[`${level}Ar`] = unique(found.map((note) => note[1]));
      notes[`${level}En`] = unique(found.map((note) => note[2]));
    });
    return { notes };
  }

  function inferFields(product, contextText) {
    const text = `${contextText} ${product.nameAr} ${product.nameEn} ${product.descriptionAr} ${product.descriptionEn}`;
    if (!product.brand) {
      const knownBrands = [
        ["christian dior", "DIOR"], ["dior", "DIOR"], ["chanel", "CHANEL"], ["tom ford", "TOM FORD"],
        ["guerlain", "GUERLAIN"], ["hermès", "HERMÈS"], ["hermes", "HERMÈS"], ["creed", "CREED"],
        ["yves saint laurent", "YVES SAINT LAURENT"], ["versace", "VERSACE"], ["prada", "PRADA"],
        ["gucci", "GUCCI"], ["armani", "ARMANI"], ["burberry", "BURBERRY"], ["bvlgari", "BVLGARI"]
      ];
      const normalizedText = normalize(text);
      product.brand = knownBrands.find(([needle]) => normalizedText.includes(normalize(needle)))?.[1] || "";
    }
    if (!product.category) product.category = inferCategory(text);
    if (!product.concentration) product.concentration = inferConcentration(text);
    if (!product.gender) product.gender = inferGender(text);
    if (!product.sizes.length) product.sizes = inferSizes(text);
    mergeProduct(product, inferFamily(text));
    mergeProduct(product, inferNotes(text));
    return product;
  }

  function computeConfidence(product) {
    const fields = [
      ["nameAr", product.nameAr],
      ["nameEn", product.nameEn],
      ["brand", product.brand],
      ["category", product.category],
      ["gender", product.gender],
      ["concentration", product.concentration],
      ["sizes", product.sizes],
      ["descriptionAr", product.descriptionAr],
      ["descriptionEn", product.descriptionEn],
      ["notes", [...product.notes.topAr, ...product.notes.topEn, ...product.notes.heartAr, ...product.notes.heartEn, ...product.notes.baseAr, ...product.notes.baseEn]],
      ["family", product.familyAr || product.familyEn],
      ["seasons", product.seasons],
      ["usageTimes", product.usageTimes],
      ["images", product.images],
      ["originCountry", product.originCountryAr || product.originCountryEn],
      ["barcodeOrSku", product.barcode || product.sku]
    ];
    const present = fields.filter(([, value]) => !isBlank(value)).length;
    const sourceCount = product.sourceLog.filter((source) => source.status === "success").length;
    const score = Math.round((present / fields.length) * 82 + Math.min(sourceCount, 3) * 6);
    const level = score >= 74 && sourceCount >= 2 ? "trusted" : score >= 42 ? "review" : "incomplete";
    product.confidence = {
      level,
      score: Math.min(score, 100),
      missing: fields.filter(([, value]) => isBlank(value)).map(([field]) => field)
    };
    return product;
  }

  registerProvider({
    id: "wikipedia",
    label: "Wikipedia / MediaWiki",
    order: 10,
    async suggest(query, { signal } = {}) {
      const attempts = await Promise.allSettled([
        wikipediaSuggestions(query, "en", signal),
        wikipediaSuggestions(query, "ar", signal)
      ]);
      const seen = new Set();
      return attempts
        .flatMap((attempt) => attempt.status === "fulfilled" ? attempt.value : [])
        .filter((item) => {
          const key = normalize(item.title);
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .slice(0, 8);
    },
    async enrich(selection, context, { signal } = {}) {
      const primaryLang = selection.lang === "ar" ? "ar" : "en";
      const secondaryLang = primaryLang === "ar" ? "en" : "ar";
      const primary = await wikipediaPage(selection.title, primaryLang, signal);
      if (!primary) throw new Error("No Wikipedia page found.");
      const translatedTitle = primary.langlinks?.find((link) => link.lang === secondaryLang)?.title || "";
      const translated = translatedTitle ? await wikipediaPage(translatedTitle, secondaryLang, signal).catch(() => null) : null;
      const enPage = primaryLang === "en" ? primary : translated;
      const arPage = primaryLang === "ar" ? primary : translated;
      const data = {
        nameAr: arPage?.title || "",
        nameEn: enPage?.title || "",
        descriptionAr: arPage?.extract || "",
        descriptionEn: enPage?.extract || "",
        images: unique([
          primary.original?.source || primary.thumbnail?.source,
          translated?.original?.source || translated?.thumbnail?.source
        ]).map((url) => ({ url, provider: `Wikipedia (${primaryLang.toUpperCase()})` }))
      };
      const fields = Object.entries(data).filter(([, value]) => !isBlank(value)).map(([key]) => key);
      const pages = [primary, translated].filter(Boolean);
      return {
        data,
        context: {
          ...context,
          wikidataId: pages.find((page) => page.pageprops?.wikibase_item)?.pageprops?.wikibase_item || context.wikidataId,
          combinedText: `${context.combinedText || ""} ${pages.map((page) => `${page.title} ${page.extract || ""}`).join(" ")}`
        },
        source: sourceEntry("Wikipedia / MediaWiki", primary.fullurl || selection.url, fields)
      };
    }
  });

  registerProvider({
    id: "wikidata",
    label: "Wikidata",
    order: 20,
    async enrich(selection, context, { signal } = {}) {
      const id = context.wikidataId || await wikidataSearch(selection.title, signal);
      if (!id) throw new Error("No Wikidata entity found.");
      const entity = await wikidataEntity(id, signal);
      if (!entity || entity.missing !== undefined) throw new Error("Wikidata entity unavailable.");
      const manufacturerId = entityId(wikidataValue(entity, "P176"));
      const countryId = entityId(wikidataValue(entity, "P495"));
      const labels = await entityLabels([manufacturerId, countryId], signal).catch(() => ({}));
      const image = commonsImage(wikidataValue(entity, "P18"));
      const data = {
        nameAr: entity.labels?.ar?.value || "",
        nameEn: entity.labels?.en?.value || "",
        brand: labels[manufacturerId]?.en || labels[manufacturerId]?.ar || "",
        descriptionAr: entity.descriptions?.ar?.value || "",
        descriptionEn: entity.descriptions?.en?.value || "",
        originCountryAr: labels[countryId]?.ar || "",
        originCountryEn: labels[countryId]?.en || "",
        barcode: String(wikidataValue(entity, "P3962") || ""),
        sku: String(wikidataValue(entity, "P528") || ""),
        images: image ? [{ url: image, provider: "Wikidata / Wikimedia Commons" }] : []
      };
      const fields = Object.entries(data).filter(([, value]) => !isBlank(value)).map(([key]) => key);
      return {
        data,
        context: {
          ...context,
          wikidataId: id,
          combinedText: `${context.combinedText || ""} ${entity.labels?.en?.value || ""} ${entity.descriptions?.en?.value || ""}`
        },
        source: sourceEntry("Wikidata", `https://www.wikidata.org/wiki/${id}`, fields)
      };
    }
  });

  registerProvider({
    id: "openai-web-search",
    label: "OpenAI + Web Search",
    order: 25,
    async suggest(query) {
      return [{
        id: `openai-web:${normalize(query)}`,
        title: query,
        description: "بحث الويب عبر OpenAI مع مصادر وروابط قابلة للمراجعة",
        provider: "OpenAI + Web",
        query,
        lang: /[\u0600-\u06ff]/.test(query) ? "ar" : "en"
      }];
    },
    async enrich(selection, context, { signal, product } = {}) {
      const response = await fetch(localAPI("/api/catalog/ai-enrich"), {
        method: "POST",
        signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: selection.query || selection.title,
          knownProduct: {
            nameAr: product.nameAr,
            nameEn: product.nameEn,
            brand: product.brand,
            category: product.category,
            gender: product.gender,
            concentration: product.concentration,
            sizes: product.sizes,
            barcode: product.barcode,
            sku: product.sku
          }
        })
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(json.error || `OpenAI HTTP ${response.status}`);
      const fields = Object.entries(json.data || {})
        .filter(([, value]) => !isBlank(value))
        .map(([key]) => key);
      const sources = (json.citations || []).map((citation) => sourceEntry(
        `OpenAI Web · ${citation.title || "Source"}`,
        citation.url,
        fields,
        "success",
        `Cross-checked with ${json.model || "OpenAI"}`
      ));
      if (!sources.length) {
        sources.push(sourceEntry(
          "OpenAI + Web Search",
          "https://developers.openai.com/api/docs/guides/tools-web-search",
          fields,
          "success",
          `Structured result from ${json.model || "OpenAI"}`
        ));
      }
      return {
        data: json.data || {},
        context: {
          ...context,
          combinedText: `${context.combinedText || ""} ${json.data?.descriptionAr || ""} ${json.data?.descriptionEn || ""}`
        },
        sources
      };
    }
  });

  registerProvider({
    id: "open-beauty-facts",
    label: "Open Beauty Facts",
    order: 30,
    canEnrich(selection, context, product) {
      return /^\d{8,14}$/.test(selection.query || "") || /^\d{8,14}$/.test(product.barcode || "");
    },
    async enrich(selection, context, { signal, product } = {}) {
      const barcode = /^\d{8,14}$/.test(selection.query || "") ? selection.query : product.barcode;
      const fields = [
        "code", "product_name", "product_name_ar", "product_name_en", "brands",
        "categories", "countries", "quantity", "image_front_url", "image_url", "origins"
      ].join(",");
      const endpoint = apiURL(`https://world.openbeautyfacts.org/api/v3/product/${barcode}`, { fields });
      const json = await fetchJSON(endpoint, signal);
      const item = json.product;
      if (!item) throw new Error("Barcode not found in Open Beauty Facts.");
      const data = {
        nameAr: item.product_name_ar || "",
        nameEn: item.product_name_en || item.product_name || "",
        brand: item.brands || "",
        sizes: item.quantity ? [item.quantity] : [],
        originCountryAr: "",
        originCountryEn: item.origins || item.countries || "",
        barcode: item.code || barcode,
        images: unique([item.image_front_url, item.image_url]).map((url) => ({ url, provider: "Open Beauty Facts" }))
      };
      return {
        data,
        context: { ...context, combinedText: `${context.combinedText || ""} ${item.categories || ""}` },
        source: sourceEntry("Open Beauty Facts", `https://world.openbeautyfacts.org/product/${barcode}`, Object.entries(data).filter(([, value]) => !isBlank(value)).map(([key]) => key))
      };
    }
  });

  async function suggest(query, options = {}) {
    const cleanQuery = String(query || "").trim();
    if (cleanQuery.length < 2) return [];
    const capable = providers.filter((provider) => typeof provider.suggest === "function");
    const attempts = await Promise.allSettled(capable.map((provider) => provider.suggest(cleanQuery, options)));
    const seen = new Set();
    return attempts
      .flatMap((attempt) => attempt.status === "fulfilled" ? attempt.value : [])
      .filter((item) => {
        const key = `${normalize(item.title)}:${item.lang || ""}`;
        if (!item.title || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  async function enrich(selection, options = {}) {
    const product = emptyProduct();
    let context = { combinedText: `${selection.query || ""} ${selection.title || ""}` };
    for (const provider of providers) {
      if (typeof provider.enrich !== "function") continue;
      if (provider.canEnrich && !provider.canEnrich(selection, context, product)) continue;
      try {
        const result = await provider.enrich(selection, context, { ...options, product });
        mergeProduct(product, result.data);
        context = result.context || context;
        if (result.source) product.sourceLog.push(result.source);
        if (Array.isArray(result.sources)) product.sourceLog.push(...result.sources);
      } catch (error) {
        product.sourceLog.push(sourceEntry(provider.label || provider.id, "", [], "unavailable", error.message));
      }
    }
    inferFields(product, context.combinedText);
    const knowledge = global.ORIGOFragranceKnowledge?.enrichProduct(product);
    if (knowledge?.fields?.length) {
      mergeProduct(product, knowledge.data);
      product.sourceLog.push(sourceEntry(
        "ORIGO Fragrance Knowledge",
        "",
        knowledge.fields,
        "success",
        `${knowledge.matches.length} matched ingredients`
      ));
    }
    if (!product.brand) {
      const titleWords = String(selection.title || selection.query || "").split(/\s+/).filter(Boolean);
      product.brand = titleWords.length > 1 ? titleWords[0] : "";
    }
    if (!product.nameEn && selection.lang !== "ar") product.nameEn = selection.title || selection.query || "";
    if (!product.nameAr && selection.lang === "ar") product.nameAr = selection.title || selection.query || "";
    if (product.images[0]) product.images[0].selected = true;
    return computeConfidence(product);
  }

  function fragranticaReference(query) {
    return {
      provider: "Fragrantica · manual reference",
      title: `Fragrantica: ${query}`,
      description: "Open Fragrantica manually. Automatic extraction requires a written commercial license and an Authorized API.",
      externalUrl: `https://www.fragrantica.com/search/?query=${encodeURIComponent(String(query || "").trim())}`,
      termsUrl: "https://www.fragrantica.com/Terms-of-Service.phtml"
    };
  }

  function connectAuthorizedFragranticaAPI(adapter) {
    if (typeof adapter?.suggest !== "function" || typeof adapter?.enrich !== "function") {
      throw new Error("An authorized Fragrantica adapter must provide suggest() and enrich().");
    }
    registerProvider({
      id: "fragrantica-authorized",
      label: "Fragrantica (Authorized API)",
      order: 15,
      suggest: adapter.suggest,
      enrich: adapter.enrich
    });
  }

  global.ORIGOCatalog = {
    registerProvider,
    suggest,
    enrich,
    emptyProduct,
    computeConfidence,
    normalize,
    aiStatus,
    fragranticaReference,
    connectAuthorizedFragranticaAPI
  };
})(window);
