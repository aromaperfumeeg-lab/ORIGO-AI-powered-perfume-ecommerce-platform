import { readFileSync } from "node:fs";

// The existing ORIGO_ACCORD_LIBRARY in app.js remains the single source of truth.
// This adapter reads that exact catalog so the engine cannot drift from the admin UI.
const appSource = readFileSync(new URL("../../app.js", import.meta.url), "utf8");
const marker = "const ORIGO_ACCORD_LIBRARY =";
const markerIndex = appSource.indexOf(marker);
if (markerIndex < 0) throw new Error("ORIGO_ACCORD_LIBRARY was not found in app.js");
const arrayStart = appSource.indexOf("[", markerIndex + marker.length);
const arrayEnd = appSource.indexOf("\n];", arrayStart);
if (arrayStart < 0 || arrayEnd < 0) throw new Error("ORIGO_ACCORD_LIBRARY could not be parsed");

const tuples = Function(`"use strict"; return (${appSource.slice(arrayStart, arrayEnd + 2)});`)();

export const ACCORD_CATALOG = Object.freeze(tuples.map(([id, labelAr, labelEn, color, icon]) => Object.freeze({
  id,
  labelAr,
  labelEn,
  color,
  icon
})));

const byId = new Map(ACCORD_CATALOG.map((item) => [item.id, item]));
const normalizedId = (value = "") => String(value).trim().toLowerCase().replaceAll("_", "-");

export function accordById(id) {
  return byId.get(normalizedId(id)) || null;
}

export function isControlledAccord(id) {
  return byId.has(normalizedId(id));
}

export function resolveAccords(accords = []) {
  return accords.map((entry) => {
    const id = normalizedId(typeof entry === "string" ? entry : entry?.id);
    const catalog = accordById(id);
    if (!catalog) return null;
    const score = Math.max(0, Math.min(100, Math.round(Number(entry?.score ?? entry?.strength ?? 0))));
    return { ...catalog, score, strength: score, source: entry?.source || "generated" };
  }).filter(Boolean);
}
