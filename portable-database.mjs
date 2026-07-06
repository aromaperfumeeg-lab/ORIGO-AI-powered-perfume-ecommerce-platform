import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createRequire } from "node:module";
import initSqlJs from "sql.js";

const require = createRequire(import.meta.url);
const wasmPath = require.resolve("sql.js/dist/sql-wasm.wasm");

function statementRows(database, sql, parameters, firstOnly = false) {
  const statement = database.prepare(sql);
  try {
    if (parameters.length) statement.bind(parameters);
    const rows = [];
    while (statement.step()) {
      rows.push(statement.getAsObject());
      if (firstOnly) break;
    }
    return firstOnly ? rows[0] : rows;
  } finally {
    statement.free();
  }
}

class PortableStatement {
  constructor(owner, sql) {
    this.owner = owner;
    this.sql = sql;
  }

  all(...parameters) {
    return statementRows(this.owner.raw, this.sql, parameters);
  }

  get(...parameters) {
    return statementRows(this.owner.raw, this.sql, parameters, true);
  }

  run(...parameters) {
    this.owner.raw.run(this.sql, parameters);
    const changes = Number(this.owner.raw.getRowsModified() || 0);
    const lastInsertRowid = Number(
      statementRows(this.owner.raw, "SELECT last_insert_rowid() AS id", [], true)?.id || 0
    );
    this.owner.persistIfReady();
    return { changes, lastInsertRowid };
  }
}

class PortableDatabase {
  constructor(raw, path) {
    this.raw = raw;
    this.path = path;
    this.transactionDepth = 0;
    this.closed = false;
  }

  prepare(sql) {
    if (this.closed) throw new Error("Database is closed.");
    return new PortableStatement(this, sql);
  }

  exec(sql) {
    if (this.closed) throw new Error("Database is closed.");
    const command = String(sql).trim().toUpperCase();
    this.raw.exec(sql);
    if (command.startsWith("BEGIN")) {
      this.transactionDepth += 1;
      return;
    }
    if (command.startsWith("COMMIT") || command.startsWith("ROLLBACK")) {
      this.transactionDepth = Math.max(0, this.transactionDepth - 1);
    }
    this.persistIfReady();
  }

  persistIfReady() {
    if (!this.closed && this.transactionDepth === 0) this.persist();
  }

  persist() {
    mkdirSync(dirname(this.path), { recursive: true });
    const temporaryPath = `${this.path}.${process.pid}.tmp`;
    writeFileSync(temporaryPath, Buffer.from(this.raw.export()));
    renameSync(temporaryPath, this.path);
  }

  close() {
    if (this.closed) return;
    this.persist();
    this.raw.close();
    this.closed = true;
  }
}

export async function openPortableDatabase(databasePath) {
  const SQL = await initSqlJs({
    locateFile: (filename) => filename.endsWith(".wasm") ? wasmPath : filename
  });
  const path = resolve(databasePath);
  const bytes = existsSync(path) ? new Uint8Array(readFileSync(path)) : undefined;
  return new PortableDatabase(new SQL.Database(bytes), path);
}
