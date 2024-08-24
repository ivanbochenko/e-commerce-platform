export const Chat = ({}) => {
  return<>
  
  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
     <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
           <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="w-6 h-6 text-slate-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
                </svg>

                 <span class="flex-1 ms-3 whitespace-nowrap">Chat</span>
              </a>
           </li>
           <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="w-6 h-6 text-slate-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
                </svg>

                 <span class="flex-1 ms-3 whitespace-nowrap">Chat</span>
              </a>
           </li>
           <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="w-6 h-6 text-slate-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
                </svg>

                 <span class="flex-1 ms-3 whitespace-nowrap">Chat</span>
              </a>
           </li>
        </ul>
     </div>
  </aside>
  
  <div class="flex flex-col ml-64 min-h-screen p-4 gap-4">
      <div class="flex items-start gap-2.5">
        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/>
        <div class="flex flex-col gap-1 w-full max-w-[320px]">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
            </div>
            <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p class="text-sm font-normal text-gray-900 dark:text-white"> That's awesome. I think our users will really appreciate the improvements.</p>
            </div>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
        </div>
      </div>
    </div>
  </>
}