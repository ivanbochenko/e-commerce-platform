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
    const buys = Chat.getAllBySellerId(user_id)
    const list = chats.concat(buys)
    return <ChatView chats={list}/>
  }, {
    isSignIn: true
  })
  .get('/:chat_id', async ({ user_id, params: { chat_id }}) => {
    const messages = Message.getAllByChatId(chat_id)
    
    const read = Message.readMessages({chat_id, user_id})

    return (
      <div class="flex flex-col grow w-full h-full justify-between">
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
  }, {
    isSignIn: true
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
    isSignIn: true,
    body: t.Object({
      text: t.String()
    })
  })
  .post('/message/:chat_id', async ({ body: { text }, user_id, params: { chat_id }, emitter }) => {
    const message = Message.create({text, user_id, chat_id})
    if (message) {
      emitter.emit(chat_id, message)
      return 'Success'
    }
  }, {
    isSignIn: true,
    body: t.Object({
      text: t.String()
    })
  }
  )

  // As of october bun closes the connection once no events where sent in the last 10 seconds
  // Hopefully this will be fixed in the future
  
  .get('/stream/:chat_id', ({ params: { chat_id }, emitter }) => {
    const stream = new Stream()
    const subscription = emitter.subscribe( chat_id, m => { stream.send(<MessageBubble {...m}/>) } )
    const timeout = 5*60*1000
    setTimeout(() => {
      subscription.unsubscribe()
      stream.close()
    }, timeout)
    return stream
  })
	// .get('/stream/:chat_id', function* ({ params: { chat_id }, emitter }) {
  //   const sub = emitter.subscribe(chat_id, m => {
  //     yield <MessageBubble {...m}/>
  //   })
	// })