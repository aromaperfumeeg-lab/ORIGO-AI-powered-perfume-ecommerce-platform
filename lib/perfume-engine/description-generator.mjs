const list = (items, key, fallback) => items.map((item) => item[key] || item[fallback] || item.original).filter(Boolean);
const joinAr = (items) => items.length > 1 ? `${items.slice(0, -1).join("، ")} و${items.at(-1)}` : (items[0] || "نوتات عطرية مختارة");
const joinEn = (items) => items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}` : (items[0] || "selected fragrance notes");

export function generateDescriptions({ name = "", layers }) {
  const topAr = joinAr(list(layers.top, "nameAr", "nameEn"));
  const middleAr = joinAr(list(layers.middle, "nameAr", "nameEn"));
  const baseAr = joinAr(list(layers.base, "nameAr", "nameEn"));
  const topEn = joinEn(list(layers.top, "nameEn", "nameAr"));
  const middleEn = joinEn(list(layers.middle, "nameEn", "nameAr"));
  const baseEn = joinEn(list(layers.base, "nameEn", "nameAr"));
  return {
    shortDescriptionAr: `رائحة تبدأ بـ${topAr}، تتطور إلى قلب من ${middleAr}، ثم تستقر على قاعدة من ${baseAr}.`,
    shortDescriptionEn: `A fragrance opening with ${topEn}, developing into a heart of ${middleEn}, and settling on a base of ${baseEn}.`,
    fullDescriptionAr: `${name ? `${name} عطر` : "عطر"} متعدد الطبقات؛ افتتاحيته تجمع ${topAr}، ويتكشف قلبه عبر ${middleAr}، قبل أن تستقر الرائحة على ${baseAr}.`,
    fullDescriptionEn: `${name || "This fragrance"} unfolds in layers: ${topEn} at the opening, ${middleEn} at its heart, and ${baseEn} in the drydown.`,
    openingDescriptionAr: `افتتاحية من ${topAr}.`, openingDescriptionEn: `An opening of ${topEn}.`,
    heartDescriptionAr: `قلب عطري من ${middleAr}.`, heartDescriptionEn: `A heart of ${middleEn}.`,
    baseDescriptionAr: `قاعدة تستقر على ${baseAr}.`, baseDescriptionEn: `A base settling on ${baseEn}.`
  };
}
