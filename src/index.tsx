import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import {PrismaClient} from "@prisma/client";
import Layout from './layout'

const db = new PrismaClient();

const count = await db.user.count();
const users = await db.user.findMany();

// create a new user
// await prisma.user.create({
//   data: {
//     name: "Ivan Boch",
//     email: `Ivan-${Math.random()}@example.com`,
//   },
// });

// count the number of users
// const upd = await prisma.user.update({where: { email: 'Ivan-0.2569058413689067@example.com'}, data: { email: 'bochenkoivan@gmail.com'}});

const app = new Elysia()
  .use(html())
  .get("/", () => (
    <Layout>
      <h1>
        There are {count} users in the database.
      </h1>
    </Layout>
  ))
  .get("/users", () => (
    <Layout>
      <ul>
        {users.map( user => 
          <li>
            <h1>{user?.name}</h1>
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
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
      </Layout>
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
