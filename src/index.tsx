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
        <div id="replaceMe">
          <p>{key.value}</p>
          <button type="button" class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800"
            hx-get="/items"
            // hx-trigger="click"
            hx-target="#replaceMe"
            hx-swap="outerHTML"
          >
            Items
          </button>
        </div>
      </Layout>
    )
  })
  .get("/items", async ({ cookie: { key } }) => {
    const items = await db.item.findMany()
    return (
      <div>
        {items.map( item => 
          <div>
            <a href="/">{item.name}</a>
          </div>
        )}
      </div>
    )
  })
  .group('/user', app => app
    .get('/:email', async ({ params: { email } }) => {
      const user = await db.user.findUnique({where: { email }})
      return <div>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>
    })
    .post('/sign-in', () => 'Sign in')
    .post('/sign-up', () => 'Sign up')
  )
  .listen(3000);

console.log(
  `🧶 Fabric is running at ${app.server?.hostname}:${app.server?.port}`
);
