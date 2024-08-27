import Elysia from "elysia"
import { UserView } from "../views/user";
import { db } from "../db";
import { NotFound } from "../views/components";

export const userRoute = new Elysia({prefix: '/user'})
  .get('/', async ({ cookie : { user_id }}) => {
    const user = await db.user.findUnique({ where: { id: user_id.value }})
    
    if (!user)  return <NotFound/>

    return <UserView {...user}/>
  })
  .get('/:email', async ({params: { email }}) => {
    const user = await db.user.findUnique({where: {email}})
    
    if (!user)  return <NotFound/>

    return <UserView {...user}/>
  })