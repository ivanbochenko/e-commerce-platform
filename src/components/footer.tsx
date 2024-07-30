export default function Footer({ children }: { children?: JSX.Element }) {
  return (
    <footer class="p-4 bg-white shadow dark:bg-slate-800">
      <div class="w-full max-w-screen-xl mx-auto md:py-2">
          <div class="sm:flex sm:items-center sm:justify-between">
              <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                  {/* <img src="..\images\logo.png" class="h-8" alt="Tradeplan Logo" /> */}
                  <span class="self-center text-xl font-semibold whitespace-nowrap text-sky-400">Fabric</span>
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
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/" class="hover:underline">Fabric</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}