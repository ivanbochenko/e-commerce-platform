import Elysia, { t } from "elysia"
import { ChatView, MessageBubble, MessageInput, MessageType } from "../views/chat";
import Stream from "@elysiajs/stream";
import { Emitter } from "../util/pubsub";
import { Inbox, ServerMessage } from "../views/components";
import { Message } from "../models/message.model";
import { Chat } from "../models/chat.model";
import { userService } from "../util/signed";

export const chatRoute = new Elysia({prefix: '/chat'})
  .decorate('emitter', new Emitter<MessageType>())
  .use(userService)
  .get('/inbox', async ({ user_id }) => {
    const inboxCount = Message.inboxCount(user_id)
    return <Inbox count={inboxCount}/>
  })
  .get('/', async ({ user_id }) => {
    const chats = Chat.getAllByUserId(user_id)
    return <ChatView chats={chats}/>
    // return <div>hi</div>
  })
  .get('/:chat_id', async ({ user_id, params: { chat_id }}) => {
    const messages = Message.getAllByChatId(chat_id)

    const read = Message.readMessages({chat_id, user_id})

    return (
      <div
        // hx-get={ '/chat/' + chat_id}
        // hx-trigger="load delay:2s"
        class="flex flex-col grow w-full h-full justify-between"
      >
        {/* <a href={"/item/" + chat.item.id} class='flex justify-center relative'>
          <h1 class="absolute top-2 text-xl font-bold text-slate-300">{ chat.item.name }</h1>
        </a> */}
        <div class='flex flex-col-reverse flex-auto h-full overflow-auto'>
          <div 
            hx-ext="sse"
            sse-connect={"/chat/stream/" + chat_id}
            sse-swap="message"
            hx-swap="beforeend"
            hx-on-after-settle="this.scrollTo(0, this.scrollHeight);"
          />
          {messages.map( m => <MessageBubble {...m}/>)}
        </div>
        
        <div class='px-4 pb-4'>
          <MessageInput chat_id={chat_id}/>
        </div>
      </div>
    )
  })
  .post('/new/:seller_id', async ({ body: { text }, params: { seller_id }, user_id }) => {
    var chat
    const chatFromDB = Chat.getByUserIds({ user_id, seller_id })
    if (chatFromDB) {
      chat = chatFromDB
    } else {
      chat = Chat.create({ user_id, seller_id })
    }
    const message = Message.create({
      text,
      user_id: user_id,
      chat_id: chat!.id
    })
    if (!message) {
      return <ServerMessage text="Error"/>
    }
    
    return <div class='flex justify-center items-center'>Sent</div>
  }, {
    body: t.Object({
      text: t.String()
    })
  })
  .post('/message/:chat_id', async ({ body: { text }, user_id, params: {chat_id}, emitter }) => {
    const message = Message.create({text, user_id, chat_id})
    if (message) {
      emitter.emit(chat_id, message)
      return 'Success'
    }
  }, {
    body: t.Object({
      text: t.String()
    })
  }
  )
  .get('/stream/:chat_id', ({ params: {chat_id}, emitter }) =>
    new Stream(stream => {
      const sub = emitter.subscribe(chat_id, m => {
        stream.send(<MessageBubble {...m}/>)
      })
      // setTimeout(() => {
      //   sub.unsubscribe()
      //   stream.close()
      // }, 5*60*1000)
    })
  )