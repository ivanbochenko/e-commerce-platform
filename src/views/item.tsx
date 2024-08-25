export const Item = ({ name, id, price }: {name: string, id: string, price: number}) => {
  return (
    <div class="w-full rounded-lg shadow bg-slate-800">
        <a href={'/item/'+ id} class="flex items-center justify-center w-full h-48">
          {/* <img class="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" /> */}
          <ImagePlaceholder/>
        </a>
        <div class="px-5 pb-5">
            <h5 class="text-xl font-semibold tracking-tight text-slate-100">{name}</h5>
            <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(5)].map((item, i) => <Star filled={i < 4}/>)}
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

const Star = ({filled}: {filled: boolean}) => {
  return <svg class={ filled ? "w-4 h-4 text-yellow-300" : "w-4 h-4 text-gray-300"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
</svg>
}

const ImagePlaceholder = ({}) => {
  return <svg class="w-20 h-20 text-slate-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
  </svg>
}