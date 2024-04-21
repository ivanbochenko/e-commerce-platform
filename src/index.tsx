import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import {PrismaClient} from "@prisma/client";
import Layout from './components/layout'

const db = new PrismaClient();

const app = new Elysia()
  .use(html())
  .get("/", async ({ cookie: { key } }) => {
    key.value = key.value ?? "new key"
    return (
      <Layout >
        <div>
          <p>{key.value}</p>
          {(await db.item.findMany()).map( item => 
            <p>
              {item.name}
            </p>
          )}
        </div>
      </Layout>
    )
  })
  .get("/users", async () => (
    <Layout>
      <ul>
        {(await db.user.findMany()).map( user => 
          <li>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </li>
        )}
      </ul>
    </Layout>
  ))
  .get('/user/:email', async ({ params: { email } }) => {
    const user = await db.user.findUnique({where: { email }})
    return <Layout>
      <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
      </Layout>
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
