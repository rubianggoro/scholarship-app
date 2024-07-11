import React from "react";
import Navbar from "../../components/layout/Navbar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import FileUpload from "../../components/ui/FileUpload";
import { Checkbox } from "../../components/ui/checkbox";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_SCHOLARSHIP } from "../../graphql/Mutation";
import { useToast } from "../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { GET_USER_BY_EMAIL } from "../../graphql/Query";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Nama Beasiswa tidak boleh kosong",
  }),
  level_student: z.string().min(1, {
    message: "Jenjang Beasiswa tidak boleh kosong",
  }),
  short_description: z.string().min(1, {
    message: "Deskripsi Singkat Beasiswa tidak boleh kosong",
  }),
  detailed_description: z.string().min(1, {
    message: "Deskripsi Detail Beasiswa tidak boleh kosong",
  }),
  banner_image: z.string().min(1, {
    message: "Banner Beasiswa tidak boleh kosong",
  }),
  document_upload: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "Dokumen tidak boleh kosong",
    }),
});

const items = [
  {
    id: "Ijazah",
    label: "Ijazah",
  },
  {
    id: "Daftar Riwayat Hidup",
    label: "Daftar Riwayat Hidup",
  },
  {
    id: "Surat Rekomendasi",
    label: "Surat Rekomendasi",
  },
  {
    id: "Pas Photo",
    label: "Pas Photo",
  },
  {
    id: "KTP/Akta Lahir",
    label: "KTP/Akta Lahir",
  },
] as const;

const levelStudent = ["SMA/SMK Sederajat", "S1", "S2", "S3"];

const ScholarshipUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const email = sessionStorage.getItem("email_user") || "";
  const { data: user } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: email },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      level_student: "",
      short_description: "",
      detailed_description: "",
      banner_image: "",
      document_upload: [],
    },
  });

  const [createScholarship, { loading }] = useMutation(CREATE_SCHOLARSHIP);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      ...data,
      user_id: Number(user?.getUserByEmail?.id),
    };
    const result = await createScholarship({
      variables: payload,
    });
    if (result.data?.createScholarship.success) {
      form.reset();
      toast({
        title: "Berhasil Unggah Beasiswa!",
        variant: "success",
        description: "Anda berhasil menambahkan Beasiswa",
      });
      navigate("/");
    } else {
      toast({
        title: "Gagal Unggah Beasiswa",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 py-10 sm:px-6 lg:px-8">
        <h1 className="text-neutral-950 font-semibold text-3xl">
          Unggah Beasiswa
        </h1>

        <div className="mt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Beasiswa</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Masukkan nama beasiswa"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level_student"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenjang Beasiswa</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="placeholder:text-neutral-400">
                            <SelectValue placeholder="Pilih jenjang beasiswa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levelStudent.map((val) => {
                            return (
                              <SelectItem key={val} value={val}>
                                {val}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="short_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi Singkat Beasiswa</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan deskripsi singkat"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="banner_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unggah Banner Beasiswa</FormLabel>
                      <FormControl>
                        <FileUpload
                          result={(e) => field.onChange(e)}
                          errorMessage={
                            form.formState.errors.banner_image?.message
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="detailed_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi Detail Beasiswa</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan deskripsi detail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="document_upload"
                  render={() => (
                    <FormItem>
                      <div className="mb-2">
                        <FormLabel>
                          Pilih Dokumen yang harus diunggah oleh Calon Peserta
                          Beasiswa
                        </FormLabel>
                      </div>

                      <div className="space-y-1">
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="document_upload"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value: any) =>
                                                  value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-10!">
                  <Button disabled={loading} type="submit" className="w-full">
                    {loading ? "Loading..." : "Unggah Beasiswa"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ScholarshipUpload;
