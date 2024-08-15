import { Cookie, Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import {PrismaClient} from "@prisma/client";
import Layout from './components/layout'
import { Database } from "bun:sqlite";
import Login from "./login";
import Navbar from "./components/navbar";

const database = new Database(":memory:");
database.exec("PRAGMA journal_mode = WAL;");

const db = new PrismaClient();

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", async ({ cookie: { key } }) => {
    
    console.log(typeof key.value)
    return (
      <Layout>
        <div>
          <Navbar logged={!!key.value}/>
          <div id="replaceMe" class="flex m-4 space-x-4">
            <button type="button" class="text-white bg-slate-700 hover:bg-slate-500 font-medium rounded-[12px] text-sm w-1/3 h-20 mb-2"
              hx-get="/items"
              // hx-trigger="click"
              hx-target="#replaceMe"
              hx-swap="outerHTML"
            >
              Item
            </button>
          </div>
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
