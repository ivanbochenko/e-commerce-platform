import { Stars } from "./components";

export const Product = ({ }) => {
  return <section class="py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="slider-box w-full h-full max-lg:mx-auto mx-0">
              <div class="swiper main-slide-carousel swiper-container relative mb-6">
                      <div class="swiper-slide">
                          <div class="block">
                              <img src="https://i.ebayimg.com/thumbs/images/g/ZCQAAOSwXIZmtrTF/s-l1200.jpg"
                                  alt="Summer Travel Bag image" class="max-lg:mx-auto rounded-2xl"/>
                          </div>
                      </div>
              </div>
          </div>
          <div class="flex justify-center items-center">
              <div class="pro-detail w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
                  <div class="flex items-center justify-between gap-6 mb-6">
                      <div class="text">
                          <h2 class="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2">Yellow Summer
                              Travel
                              Bag
                          </h2>
                          <p class="font-normal text-base text-gray-500">ABS LUGGAGE</p>
                      </div>
                      <button type="button" class="text-white bg-slate-700 hover:bg-slate-500 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2">
                      <svg class="w-6 h-6 text-sky-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                      </svg>

                      <span class="sr-only">Icon description</span>
                      </button>
                  </div>

                  <h5 class="font-manrope font-semibold text-2xl leading-9 text-gray-900 ">$ 199.00 </h5>
                  <Stars num={4}/>
                  
                  <div class="flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8">
                      <div class=" flex items-center justify-center rounded-full">
                          <button
                              class="group py-[14px] px-3 w-full rounded-l-full h-full flex items-center justify-center bg-slate-800 shadow-sm shadow-transparent transition-all duration-300 hover:bg-slate-700 hover:shadow-slate-500">
                              <svg class="stroke-slate-500" width="22" height="22"
                                  viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                                  <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                      stroke-linecap="round" />
                                  <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                      stroke-linecap="round" />
                              </svg>
                          </button>
                          <input type="text"
                              class="font-semibold text-slate-900 text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent placeholder:text-slate-300 text-center"
                              placeholder="1"/>
                          <button
                              class="group py-[14px] px-3 w-full rounded-r-full h-full flex items-center justify-center bg-slate-800 shadow-sm shadow-transparent transition-all duration-300 hover:bg-slate-700 hover:shadow-slate-500">
                              <svg class="stroke-black grou-hover:stroke-black" width="22" height="22"
                                  viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="#9CA3AF" stroke-width="1.6"
                                      stroke-linecap="round" />
                                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" stroke-opacity="0.2"
                                      stroke-width="1.6" stroke-linecap="round" />
                                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" stroke-opacity="0.2"
                                      stroke-width="1.6" stroke-linecap="round" />
                              </svg>
                          </button>
                      </div>
                      <button
                          class="group py-3 px-5 rounded-full bg-slate-800 text-slate-300 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-slate-500 hover:bg-slate-700">
                          <svg class="stroke-slate-600 transition-all duration-500 group-hover:stroke-slate-600"
                              width="22" height="22" viewBox="0 0 22 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                                  stroke="" stroke-width="1.6" stroke-linecap="round" />
                          </svg>
                          Add to cart
                      </button>
                  </div>
                  <button
                      class="text-center w-full px-5 py-4 rounded-[100px] bg-slate-800 flex items-center justify-center font-semibold text-lg text-slate-300 shadow-sm shadow-transparent transition-all duration-500 hover:bg-slate-700 hover:shadow-slate-500">
                      Buy Now
                  </button>
              </div>
          </div>
      </div>
  </div>
</section>
};