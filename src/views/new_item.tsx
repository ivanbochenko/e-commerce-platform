import { PlusIcon } from "./Icons";

export const NewItem = ({}) => {
  return <div class="flex flex-col mx-auto p-4 justify-center items-center bg-slate-800 rounded-lg shadow">
      
      <h3 class="text-lg font-semibold text-slate-300 ">
          Add New Product
      </h3>
      
      <form class="">
          <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium text-slate-300 ">Name</label>
                  <input type="text" name="name" id="name" class="bg-slate-50 border border-slate-300 text-slate-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400  dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
              </div>
              <div class="col-span-2 sm:col-span-1">
                  <label for="price" class="block mb-2 text-sm font-medium text-slate-300 ">Price</label>
                  <input type="number" name="price" id="price" class="bg-slate-50 border border-slate-300 text-slate-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400  dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" />
              </div>
              <div class="col-span-2 sm:col-span-1">
                  <label for="category" class="block mb-2 text-sm font-medium text-slate-300 ">Category</label>
                  <select id="category" class="bg-slate-50 border border-slate-300 text-slate-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400  dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option >Select category</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                  </select>
              </div>
              <div class="col-span-2">
                  <label for="description" class="block mb-2 text-sm font-medium text-slate-300 ">Product Description</label>
                  <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-slate-300 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"/>
              </div>
          </div>
          <div class='flex'>
            <button type="submit" class="ml-auto text-slate-300 inline-flex items-center bg-slate-700 hover:bg-slate-600 font-medium rounded-lg text-sm p-2 text-center">
              <PlusIcon/>
              Add new product
            </button>

          </div>
      </form>
  </div>
};
