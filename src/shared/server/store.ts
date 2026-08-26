/**
 * Server-side progress store behind a tiny driver interface — shared by all
 * courses. Accounts are global (one sync code covers every course); progress
 * blobs are namespaced per course via the key "<course>-<accountId>".
 *
 * Default driver: Node's built-in SQLite (node:sqlite, available since
 * Node 22.5 — no native build step). If that is unavailable it falls back to
 * one JSON file per (course, account) under data/progress/. Both keep data in
 * ./data, which persists on any long-running server (VPS, container with a
 * volume, `next start` on a desktop).
 *
 * PLACEHOLDER (deployment): on serverless hosts (Vercel/Netlify) the local
 * filesystem does not persist — a hosted DB (Neon/Turso/Supabase) is needed.
 * The driver seam below is where a Postgres/libSQL driver plugs in; it reads
 * process.env.DATABASE_URL and currently only logs a warning that it is not
 * yet configured. See PLACEHOLDERS.md.
 */

import { createHash, randomBytes } from "node:crypto";
import { mkdirSync, existsSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";

export interface StoredProgress {
  state: string; // JSON-serialised ProgressState
  updatedAt: number;
}

interface Driver {
  name: string;
  createAccount(id: string): void;
  hasAccount(id: string): boolean;
  getProgress(key: string): StoredProgress | null;
  putProgress(key: string, state: string): void;
}

const DATA_DIR = path.join(process.cwd(), "data");

/* ---------------- token handling ---------------- */

// no lookalike characters (0/o, 1/l/i)
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

export function newToken(): string {
  const bytes = randomBytes(12);
  let s = "";
  for (let i = 0; i < 12; i++) {
    s += ALPHABET[bytes[i] % ALPHABET.length];
    if (i === 3 || i === 7) s += "-";
  }
  return s;
}

/** Tokens are never stored raw — only this hash identifies an account. */
export function tokenId(token: string): string {
  return createHash("sha256").update(token.trim().toLowerCase()).digest("hex");
}

/** Storage key for one course's progress under one account. */
export function progressKey(course: string, accountId: string): string {
  return `${course}-${accountId}`;
}

/* ---------------- sqlite driver (preferred) ---------------- */

async function makeSqliteDriver(): Promise<Driver | null> {
  try {
    const { DatabaseSync } = await import("node:sqlite");
    mkdirSync(DATA_DIR, { recursive: true });
    const db = new DatabaseSync(path.join(DATA_DIR, "science.db"));
    db.exec(`
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        created_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS progress (
        id TEXT PRIMARY KEY,
        state TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);
    const insAccount = db.prepare("INSERT OR IGNORE INTO accounts(id, created_at) VALUES (?, ?)");
    const selAccount = db.prepare("SELECT id FROM accounts WHERE id = ?");
    const selProgress = db.prepare("SELECT state, updated_at FROM progress WHERE id = ?");
    const upsProgress = db.prepare(
      "INSERT INTO progress(id, state, updated_at) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET state = excluded.state, updated_at = excluded.updated_at"
    );
    return {
      name: "sqlite",
      createAccount: (id) => void insAccount.run(id, Date.now()),
      hasAccount: (id) => selAccount.get(id) !== undefined,
      getProgress: (key) => {
        const row = selProgress.get(key) as { state: string; updated_at: number } | undefined;
        return row ? { state: row.state, updatedAt: row.updated_at } : null;
      },
      putProgress: (key, state) => void upsProgress.run(key, state, Date.now()),
    };
  } catch (err) {
    console.warn("[store] node:sqlite unavailable, falling back to JSON files:", err);
    return null;
  }
}

/* ---------------- JSON-file fallback driver ---------------- */

function makeJsonDriver(): Driver {
  const dir = path.join(DATA_DIR, "progress");
  mkdirSync(dir, { recursive: true });
  const accountFile = (id: string) => path.join(dir, `${id}.account`);
  const progressFile = (key: string) => path.join(dir, `${key}.json`);
  return {
    name: "json-files",
    createAccount: (id) => writeFileSync(accountFile(id), String(Date.now())),
    hasAccount: (id) => existsSync(accountFile(id)),
    getProgress: (key) => {
      if (!existsSync(progressFile(key))) return null;
      try {
        return JSON.parse(readFileSync(progressFile(key), "utf8")) as StoredProgress;
      } catch {
        rmSync(progressFile(key), { force: true });
        return null;
      }
    },
    putProgress: (key, state) =>
      writeFileSync(progressFile(key), JSON.stringify({ state, updatedAt: Date.now() } satisfies StoredProgress)),
  };
}

/* ---------------- driver selection ---------------- */

let driverPromise: Promise<Driver> | null = null;

export function getDriver(): Promise<Driver> {
  if (!driverPromise) {
    driverPromise = (async () => {
      if (process.env.DATABASE_URL) {
        // PLACEHOLDER: hosted-DB driver (Postgres/Turso) — needed only for
        // serverless deploys. Implemented once a DATABASE_URL is provided.
        console.warn(
          "[store] DATABASE_URL is set but the hosted-DB driver is not configured yet (see PLACEHOLDERS.md) — using local storage instead."
        );
      }
      return (await makeSqliteDriver()) ?? makeJsonDriver();
    })();
  }
  return driverPromise;
}
