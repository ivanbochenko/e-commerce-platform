import Elysia, { t } from "elysia"
import { prisma } from "../db";
import { Layout } from "../views/layout";
import { ItemView } from "../views/item";
import { Dislike, ItemGrid, LikeButton, NotFound, ServerMessage } from "../views/components";
import { NewItem } from "../views/new_item";
import { Item } from "../models/item.model";
import { Like } from "../models/like.model";

export const itemRoute = new Elysia({prefix: '/item'})
  .get('/', async ({ cookie : { user_id }}) => {
    return <Layout>
      <NewItem/>
    </Layout>
  })
  .get('/:id', async ({params: { id }, cookie: { user_id }}) => {
    const item = await prisma.item.findUnique({
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
    const item = Item.create({ name, image, description, price: +price, user_id: user_id.value!})
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
    const items = Item.getAllByUserId(id)
    return <Layout>
      <ItemGrid items={items}/>
    </Layout>
  })
  
  // Like API

  .get('/likes', async ({ cookie: {user_id} }) => {
    const likes = await prisma.like.findMany({
      where: {
        user_id: user_id.value
      },
      include: {
        item: true
      }
    })
    const items = likes.map( l => l.item )
    return <Layout>
      <ItemGrid items={items}/>
    </Layout>
  })
  .post('/like/:item_id', async ({ params: { item_id}, cookie: {user_id}, redirect}) => {
    if (!user_id.value) {
      return redirect('/auth')
    }
    const like = Like.create({
      user_id: user_id.value,
      item_id
    })
    return <Dislike id={like!.id} item_id={item_id}/>
  })
  .post('/dislike/:id/:item_id', async ({ params: { id, item_id }}) => {
    const like = Like.deleteById(id)
    return <LikeButton item_id={item_id}/>
  })