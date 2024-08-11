export default function Search({ children }: { children?: JSX.Element }) {
  return (
    <div class="flex w-1/4 items-center justify-between">
      {/* search */}
      <input
        type="search"
        class="relative block w-[1px] min-w-0 flex-auto rounded bg-clip-padding p-2 font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-gray-200 focus:shadow-inset focus:outline-none motion-reduce:transition-none border-white/10 bg-slate-700 text-white placeholder:text-neutral-300 autofill:shadow-autofill"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon2"
      />
      <span
        class="absolute right-6 items-center whitespace-nowrap rounded pl-2 text-center font-normal text-gray-600 text-white [&>svg]:w-5"
        id="basic-addon2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd" />
        </svg>
      </span>
    </div>
  );
}

