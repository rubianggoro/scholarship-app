import React from "react";
import { useMutation } from "@apollo/client";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import { CREATE_USER } from "../graphql/Mutation";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Username tidak boleh kosong",
  }),
  name: z.string().min(1, {
    message: "Nama tidak boleh kosong",
  }),
  password: z.string().min(1, {
    message: "Password tidak boleh kosong",
  }),
});

function CreateUserPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      name: "",
      password: "",
    },
  });

  const [createUser] = useMutation(CREATE_USER);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await createUser({
      variables: {
        name: data.name,
        username: data.username,
        password: data.password,
      },
    });

    if (result.data?.createUser.success) {
      form.reset();
      toast({
        title: "Berhasil Daftar!",
        variant: "success",
        description: "Akun Anda Berhasil Terdaftar",
      });
    } else {
      toast({
        title: "Gagal Daftar",
        variant: "destructive",
        description: "Username sudah terdaftar",
      });
    }
  }

  return (
    <div className="flex w-full justify-center items-center min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-52 space-y-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan username" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateUserPage;
