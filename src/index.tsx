import { Cookie, Elysia, t } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import {PrismaClient} from "@prisma/client";
import Layout from './components/layout'
import { Database } from "bun:sqlite";
import Login from "./login";
import Navbar from "./components/navbar";
import jwt from "@elysiajs/jwt";

const database = new Database(":memory:");
database.exec("PRAGMA journal_mode = WAL;");

const db = new PrismaClient();

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET ?? '123',
      exp: '30d'
    })
  )
  .onBeforeHandle(async ({ path, jwt, set, headers, cookie: { id, key }, redirect }) => {

    const auth = headers['authorization']
    const payload = await jwt.verify(auth)
    if (!payload && path !== '/sign-in') {      
      return redirect('/sign-in')
    }
    const user = await db.user.findUnique({where: {
      id: id.value
    }})
    
    if (user?.password == key.value) return { user }
  })
  .get("/", async ({  }) => {
    return (
      <Layout>
        <div>
          <Navbar logged={false}/>
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
  }
  )
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
  .get('/sign-in', ({ path }) => {
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
  .onError(({ code, error, redirect }) => {
    if (code === 'VALIDATION') {
      return redirect('/sign-in')
    }
    return new Response(error.toString())
  })
  .listen(3000);

console.log(
  `🧶 Fabric is running at ${app.server?.hostname}:${app.server?.port}`
);
