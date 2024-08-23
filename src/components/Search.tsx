export const Search = ({}) => {
  return(
    <form class="w-1/2 mx-auto">
      <div class="relative m-4">
        <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
          <svg class="w-4 h-4 text-slate-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-12 text-slate-100 font-normal transition duration-300 ease-in-out rounded-lg bg-slate-700 focus:outline-none" placeholder="Search" required />
      </div>
    </form>
  )
}