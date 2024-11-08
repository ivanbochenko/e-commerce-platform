import { Database } from "bun:sqlite";

export const db = new Database(process.env.DATABASE_URL, { strict : true });
db.exec("PRAGMA journal_mode = WAL;");