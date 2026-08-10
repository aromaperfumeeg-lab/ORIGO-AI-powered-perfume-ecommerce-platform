import { createHash } from "node:crypto";
import { ACCORD_CATALOG, accordById, isControlledAccord, resolveAccords } from "./accord-catalog.mjs";
import { ACCORD_LIMITS, ACCORD_THRESHOLD, ENGINE_VERSION, LAYER_WEIGHTS, METRIC_KEYS } from "./config.mjs";
import { NOTE_KNOWLEDGE_BASE } from "./note-knowledge-base.mjs";
import { normalizeNoteLayer } from "./normalize-note.mjs";
import { generateDescriptions } from "./description-generator.mjs";

const clamp = (value) => Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
const weighted = (profile, factors) => clamp(Object.entries(factors).reduce((sum, [key, weight]) => sum + Number(profile[key] || 0) * weight, 0));

export function perfumeInputFromProduct(product = {}) {
  const notes = product.notes || {};
  return {
    name: product.nameAr || product.nameEn || "",
    releaseYear: product.releaseYear ?? null,
    topNotes: product.noteSelections?.top || notes.topAr || notes.topEn || [],
    middleNotes: product.noteSelections?.heart || notes.heartAr || notes.heartEn || [],
    baseNotes: product.noteSelections?.base || notes.baseAr || notes.baseEn || []
  };
}

export function fingerprintPerfumeInput(input = {}) {
  const stable = JSON.stringify({
    name: String(input.name || "").trim(), releaseYear: input.releaseYear ?? null,
    topNotes: input.topNotes || [], middleNotes: input.middleNotes || [], baseNotes: input.baseNotes || []
  });
  return createHash("sha256").update(stable).digest("hex");
}

function scoreLayers(layers) {
  const accordRaw = new Map();
  const metricTotals = Object.fromEntries(METRIC_KEYS.map((key) => [key, 0]));
  let knownWeight = 0;
  let totalWeight = 0;
  for (const [layer, notes] of Object.entries(layers)) {
    const layerWeight = LAYER_WEIGHTS[layer];
    for (const normalized of notes) {
      totalWeight += layerWeight;
      const knowledge = NOTE_KNOWLEDGE_BASE[normalized.id];
      if (!knowledge) continue;
      knownWeight += layerWeight;
      for (const [accordId, contribution] of Object.entries(knowledge.accordWeights || {})) {
        if (!isControlledAccord(accordId)) continue;
        accordRaw.set(accordId, (accordRaw.get(accordId) || 0) + contribution * layerWeight);
      }
      for (const key of METRIC_KEYS) metricTotals[key] += Number(knowledge.metrics?.[key] || 0) * layerWeight;
    }
  }
  const knownIds = new Set(Object.values(layers).flat().filter((note) => !note.unknownNote).map((note) => note.id));
  const synergy = (id, amount) => { if (isControlledAccord(id)) accordRaw.set(id, (accordRaw.get(id) || 0) + amount); };
  if (knownIds.has("vanilla") && [...knownIds].some((id) => ["benzoin", "caramel", "creme_brulee", "cinnamon"].includes(id))) synergy("sweet", .22);
  if (["cinnamon", "black_pepper", "turmeric"].filter((id) => knownIds.has(id)).length >= 2) synergy("warm-spicy", .28);
  if (["sandalwood", "cashmere_wood", "cedar", "oud"].filter((id) => knownIds.has(id)).length >= 2) synergy("woody", .24);
  if (knownIds.has("benzoin") && knownIds.has("vanilla")) synergy("balsamic", .18);
  const maxAccord = Math.max(...accordRaw.values(), 1);
  let accords = [...accordRaw].map(([id, raw]) => ({ id, score: clamp((raw / maxAccord) * 100), source: "generated" })).sort((a, b) => b.score - a.score);
  const aboveThreshold = accords.filter((item) => item.score >= ACCORD_THRESHOLD);
  accords = (aboveThreshold.length >= ACCORD_LIMITS.minimum ? aboveThreshold : accords.slice(0, ACCORD_LIMITS.minimum)).slice(0, ACCORD_LIMITS.maximum);
  const denominator = Math.max(knownWeight, .001);
  const metrics = Object.fromEntries(METRIC_KEYS.map((key) => [key, clamp((metricTotals[key] / denominator) * 100)]));
  return { accords, metrics, knownWeight, totalWeight };
}

function deriveSeasons(metrics) {
  const winter = weighted(metrics, { warmth: .42, sweetness: .18, spiciness: .16, woodiness: .14, smokiness: .1 });
  const autumn = weighted(metrics, { warmth: .34, woodiness: .22, spiciness: .18, earthiness: .14, sweetness: .12 });
  const spring = weighted(metrics, { floral: .35, freshness: .3, fruitiness: .2, citrus: .15 });
  const summer = clamp(weighted(metrics, { freshness: .5, citrus: .28, fruitiness: .16, floral: .06 }) - metrics.warmth * .2 - metrics.sweetness * .1);
  return { winter: clamp(winter * 2 + 12), autumn: clamp(autumn * 2 + 10), spring: clamp(spring * 1.8 + 8), summer: clamp(summer * 1.8) };
}

function deriveTime(metrics) {
  return {
    day: clamp(weighted(metrics, { freshness: .38, citrus: .22, floral: .18, fruitiness: .14, powderiness: .08 }) - metrics.smokiness * .12),
    night: weighted(metrics, { warmth: .3, sweetness: .2, spiciness: .17, woodiness: .14, smokiness: .1, earthiness: .09 })
  };
}

function deriveOccasions(metrics, time) {
  return {
    daily: weighted(metrics, { freshness: .34, citrus: .2, floral: .17, fruitiness: .16, powderiness: .13 }),
    work: clamp(weighted(metrics, { freshness: .38, citrus: .2, floral: .16, woodiness: .14, powderiness: .12 }) - metrics.sweetness * .12 - metrics.smokiness * .12),
    formal: weighted(metrics, { woodiness: .28, warmth: .2, spiciness: .16, earthiness: .14, smokiness: .12, floral: .1 }),
    evening: clamp(time.night),
    party: weighted(metrics, { sweetness: .32, warmth: .23, spiciness: .2, fruitiness: .15, smokiness: .1 }),
    date: weighted(metrics, { sweetness: .28, warmth: .25, floral: .18, creaminess: .15, spiciness: .14 }),
    specialOccasion: weighted(metrics, { warmth: .25, woodiness: .2, sweetness: .18, spiciness: .15, floral: .12, smokiness: .1 }),
    casual: weighted(metrics, { freshness: .35, fruitiness: .25, citrus: .2, floral: .12, powderiness: .08 })
  };
}

function deriveCharacter(metrics) {
  const candidates = [
    ["دافئ", "Warm", metrics.warmth], ["مشرق", "Bright", weighted(metrics, { freshness: .55, citrus: .45 })],
    ["غني", "Rich", weighted(metrics, { warmth: .3, sweetness: .25, woodiness: .2, spiciness: .15, creaminess: .1 })],
    ["جريء", "Bold", weighted(metrics, { spiciness: .35, smokiness: .3, woodiness: .2, earthiness: .15 })],
    ["ناعم", "Soft", weighted(metrics, { powderiness: .45, creaminess: .35, floral: .2 })],
    ["حيوي", "Energetic", weighted(metrics, { freshness: .45, citrus: .3, fruitiness: .25 })],
    ["رومانسي", "Romantic", weighted(metrics, { floral: .42, sweetness: .28, creaminess: .2, warmth: .1 })],
    ["داكن", "Dark", weighted(metrics, { smokiness: .38, woodiness: .27, earthiness: .2, warmth: .15 })],
    ["فاخر", "Luxurious", weighted(metrics, { warmth: .25, woodiness: .22, creaminess: .18, spiciness: .15, floral: .1, smokiness: .1 })]
  ];
  return candidates.sort((a, b) => b[2] - a[2]).slice(0, 5).map(([labelAr, labelEn, score]) => ({ labelAr, labelEn, score: clamp(score * 1.35) }));
}

function deriveFamilies(accords) {
  const map = { woody: "woody", oud: "woody", floral: "floral", "white-floral": "floral", rose: "floral", citrus: "citrus", aromatic: "aromatic", fruity: "fruity", aquatic: "aquatic", marine: "aquatic", leather: "leather", musky: "musky", amber: "amber", "warm-spicy": "oriental", balsamic: "oriental", sweet: "gourmand", vanilla: "gourmand", caramel: "gourmand" };
  return [...new Set(accords.map((item) => map[item.id]).filter(Boolean))].slice(0, 3);
}

export function applyManualOverride(profile, overrides = []) {
  if (!Array.isArray(overrides) || !overrides.length) return profile;
  const controlled = overrides.map((item) => ({ id: String(item.id || "").replaceAll("_", "-"), score: clamp(item.score), source: "manual_override" })).filter((item) => accordById(item.id));
  if (!controlled.length) return profile;
  return { ...profile, accords: controlled.sort((a, b) => b.score - a.score).slice(0, ACCORD_LIMITS.maximum), source: "manual_override", manualOverrides: controlled };
}

export function analyzePerfume(input = {}, options = {}) {
  const layers = {
    top: normalizeNoteLayer(input.topNotes),
    middle: normalizeNoteLayer(input.middleNotes),
    base: normalizeNoteLayer(input.baseNotes)
  };
  const scored = scoreLayers(layers);
  const seasons = deriveSeasons(scored.metrics);
  const time = deriveTime(scored.metrics);
  const occasions = deriveOccasions(scored.metrics, time);
  const normalizedNotes = Object.fromEntries(Object.entries(layers).map(([key, notes]) => [key, notes.map(({ id, original, nameAr, nameEn, unknownNote }) => ({ id, original, nameAr, nameEn, unknownNote }))]));
  let profile = {
    engineVersion: ENGINE_VERSION,
    inputFingerprint: fingerprintPerfumeInput(input),
    profileStatus: "fresh",
    source: "generated",
    accords: scored.accords,
    scentFamilies: deriveFamilies(scored.accords),
    character: deriveCharacter(scored.metrics),
    metrics: scored.metrics,
    seasons,
    time,
    occasions,
    descriptions: generateDescriptions({ name: input.name, layers }),
    normalizedNotes,
    confidence: {
      score: clamp((scored.knownWeight / Math.max(scored.totalWeight, .001)) * 100),
      knownNotes: Object.values(layers).flat().filter((note) => !note.unknownNote).length,
      unknownNotes: Object.values(layers).flat().filter((note) => note.unknownNote).length
    },
    generatedAt: new Date().toISOString()
  };
  if (options.manualOverrides?.length) profile = applyManualOverride(profile, options.manualOverrides);
  return profile;
}

export { ACCORD_CATALOG, ENGINE_VERSION, accordById, resolveAccords };
