export const ENGINE_VERSION = 1;
export const LAYER_WEIGHTS = Object.freeze({ top: 0.25, middle: 0.35, base: 0.40 });
export const ACCORD_THRESHOLD = 24;
export const ACCORD_LIMITS = Object.freeze({ minimum: 5, maximum: 8 });

export const METRIC_KEYS = Object.freeze([
  "sweetness", "warmth", "freshness", "spiciness", "woodiness", "fruitiness",
  "floral", "citrus", "creaminess", "earthiness", "smokiness", "powderiness"
]);
