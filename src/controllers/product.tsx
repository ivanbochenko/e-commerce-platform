import Elysia from "elysia"
import { db } from "../db";
import { Layout } from "../views/layout";

export const productRoute = new Elysia({prefix: '/product'})
  .get('/', async ({ cookie : { userId }}) => {
    return <Layout>hi</Layout>
  })