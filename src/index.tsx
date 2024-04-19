import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import {PrismaClient} from "@prisma/client";
import Layout from './layout'

const db = new PrismaClient();

const app = new Elysia()
  .use(html())
  .get("/", () => (
    <Layout>
      <h1>
        There are {db.user.count()} users in the database.
      </h1>
    </Layout>
  ))
  .get("/users", async () => (
    <Layout>
      <ul>
        {(await db.user.findMany()).map( user => 
          <li>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
          </li>
        )}
      </ul>
    </Layout>
  ))
  .get('/user/:email', async ({ params: { email } }) => {
    const user = await db.user.findUnique({where: { email }})
    return <Layout>
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
      </Layout>
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
