import Elysia, { t } from "elysia"
import { db } from "../db";
import { ChatView, MessageBubble, MessageInput } from "../views/chat";
import { TrashIcon } from "../views/Icons";

export const chatRoute = new Elysia({prefix: '/chat'})
  .get('/', async ({ cookie: {user_id}}) => {
    const chats = await db.chat.findMany({ 
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
  .get('/:chat_id', async ({ cookie: {user_id}, params: { chat_id }}) => {
    const chat = await db.chat.findUnique({
      where: {
        id: chat_id
      },
      select: {
        id: true,
        item: true,
        messages: {
          include: {
            author: true,
            read: true
          },
          orderBy: { time: 'desc' }
        },
      }
    })

    const read = await db.read.updateMany({
      where: {
        user_id: user_id.value,
        message: {
          chat_id
        }
      },
      data: {
        value: true
      }
    })

    if (!chat) return <h1>No messages!</h1>

    return (
      <div class="flex flex-col grow w-full h-full justify-between">
        <a href={"/product/" + chat.item.id} class='flex justify-center relative'>
          <h1 class="absolute top-2 text-xl font-bold text-slate-300">{ chat.item.name }</h1>
        </a>
        <div
          // hx-get={ + chat_id}
          // hx-trigger="every 5s"
          class='flex flex-col-reverse flex-auto h-full overflow-auto'
        >
          {chat.messages.map( m => <MessageBubble {...m}/>)}
        </div>
        <div class='px-4 pb-4'>
          <MessageInput chat_id={chat.id}/>
        </div>
      </div>
    )
  })
  .post('/message/:chat_id', async ({ body: { text }, cookie: { user_id }, params: {chat_id}, redirect }) => {
    if (!user_id.value) {
      return redirect('/auth')
    }
    const message = await db.message.create({
      data: {
        text,
        author_id: user_id.value,
        chat_id
      },
      select: {
        id: true,
        chat: {
          select: {
            user_id: true,
            item: {
              select: { user_id: true }
            }
          }
        }
      }
    })
    
    const readUser = user_id.value == message.chat.user_id ? message.chat.item.user_id : message.chat.user_id

    const read = await db.read.create({
      data: {
        message_id: message.id,
        user_id: readUser,
      }
    })
    return <MessageInput chat_id={chat_id}/>
  },{
    body: t.Object({
      text: t.String()
    })
  }
)
.post('/new/:item_id', async ({ params: { item_id }, cookie: { user_id }, redirect }) => {
  if (!user_id.value) {
    return redirect('/auth')
  }
  const chat = await db.chat.count({
    where: {
      item_id,
      user_id: user_id.value
    }
  })
  if (chat == 0) {
    const chat = await db.chat.create({
      data: {
        item_id,
        user_id: user_id.value
      }
    })
  }
  return 'Chat created'
})
.ws('/:chat_id', {
  params: t.Object({
    chat_id: t.String()
  }),
  body: t.Object({
    text: t.String(),
    author_id: t.String(),
  }),
  open(ws) {
    ws.subscribe(ws.data.params.chat_id)
  },
  async message(ws, message) {
    const newMessage = await db.message.create({
      data: { ...message, chat_id: ws.data.params.chat_id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })
    ws.publish(ws.data.params.chat_id, newMessage)
  },
  close(ws) {
    ws.unsubscribe(ws.data.params.chat_id)
  },
})

  