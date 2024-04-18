import { Elysia } from "elysia";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// create a new user
// await prisma.user.create({
//   data: {
//     name: "Ivan Boch",
//     email: `Ivan-${Math.random()}@example.com`,
//   },
// });

// count the number of users
const count = await prisma.user.count();

const users = await prisma.user.findMany();

const app = new Elysia().get("/", () => `There are ${count} users in the database.`).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
