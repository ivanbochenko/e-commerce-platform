import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import Layout from './components/layout'
import Navbar from "./components/navbar";
import Item from "./components/item";
import { userRoute } from "./routes/user";
import { db } from "./db";
import { jwtConfig } from "./jwt";
import { authRoute } from "./routes/auth";
import Product from "./components/product";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(jwtConfig)
  .onBeforeHandle(async ({ path, jwt, cookie: { auth, userId }, redirect }) => {
    const payload = await jwt.verify(auth.value)
    if (!payload && !path.startsWith('/auth')) {
      return redirect('/auth/sign-in')
    }
    userId.set({ value: payload.id})
  })
  .get("/", async ({  }) => {
    const items = await db.item.findMany()
    return (
      <Layout>
        <div id="replaceMe">
          <Navbar/>
          <div class='grid grid-cols-3 p-16 gap-4 justify-between'>
            {items.map( item => 
              <Item {...item}/>
            )}
          </div>
        </div>
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
  .listen(3000);

console.log(
  `🧶 Fabric is running at ${app.server?.hostname}:${app.server?.port}`
);
