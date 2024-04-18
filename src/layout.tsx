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
    <body class="bg-gray-800">{children}</body>
    

    <footer class="bg-white shadow dark:bg-gray-900">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-4">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    {/* <img src="..\images\logo.png" class="h-8" alt="Tradeplan Logo" /> */}
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tradeplan</span>
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


    </html>
  );
}