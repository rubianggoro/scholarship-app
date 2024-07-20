import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_SCHOLARSHIP_DASHBOARD_BY_ID } from "../../../graphql/Query";
import DashboardSponsorship from "../Layout";
import { BreadcrumbView } from "../../../components/ui/breadcrumbview";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { FormatDate } from "../../../lib/utils";
import { DataTable } from "../../../components/ui/data-table";
import Modal from "../../../components/ui/modal";
import { UPDATE_STATUS_APPLICANT } from "../../../graphql/Mutation";
import { useToast } from "../../../components/ui/use-toast";
import { ConvertStatusApplicants } from "../../../lib/Helpers";

const ScholarshipDetailDashboard = () => {
  const [applicantId, setApplicantId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const [isOpenAccept, setIsOpenAccept] = useState(false);

  const { user_id, scholarship_id } = useParams();
  const { toast } = useToast();

  const { data } = useQuery(GET_SCHOLARSHIP_DASHBOARD_BY_ID, {
    variables: { id: scholarship_id },
  });

  const detailScholar = data?.getScholarById;

  const page = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Dashboard",
      href: `/${user_id}/dashboard-sponsorship`,
    },
    {
      name: "Detail Beasiswa",
      href: `#`,
    },
  ];

  const detail = [
    {
      label: "Nama Beasiswa:",
      value: detailScholar?.name,
    },
    {
      label: "Jenjang Beasiswa:",
      value: detailScholar?.level_student,
    },
    {
      label: "Deadline Beasiswa:",
      value: detailScholar?.deadline,
    },
    {
      label: "Deskripsi Singkat Beasiswa:",
      value: detailScholar?.short_description,
    },
    {
      label: "Deskripsi Detail Beasiswa:",
      value: detailScholar?.detailed_description,
    },
  ];

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
      accessorKey: "last_education",
      header: "Pendidikan Terakhir",
    },
    {
      accessorKey: "short_self_desc",
      header: "Deskripsi Diri",
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
    {
      accessorKey: "id",
      header: "Aksi",
      cell: ({ row }: any) => {
        return (
          <div className="">
            {row.getValue("status") === 801 ? (
              <Button
                size={"sm"}
                onClick={() => {
                  setApplicantId(row.getValue("id"));
                  setIsOpen(true);
                }}
              >
                Proses Aplikasi
              </Button>
            ) : null}

            {row.getValue("status") === 802 ? (
              <div className="flex space-x-2">
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  onClick={() => {
                    setApplicantId(row.getValue("id"));
                    setIsOpenReject(true);
                  }}
                >
                  Tolak
                </Button>
                <Button
                  size={"sm"}
                  onClick={() => {
                    setApplicantId(row.getValue("id"));
                    setIsOpenAccept(true);
                  }}
                >
                  Terima
                </Button>
              </div>
            ) : null}
          </div>
        );
      },
    },
  ];

  const [updateStatusApplicant, { loading }] = useMutation(
    UPDATE_STATUS_APPLICANT,
    {
      refetchQueries: [
        {
          query: GET_SCHOLARSHIP_DASHBOARD_BY_ID,
          variables: { id: scholarship_id },
        },
      ],
    }
  );

  const handleProcess = async () => {
    const payload = {
      id: Number(applicantId),
      status: 802,
    };

    const result = await updateStatusApplicant({
      variables: payload,
    });

    if (result.data?.updateStatusApplicant.success) {
      toast({
        title: "Berhasil Update Status Aplikasi!",
        variant: "success",
        description: "Anda berhasil update status aplikasi",
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Gagal update status aplikasi",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    const payload = {
      id: Number(applicantId),
      status: -803,
    };

    const result = await updateStatusApplicant({
      variables: payload,
    });

    if (result.data?.updateStatusApplicant.success) {
      toast({
        title: "Berhasil Tolak Aplikasi!",
        variant: "success",
        description: "Anda berhasil update status aplikasi",
      });
      setIsOpenReject(false);
    } else {
      toast({
        title: "Gagal update status aplikasi",
        variant: "destructive",
      });
    }
  };

  const handleAccept = async () => {
    const payload = {
      id: Number(applicantId),
      status: 803,
    };

    const result = await updateStatusApplicant({
      variables: payload,
    });

    if (result.data?.updateStatusApplicant.success) {
      toast({
        title: "Berhasil Terima Aplikasi!",
        variant: "success",
        description: "Anda berhasil update status aplikasi",
      });
      setIsOpenAccept(false);
    } else {
      toast({
        title: "Gagal update status aplikasi",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardSponsorship>
      <BreadcrumbView pages={page} />
      <h1 className="text-2xl text-neutral-950 font-bold">Detail Beasiswa</h1>
      <div className="border border-neutral-200 rounded-md mt-2 p-3 space-y-2">
        {detail.map((val, idx) => {
          return (
            <div key={idx}>
              <Label>{val.label}</Label>
              <p className="text-neutral-600 text-sm">
                {val.label === "Deadline Beasiswa:"
                  ? FormatDate(new Date(val.value))
                  : val.value}
              </p>
            </div>
          );
        })}
        <div>
          <Label>Dokumen yang Harus Diupload</Label>
          <p className="text-neutral-600 text-sm">
            {detailScholar?.document_upload?.join(", ")}
          </p>
        </div>
        <div>
          <Label>Banner Beasiswa</Label>
          <img
            src={detailScholar?.banner_image}
            className="h-20 w-auto rounded-sm"
            alt="alt"
          />
        </div>
      </div>
      <h1 className="text-2xl text-neutral-950 font-bold mt-5">
        Aplikasi Masuk
      </h1>
      <div className="mt-2">
        <DataTable columns={columns} data={detailScholar?.applicants || []} />
      </div>
      <Modal open={isOpen} title={"Proses Aplikasi?"}>
        <div>
          <p className="text-neutral-700 text-base">
            Yakin ubah proses aplikasi ini?
          </p>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => setIsOpen(false)}
            >
              Batalkan
            </Button>
            <Button size={"sm"} onClick={handleProcess} disabled={loading}>
              Proses Aplikasi
            </Button>
          </div>
        </div>
      </Modal>
      <Modal open={isOpenReject} title={"Tolak Aplikasi?"}>
        <div>
          <p className="text-neutral-700 text-base">
            Yakin aplikasi ini akan ditolak?
          </p>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => setIsOpenReject(false)}
            >
              Batalkan
            </Button>
            <Button
              size={"sm"}
              variant={"destructive"}
              onClick={handleReject}
              disabled={loading}
            >
              Tolak Aplikasi
            </Button>
          </div>
        </div>
      </Modal>
      <Modal open={isOpenAccept} title={"Terima Aplikasi?"}>
        <div>
          <p className="text-neutral-700 text-base">
            Yakin terima aplikasi ini?
          </p>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => setIsOpenAccept(false)}
            >
              Batalkan
            </Button>
            <Button size={"sm"} onClick={handleAccept} disabled={loading}>
              Terima Aplikasi
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardSponsorship>
  );
};

export default ScholarshipDetailDashboard;
