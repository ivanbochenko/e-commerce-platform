import Elysia, { t } from "elysia"
import { db } from "../db";
import Layout from "../components/layout";
import { Login, Forgot } from "../components/login";
import { Success, Error } from "../components/msg";
import { jwtConfig } from "../jwt";
import { sendEmail } from "../mail";

export const authRoute = new Elysia({prefix: '/auth'})
  .use(jwtConfig)
  .get('/', ({ }) => {
    return <Layout><Login/></Layout>
  })
  .post('/sign-in', async ({ set, body: { email, password }, jwt, cookie: { auth } }) => {    
    const user = await db.user.findUnique({ where: { email } })
    // await new Promise(res => setTimeout(res, 2000))
    if (!user) {
      set.status = 401
      return <Error message="User not found"/>
    }

    const isMatch = await Bun.password.verify(password, user.password)
    if (!isMatch) {
      set.status = 401
      return <Error message="Wrong password"/>
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
  .get('/sign-up', () => 'Sign up')
  .get('/forgot-password', () => {
    return <Layout><Forgot/></Layout>
  })
  .post('/restore',
    async ({ body: { email } }) => {
      const password = (Math.random() + 1).toString(36).substring(7)
      const hash = await Bun.password.hash(password)
      const updatedUser = await db.user.update({
        where: { email },
        data: { password: hash }
      })
      if (!updatedUser) {
        return <Error message='User does not exist'/>
      }
      sendEmail(email, updatedUser?.name!, password)
      return <Success message='Check email'/>
    },
    {
      body: t.Object({
        email: t.String()
      })
    }
  )