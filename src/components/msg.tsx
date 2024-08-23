export const Success = ({message}: {message?: string}) => {
  return <div class="w-full rounded-lg">
      <div class="flex flex-col items-center pb-10">
      <span class="text-xl m-5 text-green-400">Success!</span>
      { message ? <span class="text-xl m-5 text-slate-300">{message}</span> : null}
      <a href="/" class="w-full text-slate-300 text-center px-5 py-2.5 bg-slate-600 font-medium rounded-lg">Home</a>
      </div>
  </div>
  
};

export const Error = ({message}: {message?: string}) => {
  return <div class="w-full rounded-lg">
      <div class="flex flex-col items-center pb-10">
      <span class="text-xl m-5 text-red-400">Error!</span>
      { message ? <span class="text-xl m-5 text-slate-300">{message}</span> : null}
      <a href="/" class="w-full text-slate-300 text-center px-5 py-2.5 bg-slate-600 font-medium rounded-lg">Home</a>
      </div>
  </div>
  
};
