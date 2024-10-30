import Elysia, { t } from "elysia"
import { LoginView, ForgotPassView, RegisterView } from "../views/auth";
import { ServerMessage } from "../views/components";
import { jwtConfig } from "../util/jwt";
import { sendEmail } from "../util/mail";
import { User } from "../models/user.model";

export const authRoute = new Elysia({prefix: '/auth'})
  .use(jwtConfig)
  .get('/', ({ }) => <LoginView/>)
  .get('/sign-up', () => <RegisterView/>)
  .get('/forgot-password', () => <ForgotPassView/>)
  .get('/sign-out', async ({cookie: { auth, user_id }}) => {
    auth.remove()
    user_id.remove()
    return <LoginView/>
  })
  .post('/sign-in', async ({ set, body: { email, password }, jwt, cookie: { auth, user_id } }) => {
    const user = User.getByEmail(email)
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
    if (password !== password2) {
      set.status = 401
      return <ServerMessage text="Passwords dont match"/>
    }

    const exists = User.getByEmail(email)
    if (exists) {
      set.status = 401
      return <ServerMessage text="User exists"/>
    }

    const user = User.create({
      email,
      name,
      password: await Bun.password.hash(password)
    })
    
    auth.set({
      value: await jwt.sign({ id: user!.id })
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
      const password = (Math.random() + 1).toString(36).substring(7)
      const hash = await Bun.password.hash(password)
      const updatedUser = User.updateByEmail({
        email,
        password: hash
      })
      if (!updatedUser) {
        return <ServerMessage  success={false} text='User does not exist'/>
      }
      sendEmail(email, updatedUser.name, password)
      return <ServerMessage success text='Check email'/>
    },
    {
      body: t.Object({
        email: t.String()
      })
    }
  )