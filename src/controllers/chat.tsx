import Elysia, { t } from "elysia"
import { db } from "../db";
import { ChatView, MessageBubble, MessageInput } from "../views/chat";
import { MessageIcon } from "../views/Icons";

export const chatRoute = new Elysia({prefix: '/chat'})
  .get('/', async ({ cookie: {userId}}) => {
    const purchases = await db.trade.findMany({ 
      where: {
        user_id: userId.value
      },
      select: {
        item: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return <ChatView buying={true}>
      <>
        {purchases.map( p =>
          <button
            hx-get={"/chat/buying/" + p.item.id}
            hx-target='#chatPlaceholder'
            class="flex w-full items-center p-2 text-slate-100"
          >
            <MessageIcon/>
            <span class="ms-2">{p.item.name}</span>
          </button>
        )}
      </>
    </ChatView>
  })
  .get('/selling', async ({ cookie: {userId}}) => {
    const listings = await db.trade.findMany({
      where: {
        item: {
          user_id: userId.value
        }
      },
      select: {
        item: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })

    return <ChatView buying={false}>
      <>
        {listings.map( l =>
          <button
            hx-get={"/chat/selling/" + l.item.id}
            hx-target='#chatPlaceholder'
            class="flex w-full items-center p-2 text-slate-100"
          >
            <MessageIcon/>
            <span class="ms-2">{l.item.name}</span>
          </button>
        )}
      </>
    </ChatView>
  })
  .get('/buying/:item_id', async ({ cookie: { userId }, params: { item_id }}) => {
    const trades = await db.trade.findFirst({
      where: {
        user_id: userId.value,
        item_id
      },
      select: {
        id: true,
        item: { select: {user: { select: {name: true}}} },
        messages: {
          include: {
            author: true
          },
          orderBy: { time: 'desc' }
        },
      }
    })

    if (!trades) return <h1>No messages!</h1>

    const messages = trades.messages.map( m => 
      <MessageBubble name={m.author.name} {...m}/>
    )
    return <div class="flex flex-col h-full w-full justify-end">
      <div class='flex flex-col-reverse overflow-auto'>
        {messages}
      </div>
      <div class='ms-4 mb-4'>
        <MessageInput trade_id={trades.id} />
      </div>
    </div>
  })
  .get('/selling/:item_id', async ({ params: { item_id }}) => {
    const trades = await db.trade.findFirst({
      where: {
        item_id
      },
      select: {
        id: true,
        messages: {
          include: {
            author: true
          },
          orderBy: { time: 'desc' }
        },
      },
    })

    if (!trades) return <h1>No messages!</h1>

    const messages = trades.messages.map( m => 
      <MessageBubble name={m.author.name} {...m}/>
    )
    return <div class="flex flex-col h-full w-full justify-end">
      <div class='flex flex-col-reverse overflow-auto'>
        {messages}
      </div>
      <div class='ms-4 mb-4'>
        <MessageInput trade_id={trades.id} />
      </div>
    </div>
  })
  .post('/message/:trade_id', async ({ body: { text }, cookie: { userId }, params: {trade_id} }) => {
    const message = await db.message.create({
      data: {
        text,
        author_id: userId.value!,
        trade_id
      }
    })
    return <MessageInput trade_id={trade_id}/>
  },{
    body: t.Object({
      text: t.String()
    })
  }
)

  