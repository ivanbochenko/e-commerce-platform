export default function Layout({ children }: { children: JSX.Element}) {
  return (
    <html>
      <head>
        <title>Fabric</title>
        <link rel="shortcut icon" type="image/x-icon" href="/public/favicon.ico"></link>
        <script
          src="https://unpkg.com/htmx.org@1.9.10"
          integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
          crossorigin="anonymous"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="min-h-screen flex flex-col justify-between bg-slate-600">
        <main class="flex-grow">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}

const Footer = () => (
  <footer>
    <div class="bg-slate-800 rounded-lg shadow m-4 w-1/2 mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-gray-500 sm:text-center">
        © 2024 <a href="/" class="hover:underline">Fabric™</a>.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
        <li>
            <a href="/" class="hover:underline me-4 md:me-6">Home</a>
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
  </footer>
)