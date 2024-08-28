import { Stars } from "./components";

export const Product = ({ name, image, description, price, stars }: {name: string, image: string, description: string | null, price: number, stars: number}) => {
  return <section class="py-8">
  <div class="mx-auto max-w-7xl px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="slider-box w-full h-full max-lg:mx-auto mx-0">
              <div class="swiper main-slide-carousel swiper-container relative mb-6">
                      <div class="swiper-slide">
                          <div class="block">
                              <img src={image} alt={name} class="max-lg:mx-auto rounded-2xl"/>
                          </div>
                      </div>
              </div>
          </div>
          <div class="flex justify-center items-center">
              <div class="pro-detail w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
                  <div class="flex items-center justify-between gap-6 mb-6">
                      <div class="text">
                          <h2 class="font-manrope font-bold text-3xl leading-10 text-slate-300 mb-2">
                            {name}
                          </h2>
                          <p class="font-normal text-xl text-slate-300">{description}</p>
                      </div>
                      <button type="button" class="text-white bg-slate-700 hover:bg-slate-500 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2">
                      <svg class="w-6 h-6 text-sky-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                      </svg>

                      <span class="sr-only">Icon description</span>
                      </button>
                  </div>

                  <Stars num={stars}/>
                  <h5 class="font-manrope font-semibold text-2xl leading-9 text-slate-300 ">$ {price} </h5>
                  
                  <button
                      class="text-center w-full p-4 rounded-full bg-slate-800 flex items-center justify-center font-semibold text-lg text-slate-300 transition-all duration-500 hover:bg-slate-700">
                      Contact
                  </button>
              </div>
          </div>
      </div>
  </div>
</section>
};