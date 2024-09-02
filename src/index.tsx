import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html'
import { cors } from "@elysiajs/cors";
import { staticPlugin } from '@elysiajs/static'
import { Layout } from './views/layout'
import { userRoute } from "./controllers/user";
import { db } from "./db";
import { jwtConfig } from "./jwt";
import { authRoute } from "./controllers/auth";
import { chatRoute } from "./controllers/chat";
import { Inbox, Item, Search } from "./views/components";
import { itemRoute } from "./controllers/item";
import { items } from "../items";

const app = new Elysia()
  .use(html())
  .use(
    cors({
      origin: undefined,
    })
  )
  .use(staticPlugin())
  .use(jwtConfig)
  .onBeforeHandle(async ({ path, jwt, cookie: { auth }, redirect }) => {
    const payload = await jwt.verify(auth.value)
    if (!payload && !path.startsWith('/auth')) {
      return redirect('/auth/')
    }
  })
  .get("/", async () => {

    const items = await db.item.findMany()
    return (
      <Layout>
        <>
          <Search/>
          <main id="search-results" class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-8 md:w-5/6 md:mx-auto'>
            {items.map( item => <Item {...item}/> )}
          </main>
        </>
      </Layout>
    )
  })
  .get('/inbox', async ({ cookie: { user_id }, redirect}) => {

    if (!user_id.value) {
      return redirect('/auth/')
    }
    const unread = await db.read.count({
      where: {
        user_id: user_id.value,
        value: false
      }
    })

    return <Inbox count={unread}/>
  })
  .post('/search', async ({ body: {search}}) => {
    const result = await db.item.findMany({
      where: {
        OR: [
          {
            name: { contains: search }
          },
          {
            description: { contains: search }
          }
        ]
      }
    })
    return <main id="search-results" class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-8 md:w-5/6 md:mx-auto'>
      {result.map( item => <Item {...item}/> )}
    </main>
  }, {
    body: t.Object({
      search: t.String()
    })
  })
  .use(userRoute)
  .use(authRoute)
  .use(chatRoute)
  .use(itemRoute)
  .onRequest(({ request }) => {
      console.log(`Request received: ${request.method}: ${request.url}`)
    }
  )
  .listen(3000);

console.log(
  `${process.env.PROJECT_NAME} is running at ${app.server?.hostname}:${app.server?.port}`
);

// console.log(
//   await db.user.createMany({
//     data: [
//       {
//         id: '2',
//         name: 'test',
//         email: 'test@gmail.com',
//         password: await Bun.password.hash('123')
//       },
//       {
//         id: '1',
//         name: 'Ivan',
//         email: 'ivan@gmail.com',
//         password: await Bun.password.hash('123')
//       }
//     ]
//   })
// );

// console.log(
//   await db.item.createMany({
//     data: items
//   })
// );

