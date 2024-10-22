import { PrismaClient } from "@prisma/client";
import { Database } from "bun:sqlite";

export const database = new Database("mydb.sqlite");
database.exec("PRAGMA journal_mode = WAL;");

export const db = new PrismaClient();