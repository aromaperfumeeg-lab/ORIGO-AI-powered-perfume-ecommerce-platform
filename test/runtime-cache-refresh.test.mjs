import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [html, deferred, worker] = await Promise.all([
  readFile(new URL("../index.html", import.meta.url), "utf8"),
  readFile(new URL("../deferred-modules.js", import.meta.url), "utf8"),
  readFile(new URL("../sw.js", import.meta.url), "utf8")
]);

test("runtime checks the service worker immediately and reloads once after an update", () => {
  assert.match(deferred, /register\("\/sw\.js", \{ updateViaCache:"none" \}\)/);
  assert.match(deferred, /registration\.update\(\)/);
  assert.match(deferred, /addEventListener\("controllerchange"/);
  assert.match(deferred, /origoRuntimeReload-v152/);
  assert.match(deferred, /location\.reload\(\)/);
  assert.match(html, /deferred-modules\.js\?v=14/);
  assert.match(worker, /origo-static-v152/);
  assert.match(worker, /deferred-modules\.js\?v=14/);
});
