import { PlusIcon } from "@heroicons/react/20/solid";
import { BreadcrumbView } from "../../../components/ui/breadcrumbview";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import DashboardSponsorship from "../Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SCHOLARSHIP_BY_USER_ID } from "../../../graphql/Query";
import { FormatDate } from "../../../lib/utils";
import Modal from "../../../components/ui/modal";
import { useState } from "react";
import { DELETE_SCHOLARSHIP } from "../../../graphql/Mutation";
import { useToast } from "../../../components/ui/use-toast";

const ScholarshipPage = () => {
  const [scholarshipId, setScholarshipId] = useState(0);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user_id } = useParams();

  const { data } = useQuery(GET_SCHOLARSHIP_BY_USER_ID, {
    variables: { user_id },
  });

  const columns = [
    {
      accessorKey: "no_column",
      header: "No",
    },
    {
      accessorKey: "name",
      header: "Nama Beasiswa",
    },
    {
      accessorKey: "level_student",
      header: "Jenjang pendidikan",
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }: any) => {
        return FormatDate(new Date(row.getValue("deadline")));
      },
    },
    {
      accessorKey: "id",
      header: "Aksi",
      cell: ({ row }: any) => {
        return (
          <div className="space-x-2">
            <Button
              size={"sm"}
              variant={"destructive"}
              onClick={() => {
                setIsOpen(true);
                setScholarshipId(row.getValue("id"));
              }}
            >
              Hapus
            </Button>
            <Button
              onClick={() =>
                navigate(
                  `/scholarship/upload?scholarshipId=${row.getValue("id")}`
                )
              }
              size={"sm"}
              variant={"outline"}
            >
              Edit
            </Button>
            <Link
              to={`/${user_id}/dashboard-sponsorship/scholarship/${row.getValue(
                "id"
              )}`}
            >
              <Button size={"sm"}>Lihat Detail</Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const page = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Dashboard",
      href: "#",
    },
  ];

  const [deleteScholarship, { loading }] = useMutation(DELETE_SCHOLARSHIP, {
    refetchQueries: [
      {
        query: GET_SCHOLARSHIP_BY_USER_ID,
        variables: { user_id },
      },
    ],
  });

  const handleDelete = async () => {
    const payload = {
      id: Number(scholarshipId),
    };

    const result = await deleteScholarship({
      variables: payload,
    });

    if (result.data?.deleteScholarship.success) {
      toast({
        title: "Berhasil Hapus Beasiswa!",
        variant: "success",
        description: "Anda berhasil hapus beasiswa",
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Gagal hapus beasiswa",
        variant: "destructive",
      });
    }
  };
  return (
    <DashboardSponsorship>
      <>
        <BreadcrumbView pages={page} />
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-neutral-950 font-bold">
            Daftar Beasiswa
          </h1>
          <Link to={"/scholarship/upload"}>
            <Button>
              <PlusIcon className="w-4 h-4" />
              Tambah Beasiswa
            </Button>
          </Link>
        </div>

        <div className="mt-5">
          <DataTable columns={columns} data={data?.getScholarByUserId || []} />
        </div>
      </>
      <Modal open={isOpen} title={"Hapus Beasiswa?"}>
        <div>
          <p className="text-neutral-700 text-base">
            Yakin ingin hapus beasiswa terpilih?
          </p>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => setIsOpen(false)}
            >
              Batalkan
            </Button>
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={handleDelete}
              disabled={loading}
            >
              Hapus Beasiswa
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardSponsorship>
  );
};

export default ScholarshipPage;
