import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";

const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/(?:([A-Za-z]:))/, "$1"));
const directory = await mkdtemp(join(tmpdir(), "origo-tests-"));
const files = (await readdir(join(root, "test"))).filter((name) => name.endsWith(".test.mjs")).sort().map((name) => join("test", name));
const databasePath = join(directory, "origo-tests.db");
process.env.NODE_ENV = "test";
process.env.ORIGO_DB_PATH = databasePath;
process.env.ORIGO_ALLOW_DATABASE_CREATE = "1";
const database = await import(`../db.mjs?test-fixtures=${Date.now()}`);
for (const [id, brand, nameEn, nameAr] of [
  ["demo-lattafa-khamrah", "Lattafa", "Khamrah", "خمرة"],
  ["demo-lattafa-asad", "Lattafa", "Asad", "أسد"],
  ["demo-xerjoff-naxos", "Xerjoff", "Naxos", "ناكسوس"],
  ["demo-initio-oud-for-greatness", "Initio", "Oud for Greatness", "عود فور غريتنس"]
]) database.upsertProduct({ id, sku:`TEST-${id}`, brand, brandEn:brand, nameEn, nameAr, category:"perfume", status:"published", concentration:"EDP", price:1500, sizes:["100 ML"], notesAr:["عنبر","فانيليا"], notesEn:["Amber","Vanilla"], inventory:{ quantity:10 } });
database.db.close();
const child = spawn(process.execPath, ["--test", "--test-isolation=none", "--test-concurrency=1", ...files], {
  cwd: root,
  stdio: "inherit",
  windowsHide: true,
  env: { ...process.env, NODE_ENV: "test", ORIGO_DB_PATH: databasePath, ORIGO_ALLOW_DATABASE_CREATE: "1" }
});
const exitCode = await new Promise((resolveExit, reject) => {
  child.once("error", reject);
  child.once("exit", (code) => resolveExit(code ?? 1));
});
await rm(directory, { recursive: true, force: true });
process.exitCode = exitCode;
