export default function User({ name, email }: {name: string, email: string}) {
  return (
    <section class="flex items-center justify-center mx-auto h-screen">
      <div class="flex flex-col items-center w-full p-4 space-y-4 max-w-sm rounded-lg shadow bg-slate-800">
        <svg class="w-20 h-20 rounded-full shadow-lg text-slate-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        <h5 class="text-xl font-medium text-slate-100">{name}</h5>
        <p class="text-sm text-slate-400">{email}</p>
        <div>
          <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-slate-100 bg-slate-400 rounded-lg hover:bg-slate-500">Add friend</a>
          <a href="#" class="py-2 px-4 ml-4 text-sm font-medium text-slate-100 rounded-lg border border-slate-500 hover:bg-slate-500">Message</a>
        </div>
      </div>
    </section>
  )
};
