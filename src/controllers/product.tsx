import Elysia from "elysia"
import { db } from "../db";
import { Layout } from "../views/layout";
import { Product } from "../views/product";
import { NotFound } from "../views/components";

export const productRoute = new Elysia({prefix: '/product'})
  .get('/', async ({ cookie : { user_id }}) => {
    return <Layout>hi</Layout>
  })
  .get('/:id', async ({params: { id }}) => {
    const item = await db.item.findUnique({where: { id }})

    if (!item) return <NotFound/>
    
    return <Layout>
      <Product {...item}/>
    </Layout>
  })