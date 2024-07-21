import React from "react";
import DashboardView from "../Layout";
import { BreadcrumbView } from "../../../components/ui/breadcrumbview";
import { DataTable } from "../../../components/ui/data-table";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_APPLICANTS_BY_USER_ID } from "../../../graphql/Query";
import { ConvertStatusApplicants } from "../../../lib/Helpers";

const ApplicantsView = () => {
  const { user_id } = useParams();

  const { data } = useQuery(GET_APPLICANTS_BY_USER_ID, {
    variables: { user_id },
  });

  const columns = [
    {
      accessorKey: "no_column",
      header: "No",
    },
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "scholarship",
      header: "Nama Beasiswa",
      cell: ({ row }: any) => row.getValue("scholarship")?.name,
    },
    {
      accessorKey: "last_education",
      header: "Pendidikan Terakhir",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        return ConvertStatusApplicants(row.getValue("status"));
      },
    },
    {
      accessorKey: "document_upload",
      header: "File",
      cell: ({ row }: any) => (
        <a
          href={row.getValue("document_upload")}
          target="__blank"
          className="text-blue-600 underline"
        >
          File
        </a>
      ),
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
    <DashboardView>
      <>
        <BreadcrumbView pages={page} />
        <h1 className="text-2xl text-neutral-950 font-bold">Daftar Aplikasi</h1>

        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.getApplicantsByUserId || []}
          />
        </div>
      </>
    </DashboardView>
  );
};

export default ApplicantsView;
