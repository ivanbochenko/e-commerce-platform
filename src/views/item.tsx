import { Input, Stars } from "./components";
import { SendIcon, XCircle } from "./Icons";

export const ItemView = ({
  id,
  user_id,
  name, 
  image, 
  description, 
  price, 
  stars,
}: { 
  id: string,
  user_id: string,
  name: string, 
  image: string, 
  price: number,
  stars?: number,
  description?: string, 
}) => {
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
                      <div class="text space-y-2">
                          <h2 class="font-manrope font-bold text-3xl leading-10 text-slate-300">
                            {name}
                          </h2>
                          <h5 class="font-manrope font-semibold text-2xl leading-9 text-slate-300 ">$ {price} </h5>
                          <Stars num={stars ?? 0}/>
                          <p class="font-normal text-xl text-slate-300">{description ?? ''}</p>
                      </div>
                      <div hx-get={'/like/status/' + id} hx-trigger='load once'>
                        <div class="bg-slate-800 rounded-full m-4"/>
                      </div>
                  </div>
                  
                <details class="open">
                  <summary
                    class="text-center w-full p-4 rounded-full bg-slate-800 flex items-center justify-center font-semibold text-lg text-slate-300 transition-all duration-500 hover:bg-slate-700 cursor-pointer"
                  >
                    Contact
                  </summary>

                  <div class="bg-slate-800 rounded-2xl h-1/6 w-1/3 mr-32 mb-32 ml-auto mt-auto absolute inset-0 text-slate-300 p-4 shadow content-center">
                    <button class='absolute -right-4 -top-4' onclick="document.querySelector('details').removeAttribute('open')">
                      <XCircle/>
                    </button>
                    <form hx-post={'/chat/new/' + user_id} class='relative w-full'>
                      
                      <Input name="text" placeholder="Message..."/>
                      <button type="submit" class="flex absolute inset-y-0 end-2 mt-9">
                        <SendIcon/>
                      </button>

                    </form>
                  </div>
                </details>
              </div>
          </div>
      </div>
  </div>
</section>
};