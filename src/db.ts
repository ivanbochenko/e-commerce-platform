import { Database } from "bun:sqlite";

export const db = new Database("dev.db", { strict : true });
db.exec("PRAGMA journal_mode = WAL;");