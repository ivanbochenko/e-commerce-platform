import Elysia from "elysia"
import { db } from "../db";
import { Footer, Layout, Navbar } from "../views/layout";
import { Product } from "../views/product";
import { NotFound } from "../views/components";

export const productRoute = new Elysia({prefix: '/product'})
  .get('/', async ({ cookie : { userId }}) => {
    return <Layout>hi</Layout>
  })
  .get('/:id', async ({params: { id }}) => {
    const item = await db.item.findUnique({where: { id }})

    if (!item) return <NotFound/>
    
    return <Layout>
      <>
        <Navbar/>
        <Product/>
        <Footer/>
      </>
    </Layout>
  })