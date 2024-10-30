import { Database } from "bun:sqlite";

export const db = new Database("prisma/dev.db");
db.exec("PRAGMA journal_mode = WAL;");

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();