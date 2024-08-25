import { SearchIcon } from "./Icons"

export const Search = ({}) => {
  return(
    <form class="w-1/2 mx-auto">
      <div class="relative m-4">
        <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
        <SearchIcon/>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-12 text-slate-100 font-normal transition duration-300 ease-in-out rounded-lg bg-slate-700 focus:outline-none" placeholder="Search" required />
      </div>
    </form>
  )
}