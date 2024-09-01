import { AvatarIcon } from "./Icons";
import { Layout } from "./layout";

export const UserView = ({ id, name, email }: {id: string, name: string, email: string}) => {
  return (
    <Layout>
      <section class="flex grow items-center justify-center mx-auto">
        <div class="flex flex-col items-center w-full p-4 space-y-4 max-w-sm rounded-lg shadow bg-slate-800">
          <div class="relative size-24 overflow-hidden bg-slate-600 rounded-full">
            <div class='absolute top-1'>
              <AvatarIcon size={24}/>
            </div>
          </div>
          <h5 class="text-xl font-medium text-slate-100">{name}</h5>
          <p class="text-sm text-slate-400">{email}</p>
          <div>
            <a href={"/product/user/" + id} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-slate-100 bg-slate-600 rounded-lg hover:bg-slate-500">Products</a>
            <a href="#" class="py-2 px-4 ml-4 text-sm font-medium text-slate-100 rounded-lg border border-slate-500 hover:bg-slate-500">Message</a>
          </div>
        </div>
      </section>
    </Layout>
  )
};