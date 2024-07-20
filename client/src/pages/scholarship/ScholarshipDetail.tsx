import { useMutation, useQuery } from "@apollo/client";
import Navbar from "../../components/layout/Navbar";
import { GET_SCHOLARSHIP_BY_ID, GET_USER_BY_EMAIL } from "../../graphql/Query";
import { useNavigate, useParams } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { FormatDate } from "../../lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
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
import { Button } from "../../components/ui/button";
import { useEffect } from "react";
import { CREATE_APPLICANTS } from "../../graphql/Mutation";
import { useToast } from "../../components/ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Nama tidak boleh kosong",
  }),
  last_education: z.string().min(1, {
    message: "Pendidikan Terakhir tidak boleh kosong",
  }),
  short_self_desc: z.string().min(1, {
    message: "Deskripsi Singkat tidak boleh kosong",
  }),
  document_upload: z.string().min(1, {
    message: "Banner Beasiswa tidak boleh kosong",
  }),
});

const levelStudent = ["SMA/SMK Sederajat", "S1", "S2", "S3"];

const ScholarshipDetail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  let { id } = useParams();
  const isLoggedIn =
    sessionStorage.getItem("isLoggedIn") === "true" ? true : false;
  const email = sessionStorage.getItem("email_user") || "";
  const { data: user } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: email },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/login?from=/scholarship/${id}`);
    }
  }, []);

  const { data } = useQuery(GET_SCHOLARSHIP_BY_ID, {
    variables: { id },
  });

  const detail = data?.getScholarById;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      last_education: "",
      short_self_desc: "",
      document_upload: "",
    },
  });

  const [createApplicants, { loading }] = useMutation(CREATE_APPLICANTS);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      ...data,
      user_id: Number(user?.getUserByEmail.id),
      scholarship_id: Number(id),
      status: 801, // Mengajukan Aplikasi
    };

    const result = await createApplicants({
      variables: payload,
    });

    if (result.data?.createApplicants.success) {
      form.reset();
      toast({
        title: "Berhasil Mengajukan Beasiswa!",
        variant: "success",
        description: "Anda berhasil Mengajukan Beasiswa",
      });
      navigate(`/scholarship/${id}`);
    } else {
      toast({
        title: "Gagal Mengajukan Beasiswa",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 py-10 sm:px-6 lg:px-8">
        <span className="bg-blue-100 text-blue-600 rounded-full px-3 py-2 text-sm">
          <span className="bg-blue-200 text-blue-800 rounded-full px-2 py-0.5 text-sm mr-2">
            Dalam Negeri
          </span>
          Beasiswa Terkini
        </span>

        <div className="mt-5">
          <h1 className="text-5xl text-neutral-950 font-semibold">
            {detail?.name}
          </h1>

          <div className="bg-neutral-100 rounded-md mt-10">
            <img
              className="w-full object-contain h-[402px] "
              src={detail?.banner_image}
              alt=""
            />
          </div>
          <div className="mt-5">
            <div className="flex space-x-10">
              <div>
                <p className="text-blue-600 text-sm">Diunggah oleh</p>
                <p className="flex items-center space-x-2 font-medium text-neutral-950 text-lg">
                  <span className="bg-blue-100 flex items-center rounded-full p-1 mr-2">
                    <UserIcon className="w-5 h-5 text-blue-600 font-bold" />
                  </span>{" "}
                  {detail?.user?.name}
                </p>
              </div>
              <div>
                <p className="text-blue-600 text-sm">Deadline Submisi</p>
                <p className="flex items-center space-x-2 font-medium text-neutral-950 text-lg">
                  {FormatDate(new Date(detail?.deadline))}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-3xl text-neutral-950 font-semibold">
              Introduction
            </h1>
            <p className="text-lg text-neutral-600">
              {detail?.short_description}
            </p>
          </div>

          <div className="mt-10">
            <h1 className="text-3xl text-neutral-950 font-semibold">
              Daftar Beasiswa
            </h1>
            <p className="text-lg text-neutral-600">
              {detail?.detailed_description}
            </p>
          </div>
        </div>

        {user?.getUserByEmail?.isStudent ? (
          <div className="mt-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-5"
              >
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
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
                    name="last_education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pendidikan Terakhir</FormLabel>
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
                </div>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="short_self_desc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi Singkat Diri</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="document_upload"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Upload Dokumen {detail?.document_upload.join(", ")}{" "}
                          <span className="text-neutral-400">
                            (dalam 1 PDF)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            result={(e) => field.onChange(e)}
                            errorMessage={
                              form.formState.errors.document_upload?.message
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-10!">
                    <Button disabled={loading} type="submit" className="w-full">
                      {loading ? "Loading..." : "Ajukan Beasiswa"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ScholarshipDetail;
