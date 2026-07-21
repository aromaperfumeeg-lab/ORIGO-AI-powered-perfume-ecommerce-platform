import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

async function startTestServer({ database, password, port }) {
  const root = new URL("../", import.meta.url);
  const child = spawn(process.execPath, ["server.mjs"], {
    cwd: root,
    windowsHide: true,
    env: {
      ...process.env,
      ORIGO_DB_PATH: database,
      ORIGO_PORT: String(port),
      ORIGO_ADMIN_EMAIL: "bootstrap-http@example.test",
      ORIGO_ADMIN_PASSWORD: password,
      ORIGO_ADMIN_NAME: "Bootstrap HTTP Admin"
    },
    stdio: ["ignore", "pipe", "pipe"]
  });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk; });
  child.stderr.on("data", (chunk) => { output += chunk; });
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (child.exitCode != null) throw new Error("Test server exited before becoming ready");
    try {
      const response = await fetch(`http://127.0.0.1:${port}/api/health`);
      if (response.ok) return { child, health: await response.json(), output: () => output };
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  child.kill();
  throw new Error("Test server readiness timeout");
}

async function stopTestServer(child) {
  if (child.exitCode != null) return;
  child.kill();
  await new Promise((resolve) => child.once("exit", resolve));
}

test("admin bootstrap creates once, preserves the password, and reports configured health", async () => {
  const directory = await mkdtemp(join(tmpdir(), "origo-admin-bootstrap-"));
  const previous = {
    path: process.env.ORIGO_DB_PATH,
    email: process.env.ORIGO_ADMIN_EMAIL,
    password: process.env.ORIGO_ADMIN_PASSWORD
  };
  process.env.ORIGO_DB_PATH = join(directory, "bootstrap.db");
  process.env.ORIGO_ADMIN_EMAIL = "admin-bootstrap@example.test";
  process.env.ORIGO_ADMIN_PASSWORD = "InitialPassword123!";
  try {
    const database = await import(`../db.mjs?admin-bootstrap=${Date.now()}`);
    const first = await database.ensureAdminFromEnvironment();
    const originalHash = database.findUserByEmail(process.env.ORIGO_ADMIN_EMAIL).password_hash;
    process.env.ORIGO_ADMIN_PASSWORD = "DifferentPassword456!";
    const second = await database.ensureAdminFromEnvironment();
    const user = database.findUserByEmail(process.env.ORIGO_ADMIN_EMAIL);
    assert.deepEqual([first.status, second.status], ["created", "existing"]);
    assert.equal(user.staff_role || user.role, "admin");
    assert.equal(user.password_hash, originalHash);
    assert.equal(await database.verifyPassword("InitialPassword123!", user.password_hash), true);
    assert.equal(await database.verifyPassword("DifferentPassword456!", user.password_hash), false);
    assert.equal(database.adminConfiguredFromEnvironment(), true);
  } finally {
    if (previous.path === undefined) delete process.env.ORIGO_DB_PATH; else process.env.ORIGO_DB_PATH = previous.path;
    if (previous.email === undefined) delete process.env.ORIGO_ADMIN_EMAIL; else process.env.ORIGO_ADMIN_EMAIL = previous.email;
    if (previous.password === undefined) delete process.env.ORIGO_ADMIN_PASSWORD; else process.env.ORIGO_ADMIN_PASSWORD = previous.password;
    await rm(directory, { recursive: true, force: true });
  }
});

test("login uses the same relative API route as the server and health exposes no secret", async () => {
  const [app, server] = await Promise.all([
    readFile(new URL("../app.js", import.meta.url), "utf8"),
    readFile(new URL("../server.mjs", import.meta.url), "utf8")
  ]);
  assert.match(app, /api\(`\/api\/auth\/\$\{mode\}`/);
  assert.match(server, /url\.pathname === "\/api\/auth\/login"/);
  assert.match(server, /adminConfigured: adminConfiguredFromEnvironment\(\)/);
  assert.doesNotMatch(app, /fetch\(["'`]https?:\/\/(localhost|127\.0\.0\.1)/);
  assert.doesNotMatch(server, /console\.log\([^\n]*(ORIGO_ADMIN_EMAIL|ORIGO_ADMIN_PASSWORD)[^\n]*process\.env/);
});

test("real server login succeeds and a restart reports the existing admin", async () => {
  const directory = await mkdtemp(join(tmpdir(), "origo-admin-http-"));
  const database = join(directory, "server.db");
  const port = 4187;
  let first;
  let second;
  try {
    first = await startTestServer({ database, password: "InitialHttpPassword123!", port });
    const firstLogin = await fetch(`http://127.0.0.1:${port}/api/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "bootstrap-http@example.test", password: "InitialHttpPassword123!", cart: [] })
    });
    const firstPayload = await firstLogin.json();
    assert.equal(first.health.adminConfigured, true);
    assert.equal(firstLogin.status, 200);
    assert.equal(firstPayload.user.role, "admin");
    assert.match(first.output(), /Admin bootstrap: created/);
    assert.doesNotMatch(first.output(), /bootstrap-http@example\.test|InitialHttpPassword123!/);
    await stopTestServer(first.child);
    first = null;

    second = await startTestServer({ database, password: "MustNotReplacePassword456!", port });
    const secondLogin = await fetch(`http://127.0.0.1:${port}/api/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "bootstrap-http@example.test", password: "InitialHttpPassword123!", cart: [] })
    });
    const secondPayload = await secondLogin.json();
    assert.equal(second.health.adminConfigured, true);
    assert.equal(secondLogin.status, 200);
    assert.equal(secondPayload.user.role, "admin");
    assert.match(second.output(), /Admin bootstrap: existing/);
    assert.doesNotMatch(second.output(), /bootstrap-http@example\.test|MustNotReplacePassword456!/);
  } finally {
    if (first?.child) await stopTestServer(first.child);
    if (second?.child) await stopTestServer(second.child);
    await rm(directory, { recursive: true, force: true });
  }
});
