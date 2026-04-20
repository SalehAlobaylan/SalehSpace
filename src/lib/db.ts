import "server-only";

import postgres, { type Sql } from "postgres";

declare global {
  var __salehspaceDb: Sql | undefined;
}

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured");
    this.name = "DatabaseNotConfiguredError";
  }
}

export function getDatabaseUrl(): string | null {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    null;

  return url?.trim() || null;
}

export function isDatabaseConfigured(): boolean {
  return getDatabaseUrl() !== null;
}

export function getDbOrNull(): Sql | null {
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    return null;
  }

  if (!globalThis.__salehspaceDb) {
    globalThis.__salehspaceDb = postgres(databaseUrl, {
      prepare: false,
      max: 1,
    });
  }

  return globalThis.__salehspaceDb;
}

export function getDb(): Sql {
  const db = getDbOrNull();

  if (!db) {
    throw new DatabaseNotConfiguredError();
  }

  return db;
}
