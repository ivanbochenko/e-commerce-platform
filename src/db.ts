import { PrismaClient } from "@prisma/client";
import { Database } from "bun:sqlite";

const database = new Database(":memory:");
database.exec("PRAGMA journal_mode = WAL;");

export const db = new PrismaClient();