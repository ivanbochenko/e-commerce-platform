import Elysia from "elysia"
import { User } from "../views/user";
import { db } from "../db";
import { Footer, Layout, Navbar } from "../views/layout";

export const userRoute = new Elysia({prefix: '/user'})
  .get('/', async ({ cookie : { userId }}) => {
    const user = await db.user.findUnique({ where: { id: userId.value }})
    if (!user) {
      throw new Error('Not found')
    }
    return <Layout>
      <>
        <Navbar/>
        <User name={user.name!} email={user?.email}/>
        <Footer/>
      </>
    </Layout>
  })
  .get('/:email', async ({params: { email }}) => {
    const user = await db.user.findUnique({where: {email}})
    if (!user) {
      throw new Error('Not found')
    }
    return <User name={user?.name!} email={user?.email}/>
  })