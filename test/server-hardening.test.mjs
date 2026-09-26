import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const port = 4193;
let child;
let fixtureDirectory;

async function ready() {
  fixtureDirectory = await mkdtemp(join(tmpdir(), "origo-hardening-"));
  const fixtureDatabase = join(fixtureDirectory, "hardening.db");
  await cp(new URL("../data/origo.db", import.meta.url), fixtureDatabase);
  child = spawn(process.execPath, ["server.mjs"], {
    cwd:new URL("../", import.meta.url), windowsHide:true, stdio:["ignore","pipe","pipe"],
    env:{ ...process.env, NODE_ENV:"production", ORIGO_PORT:String(port), ORIGO_DB_PATH:fixtureDatabase, ORIGO_ALLOW_DATABASE_CREATE:"0" }
  });
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { const response = await fetch(`http://127.0.0.1:${port}/api/health`); if (response.ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("hardening server readiness timeout");
}

test("routes, security headers, body limits, and pruned product HTML are hardened", async (t) => {
  await ready();
  t.after(async () => { if (child && child.exitCode == null) { child.kill(); await new Promise((resolve) => child.once("exit", resolve)); } });
  t.after(async () => { if (fixtureDirectory) await rm(fixtureDirectory, { recursive:true, force:true }); });
  const { products } = await (await fetch(`http://127.0.0.1:${port}/api/products?limit=1`)).json();
  assert.ok(products.length, "the route fixture requires one published product");
  const product = products[0];
  const slug = (value) => String(value ?? "").normalize("NFKD").toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
  const productPath = `/perfume/${encodeURIComponent(product.slug || slug([product.brandEn || product.brand, product.nameEn || product.nameAr].filter(Boolean).join("-")) || product.id)}`;
  const brandPath = `/brands/${slug(product.brandEn || product.brand || product.brandAr)}`;
  for (const path of [productPath, brandPath]) assert.equal((await fetch(`http://127.0.0.1:${port}${path}`)).status, 200);
  for (const path of ["/perfume/does-not-exist", "/brands/does-not-exist"]) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`);
    assert.equal(response.status, 404);
    assert.match(await response.text(), /noindex,follow/);
  }
  const productResponse = await fetch(`http://127.0.0.1:${port}${productPath}`, { headers:{ "x-forwarded-proto":"https" } });
  assert.match(productResponse.headers.get("content-security-policy") || "", /object-src 'none'/);
  assert.doesNotMatch(productResponse.headers.get("content-security-policy") || "", /script-src[^;]*unsafe-inline/);
  assert.equal(productResponse.headers.get("strict-transport-security"), "max-age=15552000");
  const html = await productResponse.text();
  assert.match(html, /storefront-product-critical\.min\.css\?v=1/);
  assert.doesNotMatch(html, /storefront-home-critical\.min\.css\?v=1/);
  assert.match(html, /data-route-pruned="product"/);
  assert.doesNotMatch(html, /id="home-hero"/);
  assert.doesNotMatch(html, /class="advanced-admin-overlay"/);
  assert.match(html, /data-runtime-fragment="\/admin-runtime-fragment"/);
  const publicHome = await fetch(`http://127.0.0.1:${port}/`);
  const publicHomeHtml = await publicHome.text();
  assert.match(publicHomeHtml, /storefront-home-critical\.min\.css\?v=1/);
  assert.doesNotMatch(publicHomeHtml, /لوحة تحكم المتجر|Store dashboard/);
  assert.doesNotMatch(publicHomeHtml, /<button\b[^>]*class="[^"]*mobile-admin-link[^"]*"/i);
  assert.doesNotMatch(publicHomeHtml, /<(?:a|button)\b[^>]*(?:href="\/admin(?:[\/"?#]|$)|data-action="admin")/i);
  const protectedAdminFragment = await fetch(`http://127.0.0.1:${port}/admin-runtime-fragment`);
  assert.equal(protectedAdminFragment.status, 401);
  for (const path of [
    "/scripts/reset-admin-password.mjs",
    "/data/origo.db",
    "/.env",
    "/.git/config",
    "/.diagnostic/private.txt",
    "/.tmp-test",
    "/server.mjs",
    "/package.json",
    "/lib/perfume-engine/index.mjs",
    "/assets/notes/batch77-generation-specs.json",
    "/%2e%2e%2fserver.mjs",
    "/assets/%2e%2e%2fserver.mjs",
    "/../server.mjs"
  ]) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`);
    assert.ok(response.status === 403 || response.status === 404, `${path} returned ${response.status}`);
    assert.doesNotMatch(await response.text(), /resetExistingAdminPassword|createServer|"name"\s*:\s*"origo-store"/);
  }
  for (const path of [
    "/appearance.css",
    "/runtime-loader.js",
    "/deferred-modules.js",
    "/sw.js",
    "/assets/origo-logo.svg",
    "/chunks/runtime-loader.min.js"
  ]) assert.equal((await fetch(`http://127.0.0.1:${port}${path}`)).status, 200, path);
  const local = await fetch(`http://127.0.0.1:${port}/api/health`);
  assert.equal(local.headers.get("strict-transport-security"), null);
  const oversized = await fetch(`http://127.0.0.1:${port}/api/auth/login`, { method:"POST", headers:{ "content-type":"application/json" }, body:JSON.stringify({ value:"x".repeat(70 * 1024) }) });
  assert.equal(oversized.status, 413);
  for (const [path, size] of [
    ["/api/account/profile", 270 * 1024],
    ["/api/admin/storefront-settings", 270 * 1024],
    ["/api/admin/uploads/storefront-image", 190 * 1024],
    ["/api/catalog/save-product", 12 * 1024 * 1024 + 1024]
  ]) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`, { method:"POST", headers:{ "content-type":"application/json" }, body:JSON.stringify({ value:"x".repeat(size) }) });
    assert.equal(response.status, 413, path);
    assert.match(await response.text(), /Payload Too Large|حجم الطلب/i);
  }
});
