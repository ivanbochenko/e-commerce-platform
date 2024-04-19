export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <html>


    <head>
      <title>Tradeplan</title>
      <script
        src="https://unpkg.com/htmx.org@1.9.10"
        integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
        crossorigin="anonymous"></script>
      <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>


    <body class="min-h-screen flex flex-col justify-between bg-gray-800">
      <nav
        class="relative flex w-full flex-wrap items-center justify-between bg-gray-900 py-2 shadow-dark-mild lg:py-4">
        <div class="flex w-full flex-wrap items-center justify-between px-3">
          <span class="ms-2 text-xl font-semibold text-black dark:text-white">Tradeplan</span>
          <div class="ms-5 flex w-[30%] items-center justify-between">
            <input
              type="search"
              class="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-zinc-200 dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2" />
              
            {/* search icon */}
            <span
              class="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-600 dark:text-white [&>svg]:w-5"
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
        </div>
      </nav>


      <main class="m-4 flex-grow">{children}</main>
      

      <footer class="p-4 bg-white shadow dark:bg-gray-900">
          <div class="w-full max-w-screen-xl mx-auto md:py-2">
              <div class="sm:flex sm:items-center sm:justify-between">
                  <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                      {/* <img src="..\images\logo.png" class="h-8" alt="Tradeplan Logo" /> */}
                      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Tradeplan</span>
                  </a>
                  <ul class="flex flex-wrap items-center mb-4 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                      <li>
                          <a href="#" class="hover:underline me-4 md:me-6">About</a>
                      </li>
                      <li>
                          <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                      </li>
                      <li>
                          <a href="#" class="hover:underline">Contact</a>
                      </li>
                  </ul>
              </div>
              <hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
              <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">Tradeplan</a>. All Rights Reserved.</span>
          </div>
      </footer>
    </body>


    </html>
  );
}