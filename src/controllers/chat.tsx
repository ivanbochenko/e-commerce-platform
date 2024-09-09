import Elysia, { t } from "elysia"
import { db } from "../db";
import { ChatView, MessageBubble, MessageInput, MessageType } from "../views/chat";
import Stream from "@elysiajs/stream";
import { Emitter } from "../pubsub";

export const chatRoute = new Elysia({prefix: '/chat'})
  .decorate('emitter',  new Emitter<MessageType>())
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
      <div
        // hx-get={ '/chat/' + chat_id}
        // hx-trigger="load delay:2s"
        class="flex flex-col grow w-full h-full justify-between"
      >
        <a href={"/item/" + chat.item.id} class='flex justify-center relative'>
          <h1 class="absolute top-2 text-xl font-bold text-slate-300">{ chat.item.name }</h1>
        </a>
        <div class='flex flex-col-reverse flex-auto h-full overflow-auto'>
          <div 
            hx-ext="sse"
            sse-connect={"/chat/stream/" + chat_id}
            sse-swap="message"
            hx-swap="beforeend"
            hx-on-after-settle="this.scrollTo(0, this.scrollHeight);"
          />
          {chat.messages.map( m => <MessageBubble {...m}/>)}
        </div>
        
        <div class='px-4 pb-4'>
          <MessageInput chat_id={chat.id}/>
        </div>
      </div>
    )
  })
.post('/new/:item_id', async ({ body: { text }, params: { item_id }, cookie: { user_id }, redirect }) => {
  if (!user_id.value) {
    return redirect('/auth')
  }
  var chat
  const chatFromDB = await db.chat.findFirst({
    where: {
      item_id,
      user_id: user_id.value
    }
  })
  if (chatFromDB) {
    chat = chatFromDB
  } else {
    chat = await db.chat.create({
      data: {
        item_id,
        user_id: user_id.value
      }
    })
  }
  const message = await db.message.create({
    data: {
      text,
      author_id: user_id.value,
      chat_id: chat.id
    },
    select: {
      id: true,
      chat: {
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
      message_id: message.id,
      user_id: message.chat.item.user_id,
    }
  })
  return <div class='flex justify-center items-center'>{chatFromDB ? 'Sent' : 'Chat created'}</div>
},{
  body: t.Object({
    text: t.String()
  })
})
.post('/message/:chat_id', async ({ body: { text }, cookie: { user_id }, params: {chat_id}, redirect, emitter }) => {
  const author_id = user_id.value
  if (!author_id) {
    return redirect('/auth')
  }
  const message = await db.message.create({
    data: {
      text,
      author_id,
      chat_id
    },
    select: {
      id: true,
      text: true,
      time: true,
      author: true,
      read: { select: { value: true }},
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

  const buyer_id = message.chat.user_id
  const seller_id = message.chat.item.user_id

  const read = await db.read.create({
    data: {
      message_id: message.id,
      user_id: author_id == buyer_id ? seller_id : buyer_id,
    }
  })

  emitter.emit(chat_id, message)

  return 'Success'
},{
  body: t.Object({
    text: t.String()
  })
}
)
.get('/stream/:chat_id', ({ params: {chat_id}, emitter }) =>
  new Stream(stream => {
    emitter.subscribe(chat_id, m => {
      stream.send(<MessageBubble {...m}/>)
    })
    // stream.close()
  })
)






// .ws('/:chat_id', {
//   body: t.Object({
//     text: t.String(),
//   }),
//   cookie: t.Cookie({
//     user_id: t.String()
//   }),
//   open(ws) {
//     ws.subscribe(ws.data.params.chat_id)
//   },
//   async message(ws, { text }) {
//     const author_id = ws.data.cookie.user_id.value
//     const chat_id = ws.data.params.chat_id
//     const message = await db.message.create({
//       data: {
//         text,
//         author_id,
//         chat_id
//       },
//       include: {
//         read: true,
//         author: {
//           select: {
//             id: true,
//             name: true,
//           }
//         }
//       }
//     })
//     ws.publish(chat_id, message)
//   },
//   close(ws) {
//     ws.unsubscribe(ws.data.params.chat_id)
//   },
// })
