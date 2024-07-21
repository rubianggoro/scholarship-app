import { useState } from "react";
import { Input } from "./input";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../../lib/ConfigFirebase";
import { v4 } from "uuid";
import { useToast } from "./use-toast";
import { cn } from "../../lib/utils";

type FileUploadType = {
  result: (val: string) => any;
  errorMessage?: string;
  disabled?: boolean;
};

const FileUpload = ({
  result,
  errorMessage,
  disabled = false,
}: FileUploadType) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = async (e: any) => {
    setIsLoading(true);
    if (e.target.files) {
      const file = e.target?.files[0];
      const maxSizeInKB = 200;
      const maxSizeInBytes = maxSizeInKB * 1024;
      if (file?.size < maxSizeInBytes) {
        const imgRef = ref(imageDb, `files/${v4()}`);
        const res = await uploadBytes(imgRef, e.target.files[0]);
        const url = await getDownloadURL(res.ref);
        result(url);
        if (res) {
          setIsLoading(false);
        }
      } else {
        toast({
          title: "Maksimum size file: 200KB",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative">
      <Input
        id="picture"
        type="file"
        disabled={isLoading || disabled}
        onChange={handleChange}
        className={cn(errorMessage ? "border-2 border-destructive" : "")}
      />
      {isLoading ? (
        <div className="absolute right-3 top-3">
          <div className="w-3 h-3 border-8 text-blue-400 text-sm animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              className="animate-ping"
            >
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
