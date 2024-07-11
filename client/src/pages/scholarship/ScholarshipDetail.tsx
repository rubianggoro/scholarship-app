import { useState } from "react";
import { imageDb } from "../../lib/ConfigFirebase";
import { Button } from "../../components/ui/button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

const ScholarshipDetail = () => {
  const [img, setImg] = useState<any>("");

  const handleUploadFile = async () => {
    const imgRef = ref(imageDb, `files/${v4()}`);
    const result = await uploadBytes(imgRef, img);
    const url = await getDownloadURL(result.ref);
    console.log("url =>", url);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          type="file"
          onChange={(e) => {
            if (e.target.files) setImg(e.target.files[0]);
          }}
        />
        <Button onClick={() => handleUploadFile()}>Upload</Button>
      </div>
    </div>
  );
};

export default ScholarshipDetail;
