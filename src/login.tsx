export default function Login({ }) {
  return <section class="flex flex-col items-center justify-center mx-auto md:h-screen">
      <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-800 border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-300 md:text-2xl">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-slate-300">Your email</label>
                      <input type="email" name="email" id="email" class="bg-slate-700 text-slate-300 rounded-lg block w-full p-2.5 placeholder-gray-400" placeholder="name@company.com" required={true}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-slate-300">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-slate-700 text-slate-300 rounded-lg block w-full p-2.5 placeholder-gray-400" required={true}/>
                  </div>
                  <div class="flex items-center justify-between">
                      <a href="#" class="text-sm font-medium text-slate-300 hover:underline">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-slate-300 bg-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                  <p class="text-sm font-light text-slate-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-slate-300 hover:underline">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </section>
};
