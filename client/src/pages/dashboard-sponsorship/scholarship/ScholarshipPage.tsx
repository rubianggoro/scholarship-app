import { PlusIcon } from "@heroicons/react/20/solid";
import { BreadcrumbView } from "../../../components/ui/breadcrumbview";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/data-table";
import DashboardSponsorship from "../Layout";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SCHOLARSHIP_BY_USER_ID } from "../../../graphql/Query";
import { FormatDate } from "../../../lib/utils";

const ScholarshipPage = () => {
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
            <Button size={"sm"} variant={"destructive"}>
              Hapus
            </Button>
            <Button size={"sm"} variant={"outline"}>
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
    </DashboardSponsorship>
  );
};

export default ScholarshipPage;
