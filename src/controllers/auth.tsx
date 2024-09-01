import Elysia, { t } from "elysia"
import { db } from "../db";
import { LoginView, ForgotPassView, RegisterView } from "../views/login";
import { ServerMessage } from "../views/components";
import { jwtConfig } from "../jwt";
import { sendEmail } from "../mail";

export const authRoute = new Elysia({prefix: '/auth'})
  .use(jwtConfig)
  .get('/', ({ }) => <LoginView/>)
  .get('/sign-up', () => <RegisterView/>)
  .get('/forgot-password', () => <ForgotPassView/>)
  .post('/sign-in', async ({ set, body: { email, password }, jwt, cookie: { auth, user_id } }) => {
    const user = await db.user.findUnique({ where: { email } })
    // await new Promise(res => setTimeout(res, 2000))
    
    if (!user) {
      set.status = 401
      return <ServerMessage text="User not found"/>
    }

    const isMatch = await Bun.password.verify(password, user.password)
    
    if (!isMatch) {
      set.status = 401
      return <ServerMessage text="Wrong password"/>
    }
    
    auth.set({
      value: await jwt.sign({ id: user.id })
    })
    
    user_id.set({ value: user.id })
    return <ServerMessage success text={'Signed!'}/>
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })
  .post('/register', async ({ set, body: { email, name, password, password2 }, jwt, cookie: { auth } }) => {
    const exists = await db.user.count({ where: { email } }) > 0
    if (exists) {
      set.status = 401
      return <ServerMessage text="User exists"/>
    }

    if (password !== password2) {
      set.status = 401
      return <ServerMessage text="Passwords dont match"/>
    }

    const user = await db.user.create({
      data: {
        email,
        name,
        password
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
      password: t.String(),
      password2: t.String()
    })
  })
  .post('/restore', async ({ body: { email } }) => {
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