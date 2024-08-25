import { MessagesIcon, ProfileIcon } from "./Icons"

export const Navbar = () => {
  return (
    <nav class="relative flex items-center justify-between bg-slate-800 p-4 shadow">
      <a href="/" class="text-xl font-semibold text-sky-300">Fabric</a>
      <div class='flex space-x-4'>
        <a href="/chat" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-slate-600 rounded-lg hover:bg-slate-500 ">
          <MessagesIcon/>
          <span class="sr-only">Notifications</span>
          <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-sky-300 border-2 border-white rounded-full -top-2 -end-2">
            {10}
          </div>
        </a>
        <a href="/user" class="relative w-10 h-10 overflow-hidden bg-slate-600 hover:bg-slate-500 rounded-full">
          <ProfileIcon/>
        </a>
      </div>
    </nav>
  )
}