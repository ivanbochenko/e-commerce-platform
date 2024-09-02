import { Input } from "./components";
import { PlusIcon } from "./Icons";

export const NewItem = ({}) => {
  return <form
      hx-post="/item/add"
      hx-swap="outerHTML"
      // hx-headers='{"Content-Type": "application/json"}'
      class="flex flex-col sm:mx-auto grid grid-cols-1 sm:grid-cols-2 p-4 m-4 gap-4 bg-slate-800 rounded-lg"
    >
      <div class='col-span-2 sm:col-span-1'>
        <h3 class="text-lg font-semibold text-slate-300">
          Add New Product
        </h3>
      </div>
      <div class="col-span-2">
        <Input name="name" placeholder="Product name"/>
      </div>
      <div class="col-span-2">
        <div>
          <Input name="image" placeholder="Enter image url"/>
        </div>
      </div>
      {/* <div class="col-span-2 sm:col-span-1">
        <Input type="number" name="price" placeholder="99"/>
      </div> */}
      {/* <div class="col-span-2 sm:col-span-1">
          <label for="category" class="block mb-2 text-sm font-medium text-slate-300 ">Category</label>
          <select id="category" class="bg-slate-700 text-slate-300 text-sm rounded-lg block w-full p-2.5">
              <option >Select category</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
          </select>
      </div> */}
      <div class="col-span-2 sm:col-span-1">
        <Input name="price" placeholder="99"/>
      </div>
      <div class="col-span-2">
        <Input name="description" placeholder="Product descritpion"/>
      </div>

      <div class='col-span-2 sm:col-span-1'>
        <button type="submit" class="text-slate-300 w-full inline-flex items-center bg-slate-700 hover:bg-slate-600 font-medium rounded-lg text-sm p-2 text-center">
          <PlusIcon/>
          Add new product
        </button>
      </div>
    </form>
};
