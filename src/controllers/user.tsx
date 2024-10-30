import Elysia from "elysia"
import { UserView } from "../views/user";
import { User } from '../models/user.model'
import { NotFound } from "../views/components";

export const userRoute = new Elysia({prefix: '/user'})
  .get('/', async ({ cookie : { user_id }}) => {

    if (!user_id.value) return <NotFound/>

    const user = User.getById(user_id.value)
    
    if (!user) return <NotFound/>

    return <UserView {...user}/>
  })
  .get('/:email', async ({params: { email }}) => {
    const user = User.getByEmail(email)
    
    if (!user)  return <NotFound/>

    return <UserView {...user}/>
  })