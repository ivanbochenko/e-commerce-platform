import Elysia from "elysia"
import { db } from "../db";
import { Footer, Layout, Navbar } from "../views/layout";
import { Product } from "../views/product";

export const productRoute = new Elysia({prefix: '/product'})
  .get('/', async ({ cookie : { userId }}) => {
    return <Layout>hi</Layout>
  })
  .get('/:id', async ({params: { id }}) => {
    const item = await db.item.findUnique({where: { id }})
    if (!item) {
      throw new Error('Not found')
    }
    return <Layout>
      <>
        <Navbar/>
        <Product/>
        <Footer/>
      </>
    </Layout>
  })