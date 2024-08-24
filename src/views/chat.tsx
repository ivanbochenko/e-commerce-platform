export const Chat = ({}) => {
  return<>
  
  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
     <div class="h-full px-3 py-4 overflow-y-auto bg-slate-800">
        <ul class="space-y-2 font-medium">
           <li>
              <a href="#" class="flex items-center p-2 text-slate-100 bg-slate-600 rounded-lg hover:bg-slate-500 group">
                <svg class="w-6 h-6 text-slate-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
                </svg>

                 <span class="flex-1 ms-3 whitespace-nowrap">Chat</span>
              </a>
           </li>
        </ul>
     </div>
  </aside>
  
  <div class="ml-64 p-4 flex flex-col justify-between h-screen col-span-4">
      <div class="flex items-start gap-2.5">
        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/>
        <div class="flex flex-col gap-1 w-full max-w-[320px]">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-slate-100">Bonnie Green</span>
              <span class="text-sm font-normal text-slate-500">11:46</span>
            </div>
            <div class="flex flex-col leading-1.5 p-4 bg-slate-700 rounded-e-xl rounded-es-xl">
              <p class="text-sm font-normal text-slate-100"> That's awesome. I think our users will really appreciate the improvements.</p>
            </div>
            <span class="text-sm font-normal text-slate-500">Delivered</span>
        </div>
      </div>
      <div class='relative w-3/4 mr-auto'>
        <input placeholder="message..." class="p-4 w-full bg-slate-700 rounded-xl outline-none"/>
        
        <div class="absolute inset-y-0 end-4 flex items-center ps-4 pointer-events-none">
          <svg class="w-6 h-6 text-slate-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 22 22">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"/>
          </svg>
        </div>
      </div>
    </div>
  </>
}