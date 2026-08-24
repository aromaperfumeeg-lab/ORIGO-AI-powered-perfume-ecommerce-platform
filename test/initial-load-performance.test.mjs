import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("initial storefront uses the production bundle and a matching service-worker cache", async () => {
  const [html, worker] = await Promise.all([source("../index.html"), source("../sw.js")]);
  assert.match(html, /<script defer src="app\.min\.js\?v=267"><\/script>/);
  assert.doesNotMatch(html, /<script defer src="app\.js\?/);
  assert.match(worker, /"\/app\.min\.js\?v=267"/);
  assert.match(worker, /"\/deferred-modules\.js\?v=12"/);
});

test("catalog renders before session hydration and public products permit short caching", async () => {
  const [app, server] = await Promise.all([source("../app.js"), source("../server.mjs")]);
  const hydrate = app.slice(app.indexOf("async function hydrateServer()"), app.indexOf("async function loadAdminCatalog()"));
  assert.ok(hydrate.indexOf("renderProducts(") < hydrate.indexOf("await Promise.all([sessionRequest, settingsRequest])"));
  assert.match(hydrate, /scheduleStorefrontIdle\(\(\) => hydrateDeferredStorefront/);
  assert.match(server, /public, max-age=15, stale-while-revalidate=60/);
});

test("non-home finder resources are lazy and only the current worker is registered", async () => {
  const [html, deferred] = await Promise.all([source("../index.html"), source("../deferred-modules.js")]);
  assert.doesNotMatch(html, /<script defer src="fragrance-finder/);
  assert.match(html, /data-finder-src="fragrance-finder-engine\.js\?v=2"/);
  assert.match(html, /data-route-href="fragrance-finder\.css\?v=2"/);
  assert.match(deferred, /function loadFinderResources\(\)/);
  assert.match(deferred, /serviceWorker\?\.register\("\/sw\.js"\)/);
  assert.doesNotMatch(deferred, /service-worker\.js/);
});
