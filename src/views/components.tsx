import { AngleLeftIcon, ImagePlaceholderIcon, SearchIcon, StarIcon } from "./Icons";
import { Layout } from "./layout";

export const ServerMessage = ({text, success}: {text: string, success: boolean}) => {
  const style = success ? "text-green-400" : "text-red-400"

  return <div class="w-full rounded-lg">
      <div class="flex flex-col items-center p-4 space-y-4">
        <span class={style}>{text}</span>
        <HomeButton/>
      </div>
    </div>
};

export const NotFound = ({text}:{text?:string}) => {
  
  return <Layout>
    <section class="flex grow items-center justify-center mx-auto">
      <div class="flex flex-col items-center w-full p-4 space-y-4 max-w-sm rounded-lg shadow bg-slate-800">
        <h1 class="text-xl font-bold text-slate-100">Item not found!</h1>
        { text ? <span class="text-xl text-slate-300">{text}</span> : null }
        <HomeButton/>
      </div>
    </section>
  </Layout>
}

export const Spinner = () => <img class="htmx-indicator mx-2 w-8" src="../../public/three-dots.svg"/>

export const Button = ({message}: {message?: string}) => {
  return <button type="submit" class="w-full text-slate-300 bg-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      {message}
      <Spinner/>
    </button>
}

export const HomeButton = ({}) => {
  return <a href="/" class='flex animate-pulse p-2 bg-slate-800 items-center justify-center rounded-full'>
    <AngleLeftIcon/>
    <h1 class="me-2 text-xl font-bold text-slate-300">Home</h1>
  </a>
}

export const Stars = ({num}: {num: number}) => {
  return <div class="flex items-center space-x-1 rtl:space-x-reverse">
    {[...Array(5)].map((item, i) => <StarIcon filled={i < num}/>)}
  </div>
}

export const Item = ({ name, id, price, stars, image }: {name: string, id: string, price: number, stars: number, image: string}) => {
  return (
    <a  href={'/product/'+ id} class="w-full rounded-lg shadow bg-slate-800 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300">
        <div class="flex items-center justify-center rounded-t-lg w-full h-48 overflow-hidden">
          { image
            ? <img class="rounded-t-lg object-cover w-full" src={image} alt="product image"/>
            : <ImagePlaceholderIcon/>
          }
        </div>
        <div class="p-4 space-y-2">
            <h5 class="text-2xl font-semibold tracking-tight text-slate-100">{name}</h5>
            <div class="flex items-center">
              <Stars num={stars}/>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-slate-300">{price}$</span>
                <button class="text-slate-300 bg-slate-600 hover:bg-slate-500 font-medium rounded-lg text-md px-4 py-2 text-center">Buy</button>
            </div>
        </div>
    </a>
  )
};

export const Search = ({}) => {
  return(
    <form class="w-1/2 mx-auto">
      <div class="relative m-4">
        <div class="absolute inset-y-0 start-0 flex items-center ms-2 pointer-events-none">
          <SearchIcon/>
        </div>
        <input type="search" id="default-search" class="block w-full p-2 ps-10 text-slate-100 font-normal transition duration-300 ease-in-out rounded-lg bg-slate-700 focus:outline-none" placeholder="Search" required />
      </div>
    </form>
  )
}