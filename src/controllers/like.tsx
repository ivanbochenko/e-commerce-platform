import Elysia from "elysia"
import { Layout } from "../views/layout";
import { Dislike, ItemGrid, LikeButton } from "../views/components";
import { Like } from "../models/like.model";
import { userService } from "../util/signed";

// Like API

export const likeRoute = new Elysia({prefix: '/like'})
  .use(userService)
  .get('/', async ({ user_id }) => {
    const likes = Like.getAllItemsByUserId(user_id)
    return <Layout>
      <div class='mt-4'>
        <ItemGrid items={likes}/>
      </div>
    </Layout>
  }, {
    isSignIn: true
  })
  .get('/status/:item_id', async ({ params: { item_id }, user_id}) => {
    const like = Like.getByUserIdAndItemId({item_id, user_id})
    return like ? <Dislike id={like.id} item_id={item_id}/> : <LikeButton item_id={item_id}/>
  })
  .post('/create/:item_id', async ({ params: { item_id }, user_id}) => {
    const like = Like.create({
      user_id,
      item_id
    })
    return <Dislike id={like!.id} item_id={item_id}/>
  })
  .post('/remove/:id/:item_id', async ({ params: { id, item_id }}) => {
    const like = Like.deleteById(id)
    return <LikeButton item_id={item_id}/>
  })