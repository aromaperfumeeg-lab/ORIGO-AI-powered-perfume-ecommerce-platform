import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

async function startTestServer({ database, password, port }) {
  const child = spawn(process.execPath, ["server.mjs"], {
    cwd: new URL("../", import.meta.url),
    windowsHide: true,
    env: {
      ...process.env,
      NODE_ENV: "production",
      ORIGO_ALLOW_DATABASE_CREATE: "1",
      ORIGO_DB_PATH: database,
      ORIGO_PORT: String(port),
      ORIGO_ADMIN_EMAIL: "bootstrap-http@example.test",
      ORIGO_ADMIN_PASSWORD: password
    },
    stdio: ["ignore", "pipe", "pipe"]
  });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk; });
  child.stderr.on("data", (chunk) => { output += chunk; });
  const timeoutMs = 90_000;
  const deadline = Date.now() + timeoutMs;
  let lastError = "health endpoint did not respond";
  while (Date.now() < deadline) {
    if (child.exitCode != null) throw new Error(`Server exited before readiness (code ${child.exitCode}).\n${output}`);
    try {
      const response = await fetch(`http://127.0.0.1:${port}/api/health`, { signal: AbortSignal.timeout(1_000) });
      if (response.ok) return { child, health: await response.json(), output: () => output };
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error.message;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  child.kill();
  throw new Error(`Server did not become ready within ${timeoutMs / 1_000}s: ${lastError}.\n${output}`);
}

async function stopServer(child) {
  if (child.exitCode != null) return;
  child.kill();
  await new Promise((resolve) => child.once("exit", resolve));
}

test("production refuses to create a missing database without explicit permission", async () => {
  const directory = await mkdtemp(join(tmpdir(), "origo-production-refuse-"));
  const saved = Object.fromEntries(["NODE_ENV", "ORIGO_DB_PATH", "ORIGO_ALLOW_DATABASE_CREATE"].map((key) => [key, process.env[key]]));
  process.env.NODE_ENV = "production";
  process.env.ORIGO_DB_PATH = join(directory, "missing.db");
  delete process.env.ORIGO_ALLOW_DATABASE_CREATE;
  try {
    await assert.rejects(import(`../db.mjs?refuse=${Date.now()}`), /ORIGO_DATABASE_NOT_FOUND/);
  } finally {
    for (const [key, value] of Object.entries(saved)) value === undefined ? delete process.env[key] : process.env[key] = value;
    await rm(directory, { recursive: true, force: true });
  }
});

test("production preserves the existing database, skips demo seed, and reset is explicit", async () => {
  const directory = await mkdtemp(join(tmpdir(), "origo-production-existing-"));
  const path = join(directory, "production.db");
  const keys = ["NODE_ENV", "ORIGO_DB_PATH", "ORIGO_ALLOW_DATABASE_CREATE", "ORIGO_ADMIN_EMAIL", "ORIGO_ADMIN_PASSWORD"];
  const saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  process.env.NODE_ENV = "production";
  process.env.ORIGO_DB_PATH = path;
  process.env.ORIGO_ALLOW_DATABASE_CREATE = "1";
  process.env.ORIGO_ADMIN_EMAIL = "production-admin@example.test";
  process.env.ORIGO_ADMIN_PASSWORD = "OriginalPassword123!";
  try {
    const first = await import(`../db.mjs?first=${Date.now()}`);
    assert.equal((await first.ensureAdminFromEnvironment()).status, "created");
    assert.equal(first.db.prepare("SELECT COUNT(*) count FROM products").get().count, 0);
    const admin = first.findUserByEmail(process.env.ORIGO_ADMIN_EMAIL);
    first.createSession(admin.id);
    first.db.close();
    delete process.env.ORIGO_ALLOW_DATABASE_CREATE;
    process.env.ORIGO_ADMIN_PASSWORD = "MustNotReplacePassword456!";
    const second = await import(`../db.mjs?second=${Date.now()}`);
    assert.equal((await second.ensureAdminFromEnvironment()).status, "existing");
    assert.equal(await second.verifyPassword("OriginalPassword123!", second.findUserByEmail(process.env.ORIGO_ADMIN_EMAIL).password_hash), true);
    assert.equal(await second.verifyPassword("MustNotReplacePassword456!", second.findUserByEmail(process.env.ORIGO_ADMIN_EMAIL).password_hash), false);
    const reset = await second.resetExistingAdminPassword(process.env.ORIGO_ADMIN_EMAIL, "ReplacementPassword789!");
    assert.equal(reset.changed, true);
    assert.equal(second.db.prepare("SELECT COUNT(*) count FROM sessions WHERE user_id = ?").get(admin.id).count, 0);
    second.db.close();
  } finally {
    for (const [key, value] of Object.entries(saved)) value === undefined ? delete process.env[key] : process.env[key] = value;
    await rm(directory, { recursive: true, force: true });
  }
});

test("health readiness and login survive restart without replacing the admin password", async () => {
  const directory = await mkdtemp(join(tmpdir(), "origo-production-http-"));
  const database = join(directory, "server.db");
  const port = 4188;
  let server;
  try {
    server = await startTestServer({ database, password: "InitialHttpPassword123!", port });
    assert.equal(server.health.adminConfigured, true);
    assert.equal(server.health.databasePathConfigured, true);
    assert.equal(server.health.nodeEnv, "production");
    await stopServer(server.child);
    server = await startTestServer({ database, password: "MustNotReplacePassword456!", port });
    const response = await fetch(`http://127.0.0.1:${port}/api/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "bootstrap-http@example.test", password: "InitialHttpPassword123!", cart: [] })
    });
    assert.equal(response.status, 200);
    assert.match(server.output(), /Admin bootstrap: existing/);
    assert.doesNotMatch(server.output(), /bootstrap-http@example\.test|InitialHttpPassword123|MustNotReplacePassword456/);
  } finally {
    if (server?.child) await stopServer(server.child);
    await rm(directory, { recursive: true, force: true });
  }
});
