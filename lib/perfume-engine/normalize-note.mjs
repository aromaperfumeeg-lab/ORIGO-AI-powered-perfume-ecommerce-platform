import { createHash } from "node:crypto";
import { NOTE_KNOWLEDGE_BASE } from "./note-knowledge-base.mjs";

export function normalizeNoteText(value = "") {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[’'`]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .toLowerCase();
}

const aliasIndex = new Map();
for (const [id, entry] of Object.entries(NOTE_KNOWLEDGE_BASE)) {
  for (const alias of [id.replaceAll("_", " "), ...(entry.aliases || [])]) aliasIndex.set(normalizeNoteText(alias), id);
}

export function normalizeNote(value) {
  const original = typeof value === "object" ? String(value?.nameAr || value?.nameEn || value?.label || value?.value || "") : String(value || "");
  const normalized = normalizeNoteText(original);
  const knownId = aliasIndex.get(normalized);
  if (knownId) {
    const knowledge = NOTE_KNOWLEDGE_BASE[knownId];
    return { id: knownId, original, normalized, unknownNote: false, nameAr: knowledge.nameAr, nameEn: knowledge.nameEn };
  }
  const digest = createHash("sha1").update(normalized || original).digest("hex").slice(0, 10);
  return { id: `custom-${digest}`, original, normalized, unknownNote: true, nameAr: original, nameEn: original };
}

export function normalizeNoteLayer(values = []) {
  const result = [];
  const seen = new Set();
  for (const value of Array.isArray(values) ? values : []) {
    const normalized = normalizeNote(value);
    if (!normalized.original || seen.has(normalized.id)) continue;
    seen.add(normalized.id);
    result.push(normalized);
  }
  return result;
}
