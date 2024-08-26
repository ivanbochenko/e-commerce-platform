import { AvatarIcon } from "./Icons";

export const User = ({ name, email }: {name: string, email: string}) => {
  return (
    <section class="flex items-center justify-center mx-auto h-screen">
      <div class="flex flex-col items-center w-full p-4 space-y-4 max-w-sm rounded-lg shadow bg-slate-800">
        <div class='rounded-full bg-slate-600'>
          <AvatarIcon w={24} h={24}/>
        </div>
        <h5 class="text-xl font-medium text-slate-100">{name}</h5>
        <p class="text-sm text-slate-400">{email}</p>
        <div>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-slate-100 bg-slate-600 rounded-lg hover:bg-slate-500">Add friend</a>
          <a href="#" class="py-2 px-4 ml-4 text-sm font-medium text-slate-100 rounded-lg border border-slate-500 hover:bg-slate-500">Message</a>
        </div>
      </div>
    </section>
  )
};