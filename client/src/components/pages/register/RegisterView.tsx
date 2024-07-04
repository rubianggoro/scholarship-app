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
import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { cn } from "../../../lib/utils";
import {
  AcademicCapIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { Button } from "../../ui/button";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../graphql/Mutation";
import { useToast } from "../../ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Nama tidak boleh kosong",
  }),
  email: z.string().min(1, {
    message: "Email tidak boleh kosong",
  }),
  password: z.string().min(1, {
    message: "Password tidak boleh kosong",
  }),
});

const mailingLists = [
  {
    id: 1,
    title: "Pencari Beasiswa",
    description: "Pilih jika Anda pencari beasiswa",
    icon: <AcademicCapIcon className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "Penyedia Beasiswa",
    description: "Pilih jika Anda menyediakan beasiswa",
    icon: <BuildingOffice2Icon className="w-6 h-6 text-primary" />,
  },
];

export default function RegisterView() {
  const [steps, setSteps] = useState(1);
  const [selectedMailingLists, setSelectedMailingLists] = useState(
    mailingLists[0]
  );
  const { toast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [createUser, { loading }] = useMutation(CREATE_USER);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isStudent = searchParams.get("isStudent");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log("data submit", data);
    const result = await createUser({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
        isStudent: isStudent === "true" ? true : false,
      },
    });

    if (result.data?.createUser.success) {
      form.reset();
      toast({
        title: "Berhasil Daftar!",
        variant: "success",
        description: "Akun Anda Berhasil Terdaftar",
      });
      navigate("/login");
    } else {
      toast({
        title: "Gagal Daftar",
        variant: "destructive",
        description: "Username sudah terdaftar",
      });
    }
  }

  const handleNextStep = () => {
    setSearchParams({
      isStudent: selectedMailingLists.id === 1 ? "true" : "false",
    });
    setSteps(2);
  };

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
                Daftar
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Mulai dan dapatkan beasiswa.
              </p>
            </div>

            {steps === 1 ? (
              <div className="mt-5">
                <fieldset>
                  <RadioGroup
                    value={selectedMailingLists}
                    onChange={setSelectedMailingLists}
                    className="space-y-4"
                  >
                    {mailingLists.map((mailingList) => (
                      <Radio
                        key={mailingList.id}
                        value={mailingList}
                        aria-label={mailingList.title}
                        className={({ focus }) =>
                          cn(
                            focus ? "border-primary ring-2 ring-primary" : "",
                            !focus ? "border-gray-300" : "",
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                          )
                        }
                      >
                        {({ checked, focus }) => (
                          <>
                            <span className="flex items-center flex-1 space-x-4">
                              <span className="bg-blue-100 rounded-md h-fit p-3">
                                {mailingList.icon}
                              </span>
                              <span className="flex flex-col">
                                <span className="block text-lg font-semibold text-gray-900">
                                  {mailingList.title}
                                </span>
                                <span className="flex items-center text-sm font-normal text-gray-500">
                                  {mailingList.description}
                                </span>
                              </span>
                            </span>
                            <CheckCircleIcon
                              className={cn(
                                !checked ? "invisible" : "",
                                "h-5 w-5 text-primary"
                              )}
                              aria-hidden="true"
                            />
                            <span
                              className={cn(
                                checked
                                  ? "border-primary"
                                  : "border-transparent",
                                focus ? "border" : "border-2",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>

                <div className="mt-10">
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full"
                  >
                    Selanjutnya
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-5">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {isStudent === "true" ? "Nama" : "Nama Organisasi"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                isStudent === "true"
                                  ? "Masukkan nama"
                                  : "Masukkan nama organisasi"
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {isStudent === "true"
                              ? "Email"
                              : "Email Organisasi"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={
                                isStudent === "true"
                                  ? "Masukkan email"
                                  : "Masukkan email organisasi"
                              }
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

                    <div className="mt-10">
                      <Button
                        disabled={loading}
                        type="submit"
                        className="w-full"
                      >
                        {loading ? "Loading..." : "Daftar"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            <div className="text-center mt-5">
              <p className="text-neutral-500 text-sm font-normal">
                Sudah memiliki akun?
                <Link to={"/login"} className="text-primary ml-1">
                  Masuk
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-20">
              <hr className="border-2 border-primary rounded-full w-full" />
              <hr
                className={cn(
                  steps === 1 ? "border-neutral-400" : "border-primary",
                  "border-2  rounded-full"
                )}
              />
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
