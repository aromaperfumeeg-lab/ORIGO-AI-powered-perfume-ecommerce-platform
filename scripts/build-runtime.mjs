import { mkdir, readFile, writeFile } from "node:fs/promises";
import { minify } from "terser";
import { parse } from "../node_modules/terser/lib/parse.js";

const root = new URL("../", import.meta.url);
const source = await readFile(new URL("app.js", root), "utf8");
const ast = parse(source);
const groups = {
  admin:[],
  "product-editor":[],
  "storefront-settings":[]
};

const boundaries = {
  admin:[source.indexOf("async function loadAdminCatalog"), source.indexOf("function passwordFieldMarkup")],
  "storefront-settings":[source.indexOf("function settingsMarkup"), source.indexOf("function openSystemModal")],
  "product-editor":[source.indexOf("const csv ="), source.indexOf("function observeReveals")]
};
for (const [name, [start, end]] of Object.entries(boundaries)) {
  if (start < 0 || end <= start) throw new Error(`Unable to locate ${name} runtime boundaries`);
}

function targetFor(position, name = "") {
  if (["brandIdentity", "brandMatches"].includes(name)) return "";
  if (["handleAdminOrderRoute", "normalizeOptionSearch", "applyHomepageRailSettings", "homeHeroTargetHref", "perfumeResolvedAccords", "seoKeywordValues", "systemStatesMarkup"].includes(name)) return "";
  if (source.slice(position, position + 80).startsWith("const ORIGO_ACCORD_LIBRARY")) return "";
  if (position >= boundaries["storefront-settings"][0] && position < boundaries["storefront-settings"][1]) return "storefront-settings";
  if (position >= boundaries.admin[0] && position < boundaries.admin[1]) return "admin";
  if (position >= boundaries["product-editor"][0] && position < boundaries["product-editor"][1]) return "product-editor";
  return "";
}

const removals = [];
for (const node of ast.body) {
  const target = targetFor(node.start.pos, node.name?.name || "");
  if (!target) continue;
  const start = node.start.pos;
  const end = node.end.pos + String(node.end.value || "").length;
  groups[target].push(source.slice(start, end));
  removals.push([start, end]);
}

let storefront = source;
for (const [start, end] of removals.sort((a, b) => b[0] - a[0])) {
  storefront = `${storefront.slice(0, start)}\n${storefront.slice(end)}`;
}

await mkdir(new URL("chunks/", root), { recursive:true });
const outputs = {
  "storefront-core.min.js":storefront,
  "admin-runtime.min.js":groups.admin.join("\n"),
  "product-editor-runtime.min.js":groups["product-editor"].join("\n"),
  "storefront-settings-runtime.min.js":groups["storefront-settings"].join("\n")
};
for (const [name, code] of Object.entries(outputs)) {
  const result = await minify(code, { compress:{ passes:2 }, mangle:false, format:{ comments:false } });
  if (!result.code) throw new Error(`Empty runtime chunk: ${name}`);
  await writeFile(new URL(`chunks/${name}`, root), `${result.code}\n`);
}
console.log(Object.fromEntries(await Promise.all(Object.keys(outputs).map(async (name) => [name, (await readFile(new URL(`chunks/${name}`, root))).length]))));

for (const name of ["styles", "home", "shell", "home-gender-slider", "origo-identity", "no-effects", "appearance"]) {
  const css = await readFile(new URL(`${name}.css`, root), "utf8");
  const compact = css.replace(/\/\*[\s\S]*?\*\//g, "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).join("");
  await writeFile(new URL(`chunks/${name}.min.css`, root), compact);
}
