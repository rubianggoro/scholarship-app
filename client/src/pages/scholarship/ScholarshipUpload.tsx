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
import { CREATE_SCHOLARSHIP, UPDATE_SCHOLARSHIP } from "../../graphql/Mutation";
import { useToast } from "../../components/ui/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  GET_ALL_SCHOLARSHIP,
  GET_SCHOLARSHIP_BY_ID,
  GET_SCHOLARSHIP_BY_USER_ID,
  GET_USER_BY_EMAIL,
} from "../../graphql/Query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { cn, FormatDateLocal } from "../../lib/utils";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { Calendar } from "../../components/ui/calendar";

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
  deadline: z.date({
    required_error: "Deadline tidak boleh kosong",
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
  const [searchParams] = useSearchParams();
  const scholarshipId = searchParams.get("scholarshipId");

  const navigate = useNavigate();
  const { toast } = useToast();

  const { data } = useQuery(GET_SCHOLARSHIP_BY_ID, {
    variables: { id: scholarshipId },
  });

  const detail = data?.getScholarById;

  const email = sessionStorage.getItem("email_user") || "";
  const { data: user } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: email },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: detail ? detail?.name : "",
      level_student: detail ? detail?.level_student : "",
      short_description: detail ? detail?.short_description : "",
      detailed_description: detail ? detail?.detailed_description : "",
      banner_image: detail ? detail?.banner_image : "",
      deadline: detail ? detail?.deadline : "",
      document_upload: detail ? detail?.document_upload : [],
    },
  });

  const [createScholarship, { loading }] = useMutation(CREATE_SCHOLARSHIP, {
    refetchQueries: [
      {
        query: GET_ALL_SCHOLARSHIP,
      },
      {
        query: GET_SCHOLARSHIP_BY_USER_ID,
        variables: { user_id: user?.getUserByEmail?.id },
      },
    ],
  });

  const [updateScholarship, { loading: isLoadingUpdate }] = useMutation(
    UPDATE_SCHOLARSHIP,
    {
      refetchQueries: [
        {
          query: GET_ALL_SCHOLARSHIP,
        },
        {
          query: GET_SCHOLARSHIP_BY_USER_ID,
          variables: { user_id: user?.getUserByEmail?.id },
        },
      ],
    }
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      ...data,
      id: scholarshipId ? Number(scholarshipId) : undefined,
      deadline: FormatDateLocal(data.deadline),
      user_id: Number(user?.getUserByEmail?.id),
    };
    const result = scholarshipId
      ? await updateScholarship({
          variables: payload,
        })
      : await createScholarship({
          variables: payload,
        });

    if (!scholarshipId && result.data.createScholarship.success) {
      form.reset();
      toast({
        title: "Berhasil Unggah Beasiswa!",
        variant: "success",
        description: "Anda berhasil menambahkan Beasiswa",
      });
      navigate("/");
    } else if (scholarshipId && result.data?.updateScholarship.success) {
      form.reset();
      toast({
        title: "Berhasil Edit Beasiswa!",
        variant: "success",
        description: "Anda berhasil edit Beasiswa",
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
          {scholarshipId ? "Edit Beasiswa" : "Unggah Beasiswa"}
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
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Deadline Beasiswa</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal border border-neutral-400 mt-1",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                new Date(field.value).toLocaleDateString("id")
                              ) : (
                                <span>Pilih deadline</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
                          disabled={scholarshipId ? true : false}
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
                    {loading || isLoadingUpdate
                      ? "Loading..."
                      : scholarshipId
                      ? "Edit Beasiswa"
                      : "Unggah Beasiswa"}
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
