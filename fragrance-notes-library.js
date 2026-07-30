(function fragranceNotesLibraryBootstrap(global) {
  "use strict";

  const knowledge = global.ORIGOFragranceKnowledge?.database || { categories: [] };
  const referenceNotes = Array.isArray(global.ORIGOFragranceNoteReferences)
    ? global.ORIGOFragranceNoteReferences
    : [];
  const autoArtwork = global.ORIGOFragranceNoteAutoArtwork || {};
  const STORAGE_VERSION = 2;
  const familyBlueprints = {
    citrus: { color: "#D9A441", accent: "#FFF1B8", symbol: "◉", position: "top" },
    "fruits-vegetables-nuts": { color: "#B94D5D", accent: "#F6CCD2", symbol: "●", position: "top" },
    flowers: { color: "#A64E68", accent: "#F5CFDB", symbol: "✿", position: "heart" },
    "white-flowers": { color: "#B7A47C", accent: "#F7F0DD", symbol: "❀", position: "heart" },
    "greens-herbs-fougere": { color: "#567A57", accent: "#D8E9D3", symbol: "⌁", position: "top" },
    spices: { color: "#A44D2E", accent: "#F1D2C3", symbol: "✺", position: "multiple" },
    "sweets-gourmand": { color: "#9A604B", accent: "#EFD5C9", symbol: "◇", position: "base" },
    "woods-mosses": { color: "#654B3B", accent: "#DCCBBA", symbol: "▥", position: "base" },
    "resins-balsams": { color: "#8B5B38", accent: "#E8CBAA", symbol: "◆", position: "base" },
    "musk-amber-animalic": { color: "#756A62", accent: "#E4DDD7", symbol: "◌", position: "base" },
    beverages: { color: "#76503B", accent: "#E2C8B7", symbol: "◒", position: "heart" },
    "natural-synthetic-unusual": { color: "#4D7772", accent: "#CDE2DE", symbol: "✦", position: "multiple" },
    uncategorized: { color: "#77736E", accent: "#E2DFDB", symbol: "?", position: "multiple" }
  };

  const curatedNotes = [
    ["rose", "ورد", "Rose", "flowers", ["ورد طائفي", "Taif Rose", "Rosa", "الورد"], "heart", "✿"],
    ["oud", "عود", "Oud", "woods-mosses", ["Oudh", "Agarwood", "Aoud", "العود"], "base", "▥"],
    ["musk", "مسك", "Musk", "musk-amber-animalic", ["المسك", "Musks"], "base", "◌"],
    ["white-musk", "مسك أبيض", "White Musk", "musk-amber-animalic", ["White musks", "المسك الأبيض"], "base", "◌"],
    ["amber", "عنبر", "Amber", "musk-amber-animalic", ["Amber accord", "العنبر"], "base", "◆"],
    ["vanilla", "فانيليا", "Vanilla", "sweets-gourmand", ["Vanille", "الفانيليا"], "base", "◇"],
    ["bergamot", "برغموت", "Bergamot", "citrus", ["Bergamote", "البرغموت"], "top", "◉"],
    ["jasmine", "ياسمين", "Jasmine", "white-flowers", ["Jasmin", "الياسمين"], "heart", "❀"],
    ["iris", "سوسن", "Iris", "flowers", ["Orris", "Iris root", "جذر السوسن", "السوسن"], "heart", "✿"],
    ["leather", "جلد", "Leather", "natural-synthetic-unusual", ["Suede", "جلد سويدي", "الجلد"], "base", "▰"],
    ["saffron", "زعفران", "Saffron", "spices", ["الزعفران", "Safran"], "heart", "✺"],
    ["woods", "أخشاب", "Woods", "woods-mosses", ["Woody notes", "Wood", "الأخشاب"], "base", "▥"],
    ["cedar", "أرز", "Cedar", "woods-mosses", ["Cedarwood", "خشب الأرز", "الأرز"], "base", "▥"],
    ["sandalwood", "صندل", "Sandalwood", "woods-mosses", ["خشب الصندل", "Santal"], "base", "▥"],
    ["patchouli", "باتشولي", "Patchouli", "woods-mosses", ["الباتشولي", "Patchouly"], "base", "⌁"],
    ["vetiver", "فيتيفر", "Vetiver", "woods-mosses", ["نجيل الهند", "Vetivert"], "base", "⌁"],
    ["neroli", "نيرولي", "Neroli", "white-flowers", ["النيرولي", "Orange blossom oil"], "heart", "❀"],
    ["orange-blossom", "زهر البرتقال", "Orange Blossom", "white-flowers", ["Orange flower", "أزهار البرتقال"], "heart", "❀"],
    ["lemon", "ليمون", "Lemon", "citrus", ["الليمون", "Citron"], "top", "◉"],
    ["orange", "برتقال", "Orange", "citrus", ["البرتقال", "Sweet orange"], "top", "◉"],
    ["grapefruit", "جريب فروت", "Grapefruit", "citrus", ["الجريب فروت", "Pomelo"], "top", "◉"],
    ["mandarin", "يوسفي", "Mandarin", "citrus", ["Mandarin orange", "Tangerine", "الماندرين"], "top", "◉"],
    ["pink-pepper", "فلفل وردي", "Pink Pepper", "spices", ["Pink peppercorn", "الفلفل الوردي"], "top", "✺"],
    ["cardamom", "هيل", "Cardamom", "spices", ["Cardamon", "حبهان", "الهيل"], "top", "✺"],
    ["cinnamon", "قرفة", "Cinnamon", "spices", ["القرفة", "Cannelle"], "heart", "✺"],
    ["sage", "مريمية", "Sage", "greens-herbs-fougere", ["Clary sage", "المريمية"], "top", "⌁"],
    ["lavender", "لافندر", "Lavender", "greens-herbs-fougere", ["الخزامى", "Lavande"], "top", "⌁"],
    ["tobacco", "تبغ", "Tobacco", "natural-synthetic-unusual", ["التبغ", "Tobacco leaf"], "base", "✦"],
    ["incense", "بخور", "Incense", "resins-balsams", ["Frankincense", "Olibanum", "لبان", "البخور"], "base", "◆"],
    ["coffee", "قهوة", "Coffee", "beverages", ["القهوة", "Café"], "heart", "◒"],
    ["tea", "شاي", "Tea", "beverages", ["الشاي", "Black tea", "Green tea"], "heart", "◒"],
    ["chocolate", "شوكولاتة", "Chocolate", "sweets-gourmand", ["Cocoa", "كاكاو", "الشوكولاتة"], "base", "◇"],
    ["honey", "عسل", "Honey", "sweets-gourmand", ["العسل", "Miel"], "heart", "◇"],
    ["coconut", "جوز الهند", "Coconut", "fruits-vegetables-nuts", ["Coco", "جوز هند"], "heart", "●"],
    ["apple", "تفاح", "Apple", "fruits-vegetables-nuts", ["التفاح", "Green apple"], "top", "●"],
    ["cherry", "كرز", "Cherry", "fruits-vegetables-nuts", ["الكرز", "Black cherry"], "top", "●"],
    ["pear", "كمثرى", "Pear", "fruits-vegetables-nuts", ["الكمثرى", "Poire"], "top", "●"],
    ["peach", "خوخ", "Peach", "fruits-vegetables-nuts", ["الخوخ", "Pêche"], "heart", "●"],
    ["mango", "مانجو", "Mango", "fruits-vegetables-nuts", ["المانجو"], "top", "●"],
    ["pineapple", "أناناس", "Pineapple", "fruits-vegetables-nuts", ["الأناناس"], "top", "●"],
    ["fig", "تين", "Fig", "fruits-vegetables-nuts", ["التين", "Fig leaf"], "heart", "●"],
    ["marine", "نوتات بحرية", "Marine Notes", "natural-synthetic-unusual", ["Aquatic", "Sea notes", "نوتات مائية", "بحري"], "top", "≈"],
    ["green-notes", "نوتات خضراء", "Green Notes", "greens-herbs-fougere", ["Green accord", "أخضر", "النوتات الخضراء"], "top", "⌁"],
    ["rum", "روم", "Rum", "beverages", ["الروم", "Rhum"], "heart", "◒"],
    ["black-pepper", "فلفل أسود", "Black Pepper", "spices", ["الفلفل الأسود", "Pepper"], "top", "✺"],
    ["rosemary", "إكليل الجبل", "Rosemary", "greens-herbs-fougere", ["روزماري", "حصى البان"], "top", "⌁"],
    ["geranium", "إبرة الراعي", "Geranium", "flowers", ["جيرانيوم", "Pelargonium"], "heart", "✿"],
    ["tuberose", "مسك الروم", "Tuberose", "white-flowers", ["التيوبروز", "Polianthes tuberosa"], "heart", "❀"],
    ["tonka-bean", "حبوب التونكا", "Tonka Bean", "sweets-gourmand", ["تونكا", "Tonka"], "base", "◇"],
    ["myrrh", "المُرّ", "Myrrh", "resins-balsams", ["مر", "المر"], "base", "◆"],
    ["dates", "تمر", "Dates", "fruits-vegetables-nuts", ["التمر", "Date fruit"], "heart", "●"],
    ["praline", "برالين", "Praline", "sweets-gourmand", ["حلوى البرالين", "Praliné"], "heart", "◇"],
    ["milk", "حليب", "Milk", "sweets-gourmand", ["الحليب", "Milk notes"], "heart", "◇"],
    ["milk-accord", "أكورد الحليب", "Milk Accord", "sweets-gourmand", ["اتفاق الحليب", "Milky accord"], "heart", "◇"],
    ["milk-chocolate", "شوكولاتة بالحليب", "Milk Chocolate", "sweets-gourmand", ["شوكولاتة الحليب"], "base", "◇"],
    ["beeswax", "شمع العسل", "Beeswax", "musk-amber-animalic", ["شمع النحل"], "base", "◆"],
    ["ambroxan", "أمبروكسان", "Ambroxan", "musk-amber-animalic", ["Ambrox", "أمبروكس"], "base", "◆"],
    ["ambrettolide", "أمبريتوليد", "Ambrettolide", "musk-amber-animalic", ["Ambrette Musk"], "base", "◌"],
    ["cetalox", "سيتالوكس", "Cetalox", "musk-amber-animalic", ["Cetambrox", "Ambroxide"], "base", "◆"],
    ["black-musk", "مسك أسود", "Black Musk", "musk-amber-animalic", ["المسك الأسود"], "base", "◌"],
    ["pink-musk", "مسك وردي", "Pink Musk", "musk-amber-animalic", ["المسك الوردي"], "base", "◌"],
    ["animalic-notes", "نوتات حيوانية", "Animalic Notes", "musk-amber-animalic", ["Animal Notes", "نوتات حيوانية"], "base", "◌"],
    ["carrot-seeds", "بذور الجزر", "Carrot Seeds", "fruits-vegetables-nuts", ["بذور الجزر العطرية"], "heart", "●"],
    ["mahonial", "ماهونيال", "Mahonial", "natural-synthetic-unusual", ["Mahonia accord"], "heart", "✦"],
    ["akigalawood", "أكيجالا وود", "Akigalawood", "woods-mosses", ["Akigala Wood"], "base", "▥"],
    ["chinotto", "شينوتو", "Chinotto", "citrus", ["الشينوتو", "Myrtle-leaved orange"], "top", "◉"],
    ["white-flowers", "زهور بيضاء", "White Flowers", "white-flowers", ["الأزهار البيضاء", "White Floral Notes"], "heart", "❀"],
    ["sweet-notes", "نوتات حلوة", "Sweet Notes", "sweets-gourmand", ["حلو", "Sweet Accord"], "base", "◇"]
  ].map(([slug, nameAr, nameEn, familyId, aliases, position, symbol]) => ({
    slug, nameAr, nameEn, familyId, aliases, position, symbol,
    image: `assets/notes/generated/${slug}.png`
  }));

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f\u064B-\u065F\u0670]/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .toLowerCase();
  }

  const arabicRomanization = {
    ا: "a", ب: "b", ت: "t", ث: "th", ج: "j", ح: "h", خ: "kh", د: "d", ذ: "dh",
    ر: "r", ز: "z", س: "s", ش: "sh", ص: "s", ض: "d", ط: "t", ظ: "z", ع: "a",
    غ: "gh", ف: "f", ق: "q", ك: "k", ل: "l", م: "m", ن: "n", ه: "h", و: "w",
    ي: "y", ء: "", " ": "-"
  };

  function romanizeArabic(value) {
    return normalize(value).split("").map((letter) => arabicRomanization[letter] ?? letter).join("")
      .replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  function arabizeEnglish(value) {
    const digraphs = {
      sh: "ش", ch: "تش", th: "ث", ph: "ف", gh: "غ", kh: "خ", ou: "و", oo: "و", ee: "ي"
    };
    const letters = {
      a: "ا", b: "ب", c: "ك", d: "د", e: "ي", f: "ف", g: "ج", h: "ه", i: "ي",
      j: "ج", k: "ك", l: "ل", m: "م", n: "ن", o: "و", p: "ب", q: "ق", r: "ر",
      s: "س", t: "ت", u: "و", v: "ف", w: "و", x: "كس", y: "ي", z: "ز", " ": " "
    };
    let text = normalize(value);
    Object.entries(digraphs).forEach(([from, to]) => (text = text.replaceAll(from, to)));
    return text.split("").map((letter) => letters[letter] ?? letter).join("").trim() || "مكوّن عطري";
  }

  function slugify(value) {
    const ascii = /[\u0600-\u06FF]/.test(value) ? romanizeArabic(value) : normalize(value).replace(/\s+/g, "-");
    return ascii.replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "") || `note-${Date.now().toString(36)}`;
  }

  function stableHash(value) {
    let hash = 2166136261;
    for (const character of String(value || "")) {
      hash ^= character.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function uniqueSlug(value, familyId, result) {
    const base = slugify(value);
    if (!result.has(base)) return base;
    const familySlug = `${base}-${familyId}`;
    if (!result.has(familySlug)) return familySlug;
    return `${familySlug}-${stableHash(value)}`;
  }

  function cleanState(value) {
    const source = value && typeof value === "object" ? value : {};
    return {
      version: STORAGE_VERSION,
      families: Array.isArray(source.families) ? source.families : [],
      notes: Array.isArray(source.notes) ? source.notes : [],
      overrides: source.overrides && typeof source.overrides === "object" ? source.overrides : {},
      merges: source.merges && typeof source.merges === "object" ? source.merges : {},
      unclassified: Array.isArray(source.unclassified) ? source.unclassified : []
    };
  }

  let customState = cleanState({});
  let families = [];
  let notes = [];
  let notesBySlug = new Map();
  let aliasIndex = new Map();

  function originalDescription(note, family, language) {
    if (language === "ar") {
      return `${note.nameAr} مكوّن ضمن عائلة ${family.nameAr}. يضيف إلى البناء العطري طابعًا ${family.position === "top" ? "مشرقًا في الافتتاحية" : family.position === "heart" ? "واضحًا في القلب" : family.position === "base" ? "عميقًا في القاعدة" : "مرنًا عبر طبقات العطر"} بحسب التركيبة والتركيز.`;
    }
    return `${note.nameEn} belongs to the ${family.nameEn} family. It can bring a ${family.position === "top" ? "bright opening" : family.position === "heart" ? "distinctive heart" : family.position === "base" ? "deep dry-down" : "flexible character across the composition"}, depending on formula and concentration.`;
  }

  function referenceFamilyId(name) {
    const value = normalize(name);
    if (/lemon|orange|bergamot|mandarin|grapefruit|lime|citron|citrus|neroli|petitgrain|calamansi|yuzu|kumquat/.test(value)) return "citrus";
    if (/rose|flower|blossom|jasmine|iris|orris|lily|violet|orchid|peony|lavender|geranium|tuberose|gardenia|freesia|lotus|camellia|carnation|magnolia|mimosa|narcissus|ylang|hibiscus|heliotrope|champaca|osmanthus/.test(value)) return "flowers";
    if (/wood|cedar|birch|fir|pine|oak|sandal|vetiver|patchouli|cypress|mahogany|bamboo|palo santo|ebony|driftwood|tree/.test(value)) return "woods-mosses";
    if (/resin|balsam|benzoin|incense|myrrh|olibanum|labdanum|opoponax|styrax|elemi|amberwood/.test(value)) return "resins-balsams";
    if (/pepper|spice|cardamom|cinnamon|clove|anise|nutmeg|cumin|coriander|saffron|ginger|turmeric|fennel|fenugreek/.test(value)) return "spices";
    if (/sugar|candy|caramel|chocolate|cocoa|cream|milk|honey|vanilla|praline|toffee|marshmallow|cake|bread|waffle|tiramisu|ice cream|popcorn|sorbet|fudge|meringue|croissant/.test(value)) return "sweets-gourmand";
    if (/tea|coffee|wine|rum|gin|vodka|whiskey|cognac|champagne|brandy|cola|liqueur|syrup|absinthe|bellini/.test(value)) return "beverages";
    if (/leaf|grass|green|herb|mint|basil|sage|thyme|rosemary|tarragon|fern|ivy|moss|hay|tobacco|cannabis|artemisia|wormwood|eucalyptus/.test(value)) return "greens-herbs-fougere";
    if (/musk|ambrox|cetalox|castoreum|civet|animal|leather|suede|beeswax|amber/.test(value)) return "musk-amber-animalic";
    if (/apple|pear|peach|plum|berry|berries|currant|cherry|fig|mango|melon|banana|coconut|pineapple|apricot|grape|guava|kiwi|lychee|litchi|papaya|fruit|hazelnut|almond|pistachio|macadamia|date|raisin|pumpkin|tomato|cucumber|carrot|rhubarb|quince|olive/.test(value)) return "fruits-vegetables-nuts";
    return "natural-synthetic-unusual";
  }

  function rebuild() {
    families = knowledge.categories.map((category) => {
      const blueprint = familyBlueprints[category.id] || familyBlueprints.uncategorized;
      return {
        id: category.id,
        nameAr: category.nameAr,
        nameEn: category.nameEn,
        descriptionAr: category.descriptionAr || "",
        descriptionEn: `${category.nameEn} materials and accords used across fragrance compositions.`,
        ...blueprint
      };
    });
    customState.families.forEach((family) => {
      const index = families.findIndex((item) => item.id === family.id);
      if (index >= 0) families[index] = { ...families[index], ...family };
      else families.push({ ...familyBlueprints.uncategorized, ...family, color: family.color || familyBlueprints.uncategorized.color });
    });

    const curatedIndex = new Map();
    curatedNotes.forEach((note) => {
      [note.nameAr, note.nameEn, ...note.aliases].forEach((alias) => curatedIndex.set(normalize(alias), note));
    });

    const result = new Map();
    const sourceIndex = new Map();
    knowledge.categories.forEach((category) => {
      category.ingredients.forEach((ingredient) => {
        const curated = curatedIndex.get(normalize(ingredient));
        const sourceKey = normalize(ingredient);
        const existingSlug = sourceIndex.get(sourceKey);
        if (existingSlug && result.has(existingSlug)) {
          const existing = result.get(existingSlug);
          existing.aliases = [...new Set([...existing.aliases, ingredient])];
          return;
        }
        // Keep the original source spelling when a verified bilingual name is
        // unavailable. This publishes the complete knowledge base without
        // presenting phonetic transliteration as a real translation.
        const sourceIsArabic = /[\u0600-\u06FF]/.test(ingredient);
        const slug = curated?.slug || uniqueSlug(ingredient, category.id, result);
        const familyId = curated?.familyId || category.id;
        const family = families.find((item) => item.id === familyId) || families.find((item) => item.id === "uncategorized");
        const existing = result.get(slug);
        if (existing) {
          existing.aliases = [...new Set([...existing.aliases, ingredient])];
          return;
        }
        const note = {
          slug,
          nameAr: curated?.nameAr || ingredient,
          nameEn: curated?.nameEn || ingredient,
          aliases: [...new Set([ingredient, ...(curated?.aliases || [])])],
          familyId,
          position: curated?.position || family?.position || "multiple",
          symbol: curated?.symbol || family?.symbol || "✦",
          image: curated?.image || "",
          defaultIntensity: Number(curated?.defaultIntensity || 3),
          related: curated?.related || [],
          compatible: curated?.compatible || [],
          opposite: curated?.opposite || [],
          generatedTranslation: false,
          translationStatus: curated ? "verified" : "source-only",
          sourceLanguage: curated ? "bilingual" : (sourceIsArabic ? "ar" : "en"),
          sourceName: ingredient
        };
        note.descriptionAr = originalDescription(note, family, "ar");
        note.descriptionEn = originalDescription(note, family, "en");
        result.set(slug, note);
        sourceIndex.set(sourceKey, slug);
      });
    });

    curatedNotes.forEach((curated) => {
      if (result.has(curated.slug)) return;
      const family = families.find((item) => item.id === curated.familyId) || families[0];
      const note = {
        defaultIntensity: 3, related: [], compatible: [], opposite: [],
        ...curated, generatedTranslation: false, translationStatus: "verified", sourceLanguage: "bilingual",
        sourceName: curated.nameAr, image: curated.image || ""
      };
      note.descriptionAr = originalDescription(note, family, "ar");
      note.descriptionEn = originalDescription(note, family, "en");
      result.set(note.slug, note);
    });

    referenceNotes.forEach((reference) => {
      const referenceKey = normalize(reference.nameEn);
      const existing = result.get(reference.slug)
        || [...result.values()].find((note) =>
          normalize(note.nameEn) === referenceKey || normalize(note.sourceName) === referenceKey
        );
      if (existing) {
        if (!existing.image) existing.image = reference.image;
        return;
      }
      const familyId = referenceFamilyId(reference.nameEn);
      const family = families.find((item) => item.id === familyId)
        || families.find((item) => item.id === "uncategorized")
        || families[0];
      const note = {
        slug: reference.slug,
        nameAr: reference.nameEn,
        nameEn: reference.nameEn,
        aliases: [],
        familyId,
        position: family?.position || "multiple",
        symbol: family?.symbol || "✦",
        image: reference.image,
        defaultIntensity: 3,
        related: [],
        compatible: [],
        opposite: [],
        generatedTranslation: false,
        translationStatus: "source-only",
        sourceLanguage: "en",
        sourceName: reference.nameEn
      };
      note.descriptionAr = originalDescription(note, family, "ar");
      note.descriptionEn = originalDescription(note, family, "en");
      result.set(note.slug, note);
    });

    customState.notes.forEach((note) => result.set(note.slug || slugify(note.nameEn || note.nameAr), {
      position: "multiple",
      symbol: "✦",
      image: "",
      aliases: [],
      defaultIntensity: 3,
      related: [],
      compatible: [],
      opposite: [],
      generatedTranslation: false,
      translationStatus: "custom",
      sourceLanguage: "bilingual",
      ...note
    }));
    Object.entries(customState.overrides).forEach(([slug, override]) => {
      if (result.has(slug)) result.set(slug, { ...result.get(slug), ...override, slug });
    });

    notes = [...result.values()]
      .filter((note) => !customState.merges[note.slug])
      .map((note) => {
        const image = note.image || autoArtwork[note.slug] || "";
        return {
          ...note,
          image,
          imageStatus: !image
            ? "missing"
            : image.includes("/extracted/")
              ? "reference"
              : "ready"
        };
      });
    notesBySlug = new Map(notes.map((note) => [note.slug, note]));
    aliasIndex = new Map();
    notes.forEach((note) => {
      [note.slug, note.nameAr, note.nameEn, note.sourceName, ...(note.aliases || [])].forEach((alias) => {
        const key = normalize(alias);
        if (key && !aliasIndex.has(key)) aliasIndex.set(key, note.slug);
      });
    });
    Object.entries(customState.merges).forEach(([from, to]) => {
      const source = result.get(from);
      if (!source || !notesBySlug.has(to)) return;
      [source.slug, source.nameAr, source.nameEn, source.sourceName, ...(source.aliases || [])].forEach((alias) => {
        const key = normalize(alias);
        if (key) aliasIndex.set(key, to);
      });
    });
  }

  function familyById(id) {
    return families.find((family) => family.id === id) || families.find((family) => family.id === "uncategorized");
  }

  function find(value) {
    const directSlug = String(value || "").replace(/^\/?notes\//, "").trim();
    if (notesBySlug.has(directSlug)) return notesBySlug.get(directSlug);
    const key = normalize(value);
    if (!key) return null;
    const exact = aliasIndex.get(key);
    if (exact) return notesBySlug.get(exact) || null;
    if (key.length < 4) return null;
    const partial = [...aliasIndex.entries()].find(([candidate]) => candidate.includes(key) || key.includes(candidate));
    return partial ? notesBySlug.get(partial[1]) || null : null;
  }

  function search(query, { familyId = "all", imageStatus = "all", limit = 72, offset = 0 } = {}) {
    const key = normalize(query);
    const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });
    const filtered = notes.filter((note) => {
      if (familyId !== "all" && note.familyId !== familyId) return false;
      if (imageStatus === "available" && note.imageStatus !== "ready") return false;
      if (imageStatus === "reference" && note.imageStatus !== "reference") return false;
      if (imageStatus === "missing" && note.imageStatus !== "missing") return false;
      if (imageStatus === "pending" && note.imageStatus === "ready") return false;
      if (!key) return true;
      return [note.nameAr, note.nameEn, note.sourceName, ...(note.aliases || [])]
        .some((value) => normalize(value).includes(key));
    }).sort((a, b) => {
      const imageOrder = { ready: 0, reference: 1, missing: 2 };
      if (a.imageStatus !== b.imageStatus) return imageOrder[a.imageStatus] - imageOrder[b.imageStatus];
      const familyOrder = families.findIndex((family) => family.id === a.familyId)
        - families.findIndex((family) => family.id === b.familyId);
      if (familyOrder) return familyOrder;
      return collator.compare(a.nameEn || a.nameAr, b.nameEn || b.nameAr);
    });
    return { total: filtered.length, items: filtered.slice(offset, offset + limit) };
  }

  function escapeXML(value) {
    return String(value || "").replace(/[<>&'"]/g, (character) => ({
      "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;"
    })[character]);
  }

  function artwork(note) {
    if (note?.image) {
      const source = String(note.image).trim();
      if (/^(?:data:|blob:|https?:|\/\/|\/)/i.test(source)) return source;
      return `/${source.replace(/^\.\//, "")}`;
    }
    const family = familyById(note?.familyId) || familyBlueprints.uncategorized;
    const title = escapeXML(String(note?.nameEn || note?.nameAr || "ORIGO").slice(0, 20).toUpperCase());
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
      <defs><radialGradient id="g" cx=".32" cy=".24" r=".9"><stop stop-color="${family.accent}"/><stop offset="1" stop-color="${family.color}"/></radialGradient></defs>
      <rect width="640" height="640" rx="44" fill="url(#g)"/>
      <circle cx="320" cy="280" r="154" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2"/>
      <circle cx="320" cy="280" r="112" fill="rgba(255,255,255,.12)"/>
      <text x="320" y="330" text-anchor="middle" font-size="145" fill="white" font-family="Georgia,serif">${escapeXML(note?.symbol || family.symbol)}</text>
      <text x="320" y="530" text-anchor="middle" font-size="25" letter-spacing="4" fill="white" font-family="Arial,sans-serif">${title}</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function registerUnclassified(value, position = "multiple") {
    const name = String(value || "").trim();
    if (!name || customState.unclassified.some((item) => normalize(item.name) === normalize(name))) return false;
    customState.unclassified.push({ name, position, firstSeenAt: new Date().toISOString() });
    return true;
  }

  function noteValues(product) {
    const structured = product?.notes || {};
    const levels = ["top", "heart", "base"];
    const values = [];
    levels.forEach((position) => {
      const ar = structured[`${position}Ar`] || [];
      const en = structured[`${position}En`] || [];
      const preferred = en.length ? en : ar;
      preferred.forEach((value) => values.push({ value, position }));
    });
    if (!values.length) {
      const preferred = product?.notesEn?.length ? product.notesEn : (product?.notesAr || []);
      preferred.forEach((value) => values.push({ value, position: "multiple" }));
    }
    return values;
  }

  function enrichProduct(product, { registerUnknowns = true } = {}) {
    const levels = ["top", "heart", "base"];
    const enrichedNotes = { ...(product.notes || {}) };
    const matches = [];
    const unknown = [];
    levels.forEach((position) => {
      const arValues = Array.isArray(enrichedNotes[`${position}Ar`]) ? enrichedNotes[`${position}Ar`] : [];
      const enValues = Array.isArray(enrichedNotes[`${position}En`]) ? enrichedNotes[`${position}En`] : [];
      const combined = enValues.length ? enValues : arValues;
      const resolved = combined.map((value) => ({ value, note: find(value) }));
      resolved.forEach(({ value, note }) => {
        if (note) matches.push({ ...note, requestedPosition: position });
        else {
          unknown.push({ name: value, position });
          if (registerUnknowns) registerUnclassified(value, position);
        }
      });
      if (!arValues.length) enrichedNotes[`${position}Ar`] = resolved.map(({ value, note }) => note?.nameAr || value);
      if (!enValues.length) enrichedNotes[`${position}En`] = resolved.map(({ value, note }) => note?.nameEn || value);
    });
    const familyCounts = new Map();
    matches.forEach((note) => familyCounts.set(note.familyId, (familyCounts.get(note.familyId) || 0) + 1));
    const dominantId = [...familyCounts].sort((a, b) => b[1] - a[1])[0]?.[0];
    const family = familyById(dominantId);
    return {
      notes: enrichedNotes,
      matches,
      unknown,
      familyAr: family?.nameAr || "",
      familyEn: family?.nameEn || ""
    };
  }

  function productsFor(noteOrSlug, products, { excludeExact = false } = {}) {
    const note = typeof noteOrSlug === "string" ? find(noteOrSlug) : noteOrSlug;
    if (!note) return [];
    return (products || []).filter((product) => {
      const resolved = noteValues(product).map((item) => find(item.value)).filter(Boolean);
      const exact = resolved.some((item) => item.slug === note.slug);
      if (!excludeExact) return exact;
      return !exact && resolved.some((item) => item.familyId === note.familyId);
    });
  }

  function related(noteOrSlug, limit = 8) {
    const note = typeof noteOrSlug === "string" ? find(noteOrSlug) : noteOrSlug;
    if (!note) return [];
    return notes.filter((item) => item.familyId === note.familyId && item.slug !== note.slug).slice(0, limit);
  }

  function upsertNote(note) {
    const slug = note.slug || slugify(note.nameEn || note.nameAr);
    if (notesBySlug.has(slug) && !customState.notes.some((item) => item.slug === slug)) {
      customState.overrides[slug] = { ...(customState.overrides[slug] || {}), ...note, slug: undefined };
    } else {
      const index = customState.notes.findIndex((item) => item.slug === slug);
      const value = { ...note, slug };
      if (index >= 0) customState.notes[index] = value;
      else customState.notes.push(value);
    }
    customState.unclassified = customState.unclassified.filter((item) =>
      ![note.nameAr, note.nameEn, ...(note.aliases || [])].some((alias) => normalize(alias) === normalize(item.name))
    );
    rebuild();
    return notesBySlug.get(slug);
  }

  function upsertFamily(family) {
    const id = family.id || slugify(family.nameEn || family.nameAr);
    const index = customState.families.findIndex((item) => item.id === id);
    const value = { ...family, id };
    if (index >= 0) customState.families[index] = value;
    else customState.families.push(value);
    rebuild();
    return familyById(id);
  }

  function mergeNote(fromSlug, intoSlug) {
    if (!notesBySlug.has(fromSlug) || !notesBySlug.has(intoSlug) || fromSlug === intoSlug) return false;
    customState.merges[fromSlug] = intoSlug;
    rebuild();
    return true;
  }

  function setState(value) {
    customState = cleanState(value);
    rebuild();
  }

  function getState() {
    return JSON.parse(JSON.stringify(customState));
  }

  rebuild();
  global.ORIGOFragranceNotes = Object.freeze({
    normalize,
    slugify,
    find,
    search,
    artwork,
    familyById,
    related,
    productsFor,
    noteValues,
    enrichProduct,
    registerUnclassified,
    upsertNote,
    upsertFamily,
    mergeNote,
    setState,
    getState,
    get families() { return families; },
    get notes() { return notes; },
    get unclassified() { return customState.unclassified; }
  });
})(window);
