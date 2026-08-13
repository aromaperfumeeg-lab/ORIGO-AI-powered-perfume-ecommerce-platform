export const FINDER_WEIGHTS = Object.freeze({
  feelings: 15,
  families: 20,
  notes: 20,
  personality: 10,
  usage: 10,
  seasonTime: 10,
  features: 10,
  budget: 5
});

export const FINDER_STEP_IDS = Object.freeze(["for-whom", "feeling", "families", "notes", "personality", "usage", "features", "budget", "results"]);

const aliases = {
  citrus: ["citrus", "حمضيات", "حمضي", "orange", "برتقال"], bergamot: ["bergamot", "برغموت"], lemon: ["lemon", "ليمون"],
  apple: ["apple", "تفاح"], mint: ["mint", "نعناع"], pinkPepper: ["pink pepper", "فلفل وردي", "pepper", "فلفل"],
  rose: ["rose", "ورد"], jasmine: ["jasmine", "ياسمين"], lavender: ["lavender", "لافندر"], whiteFlowers: ["white flower", "زهور بيضاء"],
  cinnamon: ["cinnamon", "قرفة"], saffron: ["saffron", "زعفران"], oud: ["oud", "agarwood", "عود"], amber: ["amber", "عنبر"],
  musk: ["musk", "مسك"], vanilla: ["vanilla", "فانيليا"], leather: ["leather", "جلد"], patchouli: ["patchouli", "باتشولي"],
  sandalwood: ["sandalwood", "خشب الصندل", "صندل"]
};

const familySignals = {
  oriental: ["oud", "amber", "saffron", "cinnamon", "vanilla", "incense", "عود", "عنبر", "زعفران", "قرفة", "فانيليا", "بخور", "oriental", "شرقي"],
  woody: ["oud", "sandalwood", "cedar", "patchouli", "wood", "عود", "صندل", "أرز", "باتشولي", "خشب", "woody", "خشبي"],
  floral: ["rose", "jasmine", "iris", "flower", "geranium", "ورد", "ياسمين", "سوسن", "زهور", "جيرانيوم", "floral", "زهري"],
  citrus: ["citrus", "bergamot", "lemon", "orange", "grapefruit", "lime", "حمض", "برغموت", "ليمون", "برتقال", "جريب فروت"],
  aromatic: ["lavender", "mint", "sage", "rosemary", "لافندر", "نعناع", "مريمية", "إكليل", "aromatic", "أروماتيك"],
  leather: ["leather", "suede", "جلد", "شمواه"], fruity: ["apple", "berry", "peach", "pear", "تفاح", "توت", "خوخ", "كمثرى", "fruity", "فواكه"],
  gourmand: ["vanilla", "caramel", "chocolate", "coffee", "cinnamon", "فانيليا", "كراميل", "شوكولاتة", "قهوة", "قرفة", "gourmand", "غورماند"],
  chypre: ["patchouli", "oakmoss", "bergamot", "باتشولي", "طحلب", "برغموت", "chypre", "شيبر"],
  aquatic: ["sea", "marine", "water", "ocean", "بحر", "مائي", "محيط", "aquatic", "أكواتيك"],
  fougere: ["lavender", "oakmoss", "coumarin", "لافندر", "طحلب", "كومارين", "fougere", "فوجير"],
  musky: ["musk", "مسك", "musky", "مسكي"]
};

const feelingFamilies = {
  warmSweet: ["oriental", "gourmand", "musky"], freshClean: ["aquatic", "aromatic", "citrus"], woodyDeep: ["woody", "oriental", "chypre"],
  orientalLuxurious: ["oriental", "woody", "leather"], citrusyFresh: ["citrus", "aromatic", "aquatic"], floralSoft: ["floral", "musky"],
  leatheryBold: ["leather", "woody", "oriental"], greenNatural: ["aromatic", "fougere", "chypre"]
};

const personalityFamilies = {
  leader: ["oriental", "woody", "leather"], calm: ["musky", "floral", "aquatic"], social: ["citrus", "aromatic", "fruity"],
  bold: ["leather", "oriental", "woody"], romantic: ["floral", "gourmand", "musky"], practical: ["aromatic", "woody", "citrus"],
  artistic: ["chypre", "floral", "gourmand"], adventurous: ["woody", "aquatic", "fougere"]
};

const usageFamilies = {
  daily: ["aromatic", "citrus", "musky"], special: ["oriental", "gourmand", "floral"], romantic: ["floral", "gourmand", "musky"],
  travel: ["aquatic", "citrus", "aromatic"], formal: ["woody", "oriental", "chypre"], sport: ["citrus", "aquatic", "aromatic"],
  relax: ["musky", "floral", "aromatic"], religious: ["oriental", "woody", "musky"], other: []
};

const normalize = (value) => String(value || "").normalize("NFKD").toLowerCase().replace(/[ًٌٍَُِّْـ]/g, "").trim();
const unique = (values) => [...new Set((values || []).filter(Boolean))];
const overlap = (wanted, actual) => !wanted.length ? null : wanted.filter((item) => actual.includes(item)).length / wanted.length;

function noteIds(product) {
  const text = [...(product.notesAr || []), ...(product.notesEn || []), product.descriptionAr, product.descriptionEn].map(normalize).join(" ");
  return Object.entries(aliases).filter(([, values]) => values.some((value) => text.includes(normalize(value)))).map(([id]) => id);
}

function familyIds(product, notes) {
  const text = [product.familyAr, product.familyEn, ...(product.notesAr || []), ...(product.notesEn || [])].map(normalize).join(" ");
  return Object.entries(familySignals).filter(([, values]) => values.some((value) => text.includes(normalize(value)))).map(([id]) => id);
}

function productSeasons(product) {
  const explicit = (product.seasons || []).map((value) => normalize(value));
  const insight = product.insights?.seasons || {};
  const mapped = ["summer", "spring", "autumn", "winter"].filter((id) => Number(insight[id] || 0) >= 55);
  return unique([...explicit, ...mapped]);
}

function productTimes(product) {
  const insight = product.insights?.seasons || {};
  const values = [];
  if (Number(insight.day || 0) >= 45) values.push("morning", "day");
  if (Number(insight.night || 0) >= 45) values.push("evening", "night");
  return unique(values);
}

function available(product) {
  const quantity = Number(product.inventory?.quantity);
  return product.status === "published" && (!Number.isFinite(quantity) || quantity > 0);
}

function budgetScore(price, budget) {
  if (!budget || budget === "any") return null;
  const ranges = { under500: [0, 500], "500to1500": [500, 1500], "1500to3000": [1500, 3000], over3000: [3000, Infinity] };
  const range = ranges[budget];
  if (!range) return null;
  if (price >= range[0] && price <= range[1]) return 1;
  const distance = price < range[0] ? range[0] - price : price - range[1];
  return Math.max(0, 1 - distance / Math.max(500, Number.isFinite(range[1]) ? range[1] - range[0] : 3000));
}

function seasonTimeScore(product, answers) {
  const seasons = (answers.seasons || []).filter((id) => id !== "any");
  const times = (answers.times || []).filter((id) => id !== "any");
  if (!seasons.length && !times.length) return null;
  const scores = [];
  if (seasons.length) scores.push(overlap(seasons, productSeasons(product)) ?? 0);
  if (times.length) scores.push(overlap(times, productTimes(product)) ?? 0);
  return scores.reduce((sum, value) => sum + value, 0) / scores.length;
}

function performanceScore(product, selected) {
  if (!selected?.length) return null;
  const longevity = Number(product.insights?.longevity || 3);
  const sillage = Number(product.insights?.sillage || 3);
  const value = Number(product.insights?.value || 3);
  return selected.reduce((sum, id) => {
    if (id === "longLasting") return sum + Math.min(1, longevity / 5);
    if (id === "strongProjection") return sum + Math.max(0, 1 - Math.abs(sillage - 5) / 4);
    if (id === "mediumProjection") return sum + Math.max(0, 1 - Math.abs(sillage - 3) / 3);
    if (id === "lightProjection") return sum + Math.max(0, 1 - Math.abs(sillage - 1) / 4);
    return sum + Math.min(1, value / 5);
  }, 0) / selected.length;
}

function referenceSimilarity(product, reference) {
  if (!reference || product.id === reference.id) return 0;
  const productNotes = noteIds(product), referenceNotes = noteIds(reference);
  const productFamilies = familyIds(product, productNotes), referenceFamilies = familyIds(reference, referenceNotes);
  const union = (a, b) => unique([...a, ...b]);
  const jaccard = (a, b) => union(a, b).length ? a.filter((id) => b.includes(id)).length / union(a, b).length : 0;
  const performance = 1 - Math.min(1, (Math.abs(Number(product.insights?.longevity || 3) - Number(reference.insights?.longevity || 3)) + Math.abs(Number(product.insights?.sillage || 3) - Number(reference.insights?.sillage || 3))) / 8);
  return jaccard(productNotes, referenceNotes) * .5 + jaccard(productFamilies, referenceFamilies) * .3 + performance * .2;
}

function scoreProduct(product, answers, reference) {
  const notes = noteIds(product);
  const families = familyIds(product, notes);
  const selectedFeelingFamilies = unique((answers.feelings || []).flatMap((id) => feelingFamilies[id] || []));
  const selectedPersonalityFamilies = unique((answers.personality || []).flatMap((id) => personalityFamilies[id] || []));
  const selectedUsageFamilies = unique((answers.usage || []).flatMap((id) => usageFamilies[id] || []));
  const categoryScores = {
    feelings: overlap(selectedFeelingFamilies, families),
    families: overlap(answers.families || [], families),
    notes: overlap(answers.notes?.liked || [], notes),
    personality: overlap(selectedPersonalityFamilies, families),
    usage: overlap(selectedUsageFamilies, families),
    seasonTime: seasonTimeScore(product, answers),
    features: performanceScore(product, answers.features || []),
    budget: budgetScore(Number(product.price || 0), answers.budget)
  };
  let weighted = 0, activeWeight = 0;
  for (const [key, weight] of Object.entries(FINDER_WEIGHTS)) {
    if (categoryScores[key] == null) continue;
    weighted += categoryScores[key] * weight;
    activeWeight += weight;
  }
  let percentage = activeWeight ? weighted / activeWeight * 100 : 55;
  const dislikedHits = (answers.notes?.disliked || []).filter((id) => notes.includes(id));
  percentage -= Math.min(36, dislikedHits.length * 18);
  const gender = normalize(product.typeEn || product.type);
  if (answers.forWhom === "women" && /men|رجالي/.test(gender) && !/women|نسائي|unisex|للجنسين/.test(gender)) percentage -= 6;
  if (answers.forWhom === "men" && /women|نسائي/.test(gender) && !/men|رجالي|unisex|للجنسين/.test(gender)) percentage -= 6;
  const referenceScore = referenceSimilarity(product, reference);
  percentage += referenceScore * 8;
  const reasons = Object.entries(categoryScores).filter(([, value]) => value != null && value >= .45).sort((a, b) => b[1] - a[1]).map(([key]) => ({ feelings: "feeling", families: "family", notes: "notes", personality: "feeling", usage: "usage", seasonTime: "usage", features: "performance", budget: "budget" }[key]));
  if (referenceScore >= .35) reasons.push("reference");
  return {
    product,
    percentage: Math.round(Math.max(1, Math.min(99, percentage))),
    reasons: unique(reasons).slice(0, 3).length ? unique(reasons).slice(0, 3) : ["general"],
    matchedFamilies: families.filter((id) => (answers.families || []).includes(id)).slice(0, 3),
    matchedNotes: notes.filter((id) => (answers.notes?.liked || []).includes(id)).slice(0, 4),
    dislikedHits,
    categoryScores,
    available: available(product)
  };
}

export function rankFragrances(products = [], answers = {}, options = {}) {
  const published = products.filter((product) => product?.category === "perfume" && product.status !== "draft");
  const reference = published.find((product) => product.id === answers.referenceProductId) || null;
  const ranked = published.map((product) => scoreProduct(product, answers, reference)).sort((a, b) => b.percentage - a.percentage || Number(a.product.price || 0) - Number(b.product.price || 0));
  const limit = Math.max(1, Number(options.limit || 10));
  return {
    available: ranked.filter((result) => result.available).slice(0, limit),
    unavailable: ranked.filter((result) => !result.available).slice(0, limit),
    evaluated: ranked.length,
    weights: FINDER_WEIGHTS
  };
}

export function createEmptyFinderAnswers() {
  return { forWhom: null, feelings: [], families: [], notes: { liked: [], disliked: [] }, personality: [], usage: [], seasons: [], times: [], features: [], budget: "any", referenceProductId: null };
}
