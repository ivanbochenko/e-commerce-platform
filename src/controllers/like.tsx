import Elysia from "elysia"
import { Layout } from "../views/layout";
import { Dislike, ItemGrid, LikeButton } from "../views/components";
import { Like } from "../models/like.model";

// Like API

export const likeRoute = new Elysia({prefix: '/like'})
  .get('/', async ({ cookie: {user_id}, redirect }) => {
    if (!user_id.value) {
      return redirect('/auth')
    }
    const likes = Like.getAllItemsByUserId(user_id.value)
    
    const items = likes.map( l => l )
    return <Layout>
      <ItemGrid items={likes}/>
    </Layout>
  })
  .post('/create/:item_id', async ({ params: { item_id}, cookie: {user_id}, redirect}) => {
    if (!user_id.value) {
      return redirect('/auth')
    }
    const like = Like.create({
      user_id: user_id.value,
      item_id
    })
    return <Dislike id={like!.id} item_id={item_id}/>
  })
  .post('/remove/:id/:item_id', async ({ params: { id, item_id }}) => {
    const like = Like.deleteById(id)
    return <LikeButton item_id={item_id}/>
  })