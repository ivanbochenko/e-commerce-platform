import Footer from "./footer";
import Search from "./search";

export default function Layout({ children }: { children: JSX.Element }) {
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
      <body class="min-h-screen flex flex-col justify-between bg-slate-400">

        <nav
          class="relative flex w-full flex-wrap items-center justify-between bg-slate-800 py-2 px-3 shadow-dark-mild lg:py-4">
            <a href="/" class="ms-2 text-xl font-semibold text-sky-400">Fabric</a>
            <Search/>
        </nav>

        <main class="m-4 flex-grow">{children}</main>
        
        <Footer/>

      </body>
    </html>
  );
}