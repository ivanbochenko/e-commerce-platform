import { Elysia, t } from 'elysia'
import { jwtConfig } from './jwt'

export const signService = new Elysia({ name: 'service' })
  .model({
    session: t.Cookie(
      {
        token: t.String(),
        user_id: t.String()
      }
    )
  })
  .model((model) => ({
    ...model,
    optionalSession: t.Optional(model.session)
  }))
  .use(jwtConfig)
  .macro(({ onBeforeHandle }) => ({ 
    isSignIn(enabled: boolean) { 
      if (!enabled) return

      onBeforeHandle( 
        async ({ redirect, cookie: { token, user_id }, jwt, path }) => {
          if (!token.value) {
            return redirect('/auth')
          }
          const payload = await jwt.verify(token.value)
          if (!payload && !path.startsWith('/auth')) {
            return redirect('/auth/')
          }

          if (!user_id) return redirect('/auth')
        } 
      ) 
    } 
  }))

export const userService = new Elysia()
  .use(signService)
  .guard({
    as: 'scoped', 
    isSignIn: true,
    cookie: 'session'
  })
  .resolve(
    { as: 'scoped' }, 
      ({ cookie: { user_id } }) => ({
        user_id: user_id.value
      })
  )