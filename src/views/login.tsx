import { Button } from "./components";

export const Login = ({ }) => {
  return <section class="flex flex-col items-center justify-center md:h-screen">
      <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-slate-800">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-300 md:text-2xl">
                  Sign in to your account
              </h1>
              <form hx-post="/auth/sign-in" class="space-y-4 md:space-y-6" >
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-slate-300">Your email</label>
                      <input type="email" name="email" id="email" class="bg-slate-700 text-slate-100 rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder="name@company.com" required={true}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-slate-300">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-slate-700 text-slate-100 rounded-lg block w-full p-2.5 placeholder-gray-400" required={true}/>
                  </div>
                  <div class="flex items-center justify-between">
                      <a href="/auth/forgot-password" class="text-sm font-medium text-slate-300 hover:underline">Forgot password?</a>
                  </div>
                  <Button message="Sign in"/>
                  <p class="text-sm font-light text-slate-400">
                      Don’t have an account yet? <a href="/auth/sign-up" class="font-medium text-slate-300 hover:underline">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </section>
};

export const Forgot = ({ }) => {
  return <section class="flex flex-col items-center justify-center md:h-screen">
      <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-slate-800">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-300 md:text-2xl">
                  Forgot password
              </h1>
              <form hx-post="/auth/restore" class="space-y-4 md:space-y-6" >
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-slate-300">Your email</label>
                      <input type="email" name="email" id="email" class="bg-slate-700 text-slate-100 rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder="name@company.com" required={true}/>
                  </div>
                  <Button message="Send me new password"/>
              </form>
          </div>
      </div>
  </section>
};


export const Register = ({ }) => {
  return <section class="flex flex-col items-center justify-center md:h-screen">
      <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-slate-800">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-300 md:text-2xl">
                  Forgot password
              </h1>
              <form hx-post="/auth/register" class="space-y-4 md:space-y-6" >
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-slate-300">Your email</label>
                      <input type="email" name="email" id="email" class="bg-slate-700 text-slate-100 rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder="name@company.com" required={true}/>
                  </div>
                  <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-slate-300">Your name</label>
                      <input type="name" name="name" id="name" class="bg-slate-700 text-slate-100 rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder="John Jones" required={true}/>
                  </div>
                  <div>
                      <label for="password1" class="block mb-2 text-sm font-medium text-slate-300">Your password</label>
                      <input type="password1" name="password1" id="password1" class="bg-slate-700 text-slate-100 rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder="••••••••" required={true}/>
                  </div>
                  <div>
                      <label for="password2" class="block mb-2 text-sm font-medium text-slate-300">Repeat your password</label>
                      <input type="password2" name="password2" id="password2" class="bg-slate-700 text-slate-100 rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder="••••••••" required={true}/>
                  </div>
                  <Button message="Sign up"/>
              </form>
          </div>
      </div>
  </section>
};