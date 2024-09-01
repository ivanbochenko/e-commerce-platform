import { Button, Input } from "./components";
import { Layout } from "./layout";

export const LoginView = ({ }) => {
  return <Layout footer={false} nav={false}>
    <section class="flex flex-col items-center justify-center md:h-screen">
      <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-slate-800">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-300 md:text-2xl">
                Sign in to your account
            </h1>
            <form hx-post="/auth/sign-in" class="space-y-4 md:space-y-6" >
              <Input name='email' placeholder='name@mail.com'/>
              <Input name="password" placeholder="••••••••"/>
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
  </Layout>
};

export const ForgotPassView = ({ }) => {
  return <Layout footer={false} nav={false}>
    <section class="flex flex-col items-center justify-center md:h-screen">
      <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-slate-800">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-300 md:text-2xl">
                Forgot password
            </h1>
            <form hx-post="/auth/restore" class="space-y-4 md:space-y-6" >
              <Input name='email' placeholder='name@mail.com'/>
              <Button message="Send me new password"/>
            </form>
          </div>
        </div>
    </section>
  </Layout>
};


export const RegisterView = ({ }) => {
  return <Layout footer={false} nav={false}>
    <section class="flex flex-col items-center justify-center md:h-screen">
      <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-slate-800">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-slate-300 md:text-2xl">
            Create account
          </h1>
          <form hx-post="/auth/register" class="space-y-4 md:space-y-6" >
            <Input name='email' placeholder='name@mail.com'/>
            <Input name='name' placeholder='John Sean'/>
            <Input name="password" placeholder="••••••••"/>
            <Input name="password2" title="Repeat your password" placeholder="••••••••"/>
            <Button message="Sign up"/>
          </form>
        </div>
      </div>
    </section>
  </Layout>
};