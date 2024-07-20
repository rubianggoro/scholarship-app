import { PlusIcon } from "@heroicons/react/20/solid";
import { BreadcrumbView } from "../../components/ui/breadcrumbview";
import { Button } from "../../components/ui/button";
import { DataTable } from "../../components/ui/data-table";
import DashboardSponsorship from "./Layout";
import { Link } from "react-router-dom";

const ScholarshipPage = () => {
  const data = [
    {
      id: 1,
      name: "Beasiswa Mahasiswa Nasional dan Internasional",
      level_student: "SMA/SMK Sederajat",
      deadline: "2024-07-01",
    },
  ];
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
    },
    {
      accessorKey: "id",
      header: "Aksi",
      cell: ({ row }: any) => {
        return (
          <div className="space-x-1">
            <Button size={"sm"} variant={"destructive"}>
              Hapus
            </Button>
            <Button size={"sm"} variant={"outline"}>
              Edit
            </Button>
            <Button size={"sm"}>Lihat Detail</Button>
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
          <DataTable columns={columns} data={data} />
        </div>
      </>
    </DashboardSponsorship>
  );
};

export default ScholarshipPage;
