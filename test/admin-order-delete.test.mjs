import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [app, server] = await Promise.all([
  readFile(new URL("../app.js", import.meta.url), "utf8"),
  readFile(new URL("../server.mjs", import.meta.url), "utf8")
]);

test("orders expose a confirmed delete action backed by trash", () => {
  assert.match(app, /data-action="delete-order"/);
  assert.match(app, /if \(action === "delete-order"\)/);
  assert.match(app, /confirm\(adminCopy/);
  assert.match(app, /\/api\/admin\/orders\/\$\{actionElement\.dataset\.id\}\/trash/);
  assert.match(server, /orders\\\/\(\\d\+\)\\\/\(archive\|restore\|trash\)/);
});
