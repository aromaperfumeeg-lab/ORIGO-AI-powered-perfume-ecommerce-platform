import { createHash } from "node:crypto";

export const STOREFRONT_IMAGE_MAX_BYTES = 100 * 1024;
export const STOREFRONT_SETTINGS_MAX_BYTES = 100 * 1024;

const MIME_EXTENSIONS = Object.freeze({
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg"
});

function safeSvg(bytes) {
  const source = bytes.toString("utf8");
  if (!/^\s*<svg\b/i.test(source)) return false;
  return !/<(?:script|foreignObject|iframe|object|embed)\b|\son\w+\s*=|(?:href|src)\s*=\s*["']\s*(?:javascript:|https?:|data:)/i.test(source);
}

export function parseStorefrontDataImage(value) {
  const match = String(value || "").match(/^data:(image\/(?:webp|png|jpeg|svg\+xml));base64,([a-z0-9+/=]+)$/i);
  if (!match) return null;
  const mimeType = match[1].toLowerCase();
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > STOREFRONT_IMAGE_MAX_BYTES) {
    const error = new Error("STOREFRONT_IMAGE_REQUIRES_COMPRESSION");
    error.code = "STOREFRONT_IMAGE_REQUIRES_COMPRESSION";
    throw error;
  }
  if (mimeType === "image/svg+xml" && !safeSvg(bytes)) {
    const error = new Error("UNSAFE_STOREFRONT_SVG");
    error.code = "UNSAFE_STOREFRONT_SVG";
    throw error;
  }
  return {
    bytes,
    mimeType,
    extension: MIME_EXTENSIONS[mimeType],
    hash: createHash("sha256").update(bytes).digest("hex")
  };
}

export async function externalizeStorefrontSettingsMedia(settings, persist) {
  const urls = new Map();
  let converted = 0;
  const visit = async (value) => {
    if (typeof value === "string" && value.startsWith("data:image/")) {
      if (urls.has(value)) return await urls.get(value);
      const image = parseStorefrontDataImage(value);
      if (!image) return value;
      const pending = Promise.resolve(persist(image));
      urls.set(value, pending);
      const url = await pending;
      urls.set(value, url);
      converted += 1;
      return url;
    }
    if (Array.isArray(value)) return Promise.all(value.map(visit));
    if (value && typeof value === "object") {
      const entries = await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await visit(item)]));
      return Object.fromEntries(entries);
    }
    return value;
  };
  return { settings: await visit(settings || {}), changed: converted > 0, converted };
}

export function assertStorefrontSettingsBudget(settings) {
  const serialized = JSON.stringify(settings || {});
  if (/data:image\//i.test(serialized)) {
    const error = new Error("STOREFRONT_SETTINGS_EMBEDDED_MEDIA");
    error.code = "STOREFRONT_SETTINGS_EMBEDDED_MEDIA";
    throw error;
  }
  const bytes = Buffer.byteLength(serialized, "utf8");
  if (bytes >= STOREFRONT_SETTINGS_MAX_BYTES) {
    const error = new Error("STOREFRONT_SETTINGS_BUDGET_EXCEEDED");
    error.code = "STOREFRONT_SETTINGS_BUDGET_EXCEEDED";
    error.sizeBytes = bytes;
    throw error;
  }
  return bytes;
}
