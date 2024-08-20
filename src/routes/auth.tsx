import Elysia, { t } from "elysia"
import { db } from "../db";
import Layout from "../components/layout";
import Login from "../login";
import Success from "../components/success";
import { jwtConfig } from "../jwt";

export const authRoute = new Elysia({prefix: '/user'})
  .use(jwtConfig)
  .get('/sign-in', ({ }) => {
    return <Layout><Login/></Layout>
  })
  .get('/sign-up', () => 'Sign up')
  .post('/', async ({ set, body: { email, password }, jwt, cookie: { auth } }) => {
    
    const user = await db.user.findUnique({ where: { email } })
    if (!user) {
      set.status = 401
      throw new Error('Unauthorized')
    }

    const isMatch = await Bun.password.verify(password, user.password)
    if (!isMatch) {
      set.status = 401
      throw new Error('Unauthorized')
    }
    
    auth.set({
      value: await jwt.sign({ id: user.id })
    })
    return <Success/>
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })