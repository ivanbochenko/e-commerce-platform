import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import {PrismaClient} from "@prisma/client";
import Layout from './components/layout'
import { Database } from "bun:sqlite";
import Login from "./login";
import Navbar from "./components/navbar";
import jwt from "@elysiajs/jwt";
import Success from "./components/success";
import User from "./components/user";
import Item from "./components/item";

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
      exp: '30d',
    })
  )
  .onBeforeHandle(async ({ path, jwt, cookie: { auth, user }, redirect }) => {
    const payload = await jwt.verify(auth.value)
    if (!payload && !path.startsWith('/auth')) {
      return redirect('/auth/sign-in')
    }
    
    user.set({ value: payload.email})
  })
  .get("/", async ({  }) => {
    return (
      <Layout>
        <div>
          <Navbar logged={true}/>
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
  .get("/items", async ({ }) => {
    const items = await db.item.findMany()
    return (
      <div id="replaceMe">
        {items.map( item => 
          <div>
            <button
              hx-get={'/item/'+ item.id}
              hx-target="#replaceMe"
              hx-swap="outerHTML"
            >
              {item.name}
            </button>
          </div>
        )}
      </div>
    )
  })
  .get('/item/:id', async ({params: { id }}) => {
    const item = await db.item.findUnique({where: { id }})
    if (!item) {
      throw new Error('Not found')
    }
    return <Item name={item.name} />
  })
  .group('/user', app => app
    .get('/', ({cookie: { user }}) => {

      return <Layout><User name="" email={user.value!}/></Layout>
    })
    .get('/:email', async ({params: { email }}) => {
      const user = await db.user.findUnique({where: {email}})
      if (!user) {
        throw new Error('Not found')
      }
      return <User name={user?.name!} email={user?.email}/>
    })
  )
  .group('/auth', app => app
    .get('/sign-in', ({ }) => {
      return <Layout><Login/></Layout>
    })
    .get('/sign-up', () => 'Sign up')
    .post('/', async ({ set, body: { email, password }, jwt, cookie: { auth } }) => {
      
      const user = await db.user.findUnique({ where: { email } })
      if (!user) {
        set.status = 401
        throw new Error('Unauthorized')
      }

      const isMatch = await Bun.password.verify(password, user.password)
      if (!isMatch) {
        set.status = 401
        throw new Error('Unauthorized')
      }
      console.log(email);
      
      auth.set({
        value: await jwt.sign({ email: user.email })
      })
      return <Success/>
    }, {
      body: t.Object({
        email: t.String(),
        password: t.String()
      })
    })
  )
  .listen(3000);

console.log(
  `🧶 Fabric is running at ${app.server?.hostname}:${app.server?.port}`
);
