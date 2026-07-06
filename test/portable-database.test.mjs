import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { openPortableDatabase } from "../portable-database.mjs";

test("portable database persists rows without node:sqlite", async () => {
  const directory = await mkdtemp(join(tmpdir(), "origo-db-"));
  const path = join(directory, "store.sqlite");
  try {
    const first = await openPortableDatabase(path);
    first.exec("CREATE TABLE samples (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)");
    const result = first.prepare("INSERT INTO samples (name) VALUES (?)").run("ORIGO");
    assert.equal(result.lastInsertRowid, 1);
    first.close();

    const second = await openPortableDatabase(path);
    assert.deepEqual(second.prepare("SELECT id, name FROM samples").get(), {
      id: 1,
      name: "ORIGO"
    });
    second.close();
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("portable database commits and rolls back transactions", async () => {
  const directory = await mkdtemp(join(tmpdir(), "origo-db-"));
  const path = join(directory, "transactions.sqlite");
  try {
    const database = await openPortableDatabase(path);
    database.exec("CREATE TABLE samples (value TEXT NOT NULL)");
    database.exec("BEGIN IMMEDIATE");
    database.prepare("INSERT INTO samples (value) VALUES (?)").run("kept");
    database.exec("COMMIT");
    database.exec("BEGIN IMMEDIATE");
    database.prepare("INSERT INTO samples (value) VALUES (?)").run("discarded");
    database.exec("ROLLBACK");
    assert.deepEqual(
      database.prepare("SELECT value FROM samples ORDER BY rowid").all(),
      [{ value: "kept" }]
    );
    database.close();
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
