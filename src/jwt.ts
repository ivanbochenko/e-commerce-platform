import jwt from "@elysiajs/jwt";

export const jwtConfig = jwt({
  name: 'jwt',
  secret: process.env.JWT_SECRET ?? '123',
  exp: '30d',
})