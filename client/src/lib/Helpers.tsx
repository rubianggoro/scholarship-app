import { Badge } from "../components/ui/badge";

export const ConvertStatusApplicants = (val: number) => {
  switch (val) {
    case 801:
      return <Badge variant={"warning"}>Mengajukan Aplikasi</Badge>;
    case 802:
      return <Badge>Aplikasi Diproses</Badge>;
    case 803:
      return <Badge variant={"success"}>Aplikasi Diterima</Badge>;
    case -803:
      return <Badge variant={"destructive"}>Aplikasi Ditolak</Badge>;
    default:
      break;
  }
};
