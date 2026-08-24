import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const server = await readFile(new URL("../server.mjs", import.meta.url), "utf8");
const database = await readFile(new URL("../db.mjs", import.meta.url), "utf8");
const env = await readFile(new URL("../.env.example", import.meta.url), "utf8");
const deploy = await readFile(new URL("../scripts/build-deploy.mjs", import.meta.url), "utf8");

test("storefront uploads use persistent storage outside production releases", () => {
  assert.match(server,/process\.env\.ORIGO_UPLOAD_DIR/);
  assert.match(server,/const IS_DEPLOYMENT_RUNTIME = process\.env\.NODE_ENV === "production"/);
  assert.match(server,/toLowerCase\(\) === "nodejs"/);
  assert.match(server,/resolve\(dirname\(databasePath\), "uploads", "storefront"\)/);
  assert.match(server,/initializeStorefrontUploadStorage/);
  assert.match(server,/cp\(LEGACY_STOREFRONT_UPLOAD_ROOT, STOREFRONT_UPLOAD_ROOT/);
  assert.match(env,/ORIGO_UPLOAD_DIR=\/home\/USER\/origo-data\/uploads\/storefront/);
  assert.match(deploy,/"storefront-media\.mjs"/);
});

test("legacy storefront URLs remain served from persistent storage", () => {
  assert.match(server,/const uploadPrefix = "\/uploads\/storefront\/"/);
  assert.match(server,/const staticRoot = isPersistentUpload \? STOREFRONT_UPLOAD_ROOT : ROOT/);
});

test("all product-editor relationship upload folders are retained", () => {
  for (const folder of ["hero","gender","brand","product","relationship"]) assert.match(server,new RegExp(`"${folder}"`));
});

test("new storefront media is retained as persistent files while legacy database media remains readable", () => {
  assert.match(database, /CREATE TABLE IF NOT EXISTS storefront_media/);
  assert.match(database, /export function saveStorefrontMedia/);
  assert.match(database, /export function getStorefrontMedia/);
  assert.match(server, /persistStorefrontMediaFile/);
  assert.match(server, /return `\/uploads\/storefront\/\$\{folder\}\/\$\{filename\}`/);
  assert.match(server, /const mediaMatch = url\.pathname\.match/);
  assert.match(server, /max-age=31536000, immutable/);
});
