import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { Layout, Footer, Navbar } from './views/layout'
import { userRoute } from "./controllers/user";
import { db } from "./db";
import { jwtConfig } from "./jwt";
import { authRoute } from "./controllers/auth";
import { Product } from "./views/product";
import { chatRoute } from "./controllers/chat";
import { Item, Search } from "./views/components";
import { productRoute } from "./controllers/product";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(jwtConfig)
  .onBeforeHandle(async ({ path, jwt, cookie: { auth, userId }, redirect }) => {
    const payload = await jwt.verify(auth.value)
    if (!payload && !path.startsWith('/auth')) {
      return redirect('/auth/')
    }
    // @ts-expect-error
    userId.set({ value: payload.id})
  })
  .get("/", async ({  }) => {
    const items = await db.item.findMany()
    return (
      <Layout>
        <>
          <Navbar/>
          <Search/>
          <main class='grid grid-cols-3 w-5/6 mx-auto gap-8'>
            {items.map( item => 
              <Item {...item}/>
            )}
          </main>
          <Footer/>
        </>
      </Layout>
    )
  }
  )
  .get('/item/:id', async ({params: { id }}) => {
    const item = await db.item.findUnique({where: { id }})
    if (!item) {
      throw new Error('Not found')
    }
    return <Layout><Product/></Layout>
    // return <Item name={item.name} id={item.id} />
  })
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
  `🧶 Fabric is running at ${app.server?.hostname}:${app.server?.port}`
);
