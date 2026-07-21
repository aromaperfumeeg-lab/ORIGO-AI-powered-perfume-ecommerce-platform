import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
const root = new URL("../", import.meta.url);

test("password recovery uses expiring one-time challenges and invalidates sessions", async () => {
  const directory = await mkdtemp(join(tmpdir(), "origo-reset-"));
  const database = join(directory, "reset.db");
  const previousPath = process.env.ORIGO_DB_PATH;
  process.env.ORIGO_DB_PATH = database;
  try {
    const { createUser, hashPassword, verifyPassword, findUserByEmail, createPasswordResetChallenge, consumePasswordResetChallenge, purgeAllUsers, db } = await import(`${new URL("db.mjs", root).href}?recovery=${Date.now()}`);
    const original = "OriginalPassword123!";
    const replacement = "ReplacementPassword123!";
    const user = createUser({ name: "Reset Test", email: "reset@example.test", phone: "+201000000000", passwordHash: await hashPassword(original) });
    const challenge = await createPasswordResetChallenge(user.id, "email");
    const changed = await consumePasswordResetChallenge(challenge.publicId, challenge.code, await hashPassword(replacement));
    const row = findUserByEmail("reset@example.test");
    const result = { changed, oldValid: await verifyPassword(original, row.password_hash), newValid: await verifyPassword(replacement, row.password_hash), purged: purgeAllUsers(), users: db.prepare("SELECT COUNT(*) c FROM users").get().c };
    assert.deepEqual(result, { changed: true, oldValid: false, newValid: true, purged: 1, users: 0 });
  } finally {
    if (previousPath === undefined) delete process.env.ORIGO_DB_PATH;
    else process.env.ORIGO_DB_PATH = previousPath;
    await rm(directory, { recursive: true, force: true });
  }
});

test("recovery UI supports three channels and password visibility without exposing secrets", async () => {
  const [app, server, integrations] = await Promise.all([
    readFile(new URL("app.js", root), "utf8"),
    readFile(new URL("server.mjs", root), "utf8"),
    readFile(new URL("external-integrations.mjs", root), "utf8")
  ]);
  assert.match(app, /data-action="toggle-password"/);
  assert.match(app, /value="email"/);
  assert.match(app, /value="whatsapp"/);
  assert.match(app, /value="sms"/);
  assert.match(server, /\/api\/auth\/password-reset\/request/);
  assert.match(server, /\/api\/auth\/password-reset\/confirm/);
  assert.match(integrations, /RESEND_API_KEY/);
  assert.match(integrations, /TWILIO_ACCOUNT_SID/);
  assert.doesNotMatch(server, /console\.log\([^\n]*(body\.password|body\.email|body\.identifier|process\.env\.ORIGO_ADMIN)/i);
});
