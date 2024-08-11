import { Cookie, Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import {PrismaClient} from "@prisma/client";
import Layout from './components/layout'
import { Database } from "bun:sqlite";
import Login from "./components/login";

const database = new Database(":memory:");
database.exec("PRAGMA journal_mode = WAL;");

const db = new PrismaClient();

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", async ({ cookie: { key } }) => {
    key.value = key.value ?? "new key"
    console.log(key.value)
    return (
      <Layout >
        <div id="replaceMe" class="flex space-x-4">
          <button type="button" class="text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-[12px] text-sm w-1/3 h-20 mb-2"
            hx-get="/items"
            // hx-trigger="click"
            hx-target="#replaceMe"
            hx-swap="outerHTML"
          >
            Items
          </button>
          <button type="button" class="text-white bg-violet-700 hover:bg-violet-600 font-medium rounded-[12px] text-sm w-1/3 h-20 mb-2"
            hx-get="/items"
            // hx-trigger="click"
            hx-target="#replaceMe"
            hx-swap="outerHTML"
          >
            Items
          </button>
          <button type="button" class="text-white bg-yellow-400 hover:bg-yellow-200 font-medium rounded-[12px] text-sm w-1/3 h-20 mb-2"
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
  .get('/sign-in', ({ set }) => {
    set.status = 401
		set.headers['WWW-Authenticate'] = 'Basic'
    return <Layout><Login/></Layout>
  })
  .get('/sign-up', () => 'Sign up')
  .group('/user', app => app
    .get('/:email', async ({ params: { email } }) => {
      const user = await db.user.findUnique({where: { email }})
      return <div>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>
    })
  )
  .listen(3000);

console.log(
  `🧶 Fabric is running at ${app.server?.hostname}:${app.server?.port}`
);
