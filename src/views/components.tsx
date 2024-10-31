import { AngleLeftIcon, EnvelopeSolidIcon, HeartEmptyIcon, HeartFullIcon, ImagePlaceholderIcon, SearchIcon, StarIcon } from "./Icons";
import { Layout } from "./layout";

export const ServerMessage = ({text, success=false}: {text: string, success?: boolean}) => {
  const style = 'text-xl ' + (success ? "text-green-400" : "text-red-400")

  return <div class="w-full rounded-lg bg-slate-600">
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

export const Spinner = () => <span class="htmx-indicator">  
  <img class="mx-2 w-8" src="../../public/three-dots.svg"/>
</span>

export const Button = ({message}: {message?: string}) => {
  return <button type="submit" class="w-full text-slate-300 bg-slate-700 font-medium rounded-lg p-2 text-center">
      {message}
      <Spinner/>
    </button>
}

export const Input = ({name, placeholder, title, type}: {name: string, placeholder: string, title?: string, type?: string}) => {
  return <div>
      <label for={name} class="block mb-2 text-sm font-medium text-slate-300">{ title ?? `Enter ${name}`}</label>
      <input type={type ?? 'text'} name={name} class="bg-slate-700 text-slate-100 rounded-lg block w-full p-2 placeholder-slate-400" placeholder={placeholder ?? name} required={true}/>
  </div>
}

export const HomeButton = ({}) => {
  return <a href="/" class='flex animate-pulse p-2 bg-slate-800 items-center justify-center rounded-full'>
    <AngleLeftIcon/>
    <h1 class="me-2 text-xl font-bold text-slate-300">Home</h1>
  </a>
}

export const Stars = ({num = 0}: {num?: number}) => {
  return <div class="flex items-center space-x-1 rtl:space-x-reverse">
    {[...Array(5)].map((item, i) => <StarIcon filled={i < num}/>)}
  </div>
}

interface Item {
  id: string,
  name: string,
  price: number,
  image: string
  stars?: number,
}
export const Item = ({ name, id, price, stars, image }: Item) => {
  return (
    <a  href={'/item/'+ id} class="w-full rounded-lg shadow bg-slate-800 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300">
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

export const ItemGrid = ({ items }: { items: Item[]}) => {
  return <main id="search-results" class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-8 md:w-5/6 md:mx-auto'>
    {items.map( item => <Item {...item}/> )}
  </main>
}

export const Search = ({}) => {
  return(
    <form class="w-1/2 mx-auto">
      <div class="relative m-4">
        <div class="absolute inset-y-0 start-0 flex items-center ms-2 pointer-events-none">
          <SearchIcon/>
        </div>
        <input
          type="search" 
          name="search"
          placeholder="Search..." 
          hx-post="/search" 
          hx-trigger="input changed delay:500ms, search" 
          hx-target="#search-results" 
          hx-swap='outerHTML'
          hx-indicator=".htmx-indicator"
          class="form-control block w-full p-2 ps-10 text-slate-100 font-normal transition duration-300 ease-in-out rounded-lg bg-slate-700 focus:outline-none"
          required
        />
        <div class='absolute inset-y-0 end-8 flex items-center'>
          <Spinner/>
        </div>
      </div>
    </form>
  )
}

export const Inbox = ({count}: {count: number}) => {
  return <a href="/chat" hx-boost='false' class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-slate-600 rounded-lg hover:bg-slate-500 ">
    <EnvelopeSolidIcon/>
    <div class="absolute inline-flex items-center justify-center size-6 z-10 text-xs font-bold text-slate-100 bg-sky-600 border-2 border-slate-100 rounded-full -top-2 -end-2">
      {count}
    </div>
    { count > 0 ? <div class="absolute size-6 bg-sky-600 rounded-full animate-ping -top-2 -end-2"/> : null }
  </a>
}

export const LikeButton = ({item_id}: {item_id: string}) => {
  return <button hx-post={'/item/like/' + item_id} hx-swap='outerHTML' class="text-slate-300 bg-slate-800 hover:bg-slate-700  transition-all duration-500 rounded-full items-center">
    <div class='m-4'>
      <HeartEmptyIcon/>
    </div>
  </button>
}

export const Dislike = ({id, item_id}: {id:string, item_id: string}) => {
  return <button hx-post={'/item/dislike/' + id + '/' + item_id} hx-swap='outerHTML' class="text-slate-300 bg-slate-800 hover:bg-slate-700  transition-all duration-500 rounded-full items-center">
  
    <div class='m-4'>
      <HeartFullIcon/>
    </div>
  </button>
}