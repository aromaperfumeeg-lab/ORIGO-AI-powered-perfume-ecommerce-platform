import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const stage = join(dist, "origo-production");
const archive = join(dist, "origo-production.tar");
const includeData = process.env.DEPLOY_INCLUDE_DATA === "1";
const includeUploads = process.env.DEPLOY_INCLUDE_UPLOADS === "1";

const rootFiles = [
  ".env.example", "index.html", "package.json", "pnpm-lock.yaml", "server.mjs", "db.mjs",
  "portable-database.mjs", "external-integrations.mjs", "storefront-media.mjs", "seo.mjs",
  "commerce-service.mjs", "performance-service.mjs", "scripts/reset-admin-password.mjs"
];

async function copyFile(relativePath) {
  const source = join(root, relativePath);
  const target = join(stage, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await cp(source, target);
}

async function copyTree(relativeDirectory) {
  const source = join(root, relativeDirectory);
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const relativePath = join(relativeDirectory, entry.name).replaceAll("\\", "/");
    if (entry.isDirectory()) await copyTree(relativePath);
    else await copyFile(relativePath);
  }
}

await rm(stage, { recursive: true, force: true });
await rm(archive, { force: true });
await mkdir(stage, { recursive: true });

for (const file of rootFiles) await copyFile(file);
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  const extension = extname(entry.name);
  if (extension === ".css" || extension === ".js") await copyFile(entry.name);
}
if (await stat(join(root, "assets")).catch(() => null)) await copyTree("assets");
if (await stat(join(root, "lib")).catch(() => null)) await copyTree("lib");
if (await stat(join(root, "chunks")).catch(() => null)) await copyTree("chunks");
if (includeUploads && await stat(join(root, "uploads")).catch(() => null)) await copyTree("uploads");
if (includeData && await stat(join(root, "data", "origo.db")).catch(() => null)) await copyFile("data/origo.db");

const sourcePackage = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const productionPackage = {
  name: sourcePackage.name,
  private: true,
  type: sourcePackage.type,
  engines: sourcePackage.engines,
  scripts: {
    start: "node server.mjs",
    "admin:reset-password": "node scripts/reset-admin-password.mjs --confirm-reset"
  },
  dependencies: sourcePackage.dependencies,
  devDependencies: sourcePackage.devDependencies
};
await writeFile(join(stage, "package.json"), `${JSON.stringify(productionPackage, null, 2)}\n`);
await writeFile(join(stage, "DEPLOYMENT.txt"), [
  "ORIGO production package",
  "1. Preserve the server .env, database path, and existing uploads during updates.",
  "2. Extract this archive without deleting persistent server directories.",
  "3. Run: pnpm install --prod --frozen-lockfile",
  "4. Restart the Hostinger Node.js application.",
  includeData ? "WARNING: data/origo.db was explicitly included with DEPLOY_INCLUDE_DATA=1." : "The live database is intentionally excluded.",
  includeUploads ? "WARNING: uploads were explicitly included with DEPLOY_INCLUDE_UPLOADS=1." : "Existing server uploads are intentionally excluded and must be preserved in place."
].join("\n"));

const archiveResult = spawnSync("tar", ["-cf", archive, "-C", stage, "."], { stdio: "inherit" });
if (archiveResult.status !== 0) {
  console.warn("TAR creation was unavailable; the production folder is still ready.");
} else {
  console.log(`Created ${relative(root, archive)}`);
}
