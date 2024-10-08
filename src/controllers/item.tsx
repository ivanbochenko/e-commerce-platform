import Elysia, { t } from "elysia"
import { db } from "../db";
import { Layout } from "../views/layout";
import { ItemView } from "../views/item";
import { Dislike, Item, Like, NotFound, ServerMessage } from "../views/components";
import { NewItem } from "../views/new_item";

export const itemRoute = new Elysia({prefix: '/item'})
  .get('/', async ({ cookie : { user_id }}) => {
    return <Layout>
      <NewItem/>
    </Layout>
  })
  .get('/:id', async ({params: { id }, cookie: { user_id }}) => {
    const item = await db.item.findUnique({
      where: { id },
      include: {
        likes: {
          where: { user_id: user_id.value }
        }
      }
    })

    if (!item) return <NotFound/>
    
    return <Layout>
      <ItemView {...item}/>
    </Layout>
  })
  .post('/add', async ({ body: { name, price, image, description }, cookie: {user_id} }) => {
    console.log(name);
    
    const item = await db.item.create({
      data: { name, image, price: +price, description, user_id: user_id.value!}
    })
    
    
    return <ServerMessage success text="Created"/>
  }, {
    body: t.Object({
      name: t.String(),
      image: t.String(),
      description: t.String(),
      price: t.String()
    })
  })
  .get('user/:id', async ({ params: {id}}) => {
    const items = await db.item.findMany({
      where: {
        user_id: id
      }
    })
    return <Layout>
      <>
        <main class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 mt-4 sm:mx-8 md:w-5/6 md:mx-auto'>
          {items.map( item =>
            <Item {...item}/>
          )}
        </main>
      </>
    </Layout>
  })
  .get('/likes', async ({ cookie: {user_id} }) => {
    const likes = await db.like.findMany({
      where: {
        user_id: user_id.value
      },
      include: {
        item: true
      }
    })
    return <Layout>
    <>
      <main class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 mt-4 sm:mx-8 md:w-5/6 md:mx-auto'>
        {likes.map( l =>
          <Item {...l.item}/>
        )}
      </main>
    </>
  </Layout>
  })
  .post('/like/:item_id', async ({ params: { item_id}, cookie: {user_id}, redirect}) => {
    if (!user_id.value) {
      return redirect('/auth')
    }
    const like = await db.like.create({
      data: {
        user_id: user_id.value,
        item_id
      }
    })
    return <Dislike id={like.id} item_id={item_id}/>
  })
  .post('/dislike/:id/:item_id', async ({ params: { id, item_id }}) => {
    const like = await db.like.delete({
      where: { id }
    })
    return <Like item_id={item_id}/>
  })