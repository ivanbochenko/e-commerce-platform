import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { Layout } from './views/layout'
import { userRoute } from "./controllers/user";
import { db } from "./db";
import { jwtConfig } from "./jwt";
import { authRoute } from "./controllers/auth";
import { chatRoute } from "./controllers/chat";
import { Inbox, Item, Search } from "./views/components";
import { productRoute } from "./controllers/product";
import { items } from "../items";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(jwtConfig)
  .onBeforeHandle(async ({ path, jwt, cookie: { auth }, redirect }) => {
    const payload = await jwt.verify(auth.value)
    if (!payload && !path.startsWith('/auth')) {
      return redirect('/auth/')
    }
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
  .get("/", async () => {

    const items = await db.item.findMany()
    return (
      <Layout>
        <>
          <Search/>
          <main class='md:grid md:grid-cols-3 gap-8 w-5/6 mx-auto'>
            {items.map( item =>
              <Item {...item}/>
            )}
          </main>
        </>
      </Layout>
    )
  }
  )
  .use(userRoute)
  .use(authRoute)
  .use(chatRoute)
  .use(productRoute)
  .onRequest(({ request }) => {
      console.log(`Request received: ${request.method}: ${request.url}`);
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

