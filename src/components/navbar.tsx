export default function Navbar() {
  return (
    <nav class="relative flex items-center justify-between bg-slate-800 p-4 shadow">
      <a href="/" class="text-xl font-semibold text-sky-300">Fabric</a>
      <div class='flex space-x-4'>
        <Messages count={10}/>
        <User/>
      </div>
    </nav>
  )
}

const User = () => <a href="/user" class="relative w-10 h-10 overflow-hidden bg-slate-600 hover:bg-slate-500 rounded-full">
  <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
  </a>

function Messages({count}: {count: number}) {
  return <button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-slate-600 rounded-lg hover:bg-slate-500 ">
  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
  </svg>
  <span class="sr-only">Notifications</span>
    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-sky-300 border-2 border-white rounded-full -top-2 -end-2">{count}</div>
  </button>
  
};
