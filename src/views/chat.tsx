import { BagIcon, SendIcon, ShopIcon } from "./Icons"

export const Chat = ({}) => {
  return<>
  
  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
     <div class="h-full px-3 py-4 overflow-y-auto bg-slate-800">
        <ul class="space-y-2 font-medium">
           <li>
              <a href="#" class="flex items-center p-2 text-slate-100 bg-slate-600 rounded-lg hover:bg-slate-500 group">
                <BagIcon/>
                <span class="flex-1 ms-3 whitespace-nowrap">Buying</span>
              </a>
           </li>
           <li>
              <a href="#" class="flex items-center p-2 text-slate-100 bg-slate-600 rounded-lg hover:bg-slate-500 group">
                <ShopIcon/>
                <span class="flex-1 ms-3 whitespace-nowrap">Selling</span>
              </a>
           </li>

        </ul>
     </div>
  </aside>
  <div class="ml-64 p-4 flex flex-col justify-between h-screen col-span-4">
    <MessageBubble name='Bonnie Green' time={new Date} message={'Thats awesome. I think our users will really appreciate the improvements.'}/>
    <div class='relative w-3/4 mr-auto'>
      <input placeholder="message..." class="p-4 w-full bg-slate-700 rounded-xl outline-none"/>
      
      <div class="absolute inset-y-0 end-4 flex items-center ps-4 pointer-events-none">
        <SendIcon/>
      </div>
    </div>
  </div>
  </>
}

const MessageBubble = ({name, time, message}: {name: string, time: Date, message: string}) => {
  return <div class="flex items-start gap-2">
    <svg class="w-8 h-8 rounded-full text-slate-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
    </svg>
    <div class="flex flex-col gap-1 w-full max-w-[320px]">
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-slate-100">{name}</span>
          <span class="text-sm font-normal text-slate-500">
            {time.getHours()}:{(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}
          </span>
        </div>
        <div class="flex flex-col leading-1.5 p-4 bg-slate-700 rounded-e-xl rounded-es-xl">
          <p class="text-sm font-normal text-slate-100">{message}</p>
        </div>
        <span class="text-sm font-normal text-slate-500">Delivered</span>
    </div>
  </div>
}
