import Elysia from "elysia"
import { UserView } from "../views/user";
import { User } from '../models/user.model'
import { NotFound } from "../views/components";
import { userService } from "../util/signed";

export const userRoute = new Elysia({prefix: '/user'})
  .use(userService)
  .get('/', async ({ user_id }) => {

    const user = User.getById(user_id)
    
    if (!user) return <NotFound/>

    return <UserView {...user}/>
  })
  .get('/:email', async ({params: { email }}) => {
    const user = User.getByEmail(email)
    
    if (!user)  return <NotFound/>

    return <UserView {...user}/>
  })