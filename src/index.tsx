import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { userController } from "./controllers/user";
import { authController } from "./controllers/auth";
import { chatController } from "./controllers/chat";
import { itemController } from "./controllers/item";
import { likeController } from "./controllers/like";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(authController)
  .use(userController)
  .use(itemController)
  .use(likeController)
  .use(chatController)
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