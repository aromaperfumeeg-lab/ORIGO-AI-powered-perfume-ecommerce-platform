import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [app, server, database] = await Promise.all([
  readFile(new URL("../app.js", import.meta.url), "utf8"),
  readFile(new URL("../server.mjs", import.meta.url), "utf8"),
  readFile(new URL("../db.mjs", import.meta.url), "utf8")
]);

test("initial and deferred storefront pages share brand-diverse ordering", () => {
  assert.match(app, /api\("\/api\/products\?offset=0&limit=24&diverse=1"\)/);
  assert.match(app, /offset=\$\{offset\}&limit=48&diverse=1/);
  assert.match(server, /url\.searchParams\.get\("diverse"\) === "1"/);
  assert.match(server, /listProducts\(\{ limit, offset, summary: true, diverse \}\)/);
  assert.match(database, /ROW_NUMBER\(\) OVER \(PARTITION BY lower\(trim\(brand\)\)/);
});
