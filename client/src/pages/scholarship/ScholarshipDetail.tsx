import { gql, useMutation } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: File!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const ScholarshipDetail = () => {
  const [uploadFile, { error }] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("data", data),
  });
  console.log("ini Error =>>", error);
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    uploadFile({ variables: { file } });
  };
  return (
    <div>
      <h1>Upload file</h1>
      <input type="file" id="file" name="file" onChange={handleFileChange} />
    </div>
  );
};

export default ScholarshipDetail;
