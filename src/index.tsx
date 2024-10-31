import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html'
import { cors } from "@elysiajs/cors";
import { staticPlugin } from '@elysiajs/static'
import { Layout } from './views/layout'
import { userRoute } from "./controllers/user";
import { jwtConfig } from "./util/jwt";
import { authRoute } from "./controllers/auth";
import { chatRoute } from "./controllers/chat";
import { ItemGrid, Search } from "./views/components";
import { itemRoute } from "./controllers/item";
import { Item } from "./models/item.model";
import { likeRoute } from "./controllers/like";

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
    const items = Item.getAll()
    return (
      <Layout>
        <>
          <Search/>
          <ItemGrid items={items}/>
        </>
      </Layout>
    )
  })
  .post('/search', async ({ body: {search}}) => {
    const items = Item.search(search)
    return <ItemGrid items={items}/>
  }, {
    body: t.Object({
      search: t.String()
    })
  })
  .use(authRoute)
  .use(userRoute)
  .use(itemRoute)
  .use(likeRoute)
  .use(chatRoute)
  .onRequest(({ request }) => {
      console.log(`Request received: ${request.method}: ${request.url}`)
    }
  )
  .listen(3000);

console.log(
  `${process.env.PROJECT_NAME} is running at ${app.server?.hostname}:${app.server?.port}`
);

// console.log(Item.getById('80531e2a-15b9-42f7-81bd-636fc12da759'));
