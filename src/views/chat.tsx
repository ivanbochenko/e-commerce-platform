import { HomeButton } from "./components"
import { AvatarIcon, BagIcon, SendIcon, ShopIcon } from "./Icons"
import { Layout } from "./layout"

export const ChatView = ({children, buying}: {children: JSX.Element, buying: boolean}) => {
  const activeStyle = 'flex w-1/2 p-2 text-slate-300 cursor-default'
  const passiveStyle = 'flex w-1/2 p-2 text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-lg'
  return <Layout footer={false} nav={false}>
    <div class='flex flex-row h-dvh'>
      <div class="h-full p-4 space-y-2 divide-y-2 divide-slate-600 bg-slate-800 font-medium">
        <div class='flex'>
          <a href="/chat" class={buying ? activeStyle : passiveStyle}>
            <BagIcon/>
            <span class="flex ms-2">Buying</span>
          </a>
          <a href="/chat/selling" class={!buying ? activeStyle : passiveStyle}>
            <ShopIcon/>
            <span class="flex ms-2">Selling</span>
          </a>
        </div>
        {children}
      </div>
      <div id='chatPlaceholder' class='flex flex-col w-full items-center justify-around'>
        <h1 class="text-xl font-bold text-slate-300">Select chat</h1>
        <HomeButton/>
      </div>
    </div>
  </Layout>
}

export const MessageInput = ({trade_id}: {trade_id: string}) => {
  return <form
    hx-post={'/chat/message/'+ trade_id}
    // hx-swap='none'
    class='relative mr-auto w-full sm:w-96'
  >
    <input id='text' name="text" placeholder="message..." class="p-4 pe-12 w-full text-slate-100 bg-slate-700 rounded-xl outline-none"/>
    <button type="submit" class="absolute inset-y-0 end-4 flex mt-4">
      <SendIcon/>
    </button>
  </form>
}

export const MessageBubble = ({name, time, text}: {name: string, time: Date, text: string}) => {
  return <div class="flex items-start ms-4 my-2 gap-2">
    <AvatarIcon w={8} h={8}/>
    <div class="flex flex-col gap-1 w-full">
        <span class="text-sm font-semibold text-slate-100">{name}</span>
        <div class="flex flex-col me-auto leading-2 p-2 bg-slate-700 rounded-e-xl rounded-es-xl">
          <p class="text-sm font-normal text-slate-100">{text}</p>
          <span class="text-sm font-normal text-slate-400">
            {time.getHours()}:{(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}
          </span>
        </div>
        {/* <span class="text-sm font-normal text-slate-500">Delivered</span> */}
    </div>
  </div>
}
