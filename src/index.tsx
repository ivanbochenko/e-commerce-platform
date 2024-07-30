import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import {PrismaClient} from "@prisma/client";
import Layout from './components/layout'
import { Database } from "bun:sqlite";

const database = new Database(":memory:");
database.exec("PRAGMA journal_mode = WAL;");

const db = new PrismaClient();

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", async ({ cookie: { key } }) => {
    key.value = key.value ?? "new key"
    return (
      <Layout >
        <div>
          {/* <p>{key.value}</p> */}
          {(await db.item.findMany()).map( item => 
            <div>
              <a href="/">{item.name}</a>
            </div>
          )}
        </div>
      </Layout>
    )
  })
  .group('/user', app => app
    .get('/:email', async ({ params: { email } }) => {
      const user = await db.user.findUnique({where: { email }})
      return <Layout>
        <div>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>
      </Layout>
    })
    .post('/sign-in', () => 'Sign in')
    .post('/sign-up', () => 'Sign up')
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
