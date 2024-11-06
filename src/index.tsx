import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { userRoute } from "./controllers/user";
import { authRoute } from "./controllers/auth";
import { chatRoute } from "./controllers/chat";
import { itemRoute } from "./controllers/item";
import { likeRoute } from "./controllers/like";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(authRoute)
  .use(userRoute)
  .use(itemRoute)
  .use(likeRoute)
  .use(chatRoute)
  .get("/", async ({redirect}) => redirect('/item'))
  .onRequest(({ request }) => {
    console.log(request.method + ': ' + request.url)
  })
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return
    console.error(error)
  })
  .listen(3000);

console.log(
  `${process.env.PROJECT_NAME} is running at ${app.server?.hostname}:${app.server?.port}`
);