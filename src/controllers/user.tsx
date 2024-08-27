import Elysia from "elysia"
import { UserView } from "../views/user";
import { db } from "../db";

export const userRoute = new Elysia({prefix: '/user'})
  .get('/', async ({ cookie : { userId }}) => {
    const user = await db.user.findUnique({ where: { id: userId.value }})
    if (!user) {
      throw new Error('Not found')
    }
    return <UserView {...user}/>
  })
  .get('/:email', async ({params: { email }}) => {
    const user = await db.user.findUnique({where: {email}})
    if (!user) {
      throw new Error('Not found')
    }
    return <UserView {...user}/>
  })