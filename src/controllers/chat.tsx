import Elysia, { t } from "elysia"
import { db } from "../db";
import { ChatView, MessageBubble, MessageInput } from "../views/chat";

export const chatRoute = new Elysia({prefix: '/chat'})
  .get('/', async ({ cookie: {user_id}}) => {
    const chats = await db.trade.findMany({ 
      where: {
        OR: [
          { user_id: user_id.value },
          { item: { user_id: user_id.value } }
        ]
      },
      select: {
        id: true,
        item: {
          select: {
            name: true
          }
        }
      }
    })

    return <ChatView chatList={chats}/>
  })
  .get('/:trade_id', async ({ params: { trade_id }}) => {
    const trade = await db.trade.findUnique({
      where: {
        id: trade_id
      },
      select: {
        id: true,
        item: true,
        messages: {
          include: {
            author: true
          },
          orderBy: { time: 'desc' }
        },
      }
    })

    if (!trade) return <h1>No messages!</h1>

    return (
      <div class="flex flex-col grow w-full h-full justify-between">
        <div class='flex justify-center relative'>
          <h1 class="absolute top-2 text-xl font-bold text-slate-300">{ trade.item.name }</h1>
        </div>
        <div
          hx-get={'/chat/new/' + trade_id}
          // hx-trigger="every 5s"
          class='flex flex-col-reverse flex-auto h-full overflow-auto'
        >
          {trade.messages.map( m => <MessageBubble {...m}/>)}
        </div>
        <MessageInput trade_id={trade.id}/>
      </div>
    )
  })
  .post('/message/:trade_id', async ({ body: { text }, cookie: { user_id }, params: {trade_id}, redirect }) => {
    if (!user_id.value) {
      return redirect('/auth')
    }
    const message = await db.message.create({
      data: {
        text,
        author_id: user_id.value,
        trade_id
      },
      select: {
        id: true,
        trade: {
          select: {
            item: {
              select: { user_id: true }
            }
          }
        }
      }
    })
    const read = await db.read.create({
      data: {
        user_id: message.trade.item.user_id,
        message_id: message.id
      }
    })
    return <MessageInput trade_id={trade_id}/>
  },{
    body: t.Object({
      text: t.String()
    })
  }
)
.ws('/:trade_id', {
  params: t.Object({
    trade_id: t.String()
  }),
  body: t.Object({
    text: t.String(),
    author_id: t.String(),
  }),
  open(ws) {
    ws.subscribe(ws.data.params.trade_id)
  },
  async message(ws, message) {
    const newMessage = await db.message.create({
      data: { ...message, trade_id: ws.data.params.trade_id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })
    ws.publish(ws.data.params.trade_id, newMessage)
  },
  close(ws) {
    ws.unsubscribe(ws.data.params.trade_id)
  },
})

  