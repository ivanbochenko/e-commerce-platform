import { ImagePlaceholderIcon, StarIcon } from "./Icons";

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