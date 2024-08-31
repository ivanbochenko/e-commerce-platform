import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { Layout } from './views/layout'
import { userRoute } from "./controllers/user";
import { db } from "./db";
import { jwtConfig } from "./jwt";
import { authRoute } from "./controllers/auth";
import { chatRoute } from "./controllers/chat";
import { Item, Search } from "./views/components";
import { productRoute } from "./controllers/product";

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
  .get("/", async () => {
    const items = await db.item.findMany()
    return (
      <Layout>
        <>
          <Search/>
          <main class='grid grid-cols-3 w-5/6 mx-auto gap-8'>
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

