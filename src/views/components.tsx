import { ImagePlaceholderIcon, SearchIcon, StarIcon } from "./Icons";

export const Message = ({text, success}: {text: string, success: boolean}) => {
  return <div class="w-full rounded-lg">
      <div class="flex flex-col items-center pb-10">
      <span class={success ? "text-xl m-5 text-green-400" : "text-xl m-5 text-red-400"}>{text}</span>
      <a href="/" class="w-full text-slate-300 text-center px-5 py-2.5 bg-slate-600 font-medium rounded-lg">Home</a>
      </div>
    </div>
};

export const Spinner = ({ }) => {
  return <img class="htmx-indicator mx-2 w-8" src="../../public/three-dots.svg"/>
}

export const Button = ({message}: {message?: string}) => {
  return <button type="submit" class="w-full text-slate-300 bg-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      {message}
      <Spinner/>
    </button>
}

export const Item = ({ name, id, price }: {name: string, id: string, price: number}) => {
  return (
    <div class="w-full rounded-lg shadow bg-slate-800">
        <a href={'/item/'+ id} class="flex items-center justify-center w-full h-48">
          {/* <img class="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" /> */}
          <ImagePlaceholderIcon/>
        </a>
        <div class="px-5 pb-5">
            <h5 class="text-xl font-semibold tracking-tight text-slate-100">{name}</h5>
            <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(5)].map((item, i) => <StarIcon filled={i < 4}/>)}
                </div>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-slate-100">{price}$</span>
                <a href="#" class="text-slate-100 bg-slate-600 hover:bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Buy</a>
            </div>
        </div>
    </div>
  )
};

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