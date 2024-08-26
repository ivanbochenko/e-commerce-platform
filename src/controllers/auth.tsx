import Elysia, { t } from "elysia"
import { db } from "../db";
import { Layout } from "../views/layout";
import { Login, Forgot, Register } from "../views/login";
import { ServerMessage } from "../views/components";
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
      return <ServerMessage success={false} text="User not found"/>
    }

    const isMatch = await Bun.password.verify(password, user.password)
    if (!isMatch) {
      set.status = 401
      return <ServerMessage  success={false} text="Wrong password"/>
    }
    
    auth.set({
      value: await jwt.sign({ id: user.id })
    })
    return <ServerMessage success text={'Signed!'}/>
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })
  .get('/sign-up', () => <Layout><Register/></Layout>)
  .post('register', async ({ set, body: { email, name, password1, password2 }, jwt, cookie: { auth } }) => {
    const exists = await db.user.count({ where: { email } }) > 0
    if (exists) {
      set.status = 401
      return <ServerMessage success={false} text="User exists"/>
    }

    if (password1 !== password2) {
      set.status = 401
      return <ServerMessage success={false} text="Passwords dont match"/>
    }

    const user = await db.user.create({
      data: {
        email,
        name,
        password: password1
      }
    })
    
    auth.set({
      value: await jwt.sign({ id: user.id })
    })
    
    return <ServerMessage success text={'Registered!'}/>
  }, {
    body: t.Object({
      email: t.String(),
      name: t.String(),
      password1: t.String(),
      password2: t.String()
    })
  })
  .get('/forgot-password', () => {
    return <Layout><Forgot/></Layout>
  })
  .post('/restore',
    async ({ body: { email } }) => {
      await new Promise(res => setTimeout(res, 2000))
      // const password = (Math.random() + 1).toString(36).substring(7)
      // const hash = await Bun.password.hash(password)
      // const updatedUser = await db.user.update({
      //   where: { email },
      //   data: { password: hash }
      // })
      // if (!updatedUser) {
      //   return <ServerMessage  success={false} text='User does not exist'/>
      // }
      // sendEmail(email, updatedUser?.name!, password)
      return <ServerMessage success text='Check email'/>
    },
    {
      body: t.Object({
        email: t.String()
      })
    }
  )