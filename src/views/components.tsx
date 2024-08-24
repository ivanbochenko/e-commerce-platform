export const Message = ({text, success}: {text: string, success: boolean}) => {
  return <div class="w-full rounded-lg">
      <div class="flex flex-col items-center pb-10">
      <span class={success ? "text-xl m-5 text-green-400" : "text-xl m-5 text-red-400"}>{text}</span>
      <a href="/" class="w-full text-slate-300 text-center px-5 py-2.5 bg-slate-600 font-medium rounded-lg">Home</a>
      </div>
    </div>
};

export const Spinner = ({ }) => {
  return <img class="htmx-indicator mx-2 w-8" src="../../public/three-dots.svg"/>
}

export const Button = ({message}: {message?: string}) => {
  return <button type="submit" class="w-full text-slate-300 bg-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      {message}
      <Spinner/>
    </button>
}
