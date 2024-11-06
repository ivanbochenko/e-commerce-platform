import { HomeButton } from "./components"
import { EnvelopeIcon, SendIcon, UserIcon } from "./Icons"
import { Layout } from "./layout"

export const ChatView = ({chats}: {chats: {id: string, name: string}[]}) => {
  return <Layout fix_h>
    <div class='flex flex-row grow mt-4 h-3/4 md:w-2/3 md:mx-auto bg-slate-800 rounded-xl p-4'>
      <div class="flex flex-col h-full space-y-2 me-2 divide-y-2 divide-slate-600 font-medium">
        {chats?.map(i =>
          <button
            hx-get={"/chat/" + i.id}
            hx-target='#chatPlaceholder'
            hx-swap='innerHTML'
            class="flex w-full items-center p-2 space-x-2 text-slate-100"
          >
            <EnvelopeIcon/>
            <p>{i.name}</p>
          </button>
        )}
      </div>
      <div id='chatPlaceholder' class='flex flex-col grow bg-slate-600 rounded-xl items-center justify-around'>
        <h1 class="text-xl font-bold text-slate-300">Select chat</h1>
        <HomeButton/>
      </div>
    </div>
  </Layout>
}

export const MessageInput = ({chat_id}: {chat_id: string}) => {
  return <form
    hx-post={'/chat/message/'+ chat_id}
    // hx-swap="outerHTML"
    hx-on--after-request="this.reset()"
    hx-swap="none"
    class='relative w-full'
  >
    <input id='text' name="text" placeholder="message..." class="p-4 pe-12 w-full text-slate-100 bg-slate-700 rounded-xl outline-none"/>
    <button type="submit" class="flex absolute inset-y-0 end-4 mt-4">
      <SendIcon/>
    </button>
  </form>
}

export const MessageBubble = ({ name, time, text, read }: MessageType ) => {
  return <div class="flex items-start ms-4 my-2 gap-2">
    <UserIcon size={8}/>
    <div class="flex flex-col gap-1 w-full">
        <span class="text-sm font-semibold text-slate-100">{name}</span>
        <div class="flex flex-col me-auto leading-2 p-2 bg-slate-700 rounded-e-xl rounded-es-xl">
          <p class="text-sm font-normal text-slate-100">{text}</p>
          <span class="text-sm font-normal text-slate-400">
            {time.getHours()}:{(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}
          </span>
        </div>
        <span class="text-sm font-normal text-slate-400">{ read == 0 ? 'unread' : 'read' }</span>
    </div>
  </div>
}

export type MessageType = {
  name?: string,
  read: number,
  time: Date,
  text: string
}