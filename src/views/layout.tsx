import { Inbox } from "./components";
import { AvatarIcon } from "./Icons"

const css = `
.htmx-indicator{
  display:none;
}
.htmx-request .htmx-indicator{
  display:inline;
}
.htmx-request.htmx-indicator{
  display:inline;
}
`

export const Layout = ({ children, footer=true, nav=true, fix_h=false }: { children: JSX.Element, footer?: boolean, nav?: boolean, fix_h?: boolean}) => {
  return (
    <html>
      <head>
        <title>{process.env.PROJECT_NAME}</title>
        <link rel="shortcut icon" type="image/x-icon" href="/public/favicon.ico"></link>
        <script src="https://unpkg.com/htmx.org@2.0.2"/>
        <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"/>
        <script src="https://unpkg.com/htmx.org@1.9.12/dist/ext/ws.js"/>
        <script src="https://cdn.tailwindcss.com"/>
        <style>{css}</style>
      </head>
      <body hx-boost="true" hx-ext="loading-states" class={ "flex flex-col bg-slate-600 justify-between " + (fix_h ? 'h-screen' : 'min-h-screen') }>
        {nav ? <Navbar/> : null}
        {children}
        {footer ? <Footer/> : null}
      </body>
    </html>
  );
}

export const Navbar = () => {
  return (
    <nav class="relative flex items-center justify-between bg-slate-800 p-4">
      <a href="/" class="text-xl font-semibold text-sky-300">{process.env.PROJECT_NAME}</a>
      <div class='flex space-x-4'>
        <div hx-get='/inbox' hx-trigger='load once'>
          <Inbox count={0}/>
        </div>
        <a href="/user" class="relative w-10 h-10 overflow-hidden bg-slate-600 hover:bg-slate-500 rounded-full">
          <div class='absolute top-1'>
            <AvatarIcon size={10}/>
          </div>
        </a>
      </div>
    </nav>
  )
}

export const Footer = () => (
  <footer>
    <div class="bg-slate-800 rounded-lg shadow m-4 w-1/2 mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-slate-400 sm:text-center">
        © 2024 <a href="/" class="hover:underline">{process.env.PROJECT_NAME}™</a>
      </span>
      <ul class="flex flex-wrap items-center text-sm font-medium text-slate-400 sm:mt-0">
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