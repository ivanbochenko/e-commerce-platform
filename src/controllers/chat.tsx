import Elysia from "elysia"
import { db } from "../db";
import Layout from "../views/layout";
import { Chat } from "../views/chat";

export const chatRoute = new Elysia({prefix: '/chat'})
  .get('/', async ({ cookie : { userId }}) => {
    const user = await db.user.findUnique({ where: { id: userId.value }})
    if (!user) {
      throw new Error('Not found')
    }
    return <Layout><Chat/></Layout>
  })