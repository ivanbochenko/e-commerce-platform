import Elysia, { t } from "elysia"
import { Layout } from "../views/layout";
import { ItemView } from "../views/item";
import { ItemGrid, NotFound, Search, ServerMessage } from "../views/components";
import { NewItem } from "../views/new_item";
import { Item } from "../models/item.model";
import { userService } from "../util/signed";

export const itemRoute = new Elysia({prefix: '/item'})
  .use(userService)
  .get("/", async () => {
    const items = Item.getAll()
    return (
      <Layout>
        <>
          <Search/>
          <ItemGrid items={items}/>
        </>
      </Layout>
    )
  })
  .post('/search', async ({ body: {search}}) => {
    const items = Item.search(search)
    return <ItemGrid items={items}/>
  }, {
    body: t.Object({
      search: t.String()
    })
  })
  .get('/new', async ({}) => {
    return <Layout>
      <NewItem/>
    </Layout>
  })
  .get('/:id', async ({params: { id }}) => {
    const item = Item.getById(id)
    
    if (!item) return <NotFound/>
    
    return <Layout>
      <ItemView {...item } />
    </Layout>
  }, {
    isSignIn: false
  })
  .post('/add', async ({ body: { name, price, image, description }, user_id }) => {
    const item = Item.create({ name, image, description, price: +price, user_id})
    if (!item) {
      return <ServerMessage text="Error"/>
    }
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