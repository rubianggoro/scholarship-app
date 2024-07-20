import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../graphql/Mutation";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  email: z.string().min(1, {
    message: "Email tidak boleh kosong",
  }),
  password: z.string().min(1, {
    message: "Password tidak boleh kosong",
  }),
});

export default function LoginView() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [form.watch("email") || form.watch("password")]);

  const [login, { loading }] = useMutation(LOGIN);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await login({
      variables: data,
    });
    if (result.data.login.success) {
      if (from) {
        navigate(from);
      } else {
        navigate("/");
      }
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("email_user", data.email);
    } else {
      if (result.data.login.message === "USER DOESN'T EXIST") {
        setErrorMessage("User tidak terdaftar!");
      }
      if (result.data.login.message === "EMAIL OR PASSWORD NOT MATCH") {
        setErrorMessage("Email/password tidak sesuai");
      }
    }
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

            {errorMessage ? (
              <div className="border-2 border-red-500 bg-red-50 p-2 rounded-md">
                <p className="text-red-500 text-sm font-normal">
                  {errorMessage}
                </p>
              </div>
            ) : null}

            <div className="mt-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
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

                  <div>
                    <Button disabled={loading} type="submit" className="w-full">
                      {loading ? "Loading..." : "Masuk"}
                    </Button>
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
