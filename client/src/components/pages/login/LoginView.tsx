import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

const FormSchema = z.object({
  email: z.string().min(1, {
    message: "Email tidak boleh kosong",
  }),
  password: z.string().min(1, {
    message: "Password tidak boleh kosong",
  }),
});

export default function LoginView() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data submit", data);
  }

  return (
    <>
      <div className="grid grid-cols-2 flex-1 min-h-[100vh]">
        <div className="h-full flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to={"/"}>
                <img
                  className="h-5 w-auto"
                  src="/assets/logo.png"
                  alt="Your Company"
                />
              </Link>

              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Masuk
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Mulai dan dapatkan beasiswa.
              </p>
            </div>

            <div className="mt-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Masukkan email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kata Sandi</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Masukkan kata sandi"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm leading-6 text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Masuk
                    </button>
                  </div>
                </form>
              </Form>
            </div>

            <div className="text-center mt-5">
              <p className="text-neutral-500 text-sm font-normal">
                Belum memiliki akun?
                <Link
                  to={"/register"}
                  className="text-primary ml-1 font-medium"
                >
                  Buat Akun
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="relative hidden h-full  bg-[#F9FAFB] lg:block">
          <div className="pl-10 mt-28">
            <h1 className="text-5xl text-primary font-bold">
              Cari dan Dapatkan Beasiswa
            </h1>
            <div className="flex space-x-3">
              <p className="text-3xl text-gray-800 font-medium">Hanya di</p>
              <img
                className="inline h-10 w-auto"
                src="/assets/logo.png"
                alt=""
              />
            </div>
          </div>
          <div>
            <img
              className="min-h-[calc(100vh-200px)]"
              src="/assets/hero-login.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
