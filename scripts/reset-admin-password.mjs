const confirmed = process.argv.includes("--confirm-reset");
const email = String(process.env.ORIGO_ADMIN_EMAIL || "").trim();
const password = String(process.env.ORIGO_ADMIN_RESET_PASSWORD || "");

if (!confirmed) {
  console.error("Admin password reset was not confirmed. Use --confirm-reset.");
  process.exitCode = 2;
} else if (!email || !password) {
  console.error("ORIGO_ADMIN_EMAIL and the temporary ORIGO_ADMIN_RESET_PASSWORD are required.");
  process.exitCode = 2;
} else {
  let database;
  try {
    database = await import("../db.mjs");
    const result = await database.resetExistingAdminPassword(email, password);
    console.log(`Admin password reset completed; revoked sessions: ${result.sessionsRevoked}.`);
  } catch (error) {
    console.error(`Admin password reset failed: ${error.code || "RESET_FAILED"}.`);
    process.exitCode = 1;
  } finally {
    database?.db.close();
  }
}
