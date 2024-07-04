import { GraphQLUpload } from "graphql-upload";
// Ignore the import errors
// @ts-ignore
import { FileUpload } from "@types/graphql-upload/Upload.js";
import { FileTypes } from "../TypeDefs/FileTypes"; // Pastikan path-nya sesuai dengan struktur proyek Anda
import path from "path";
import fs from "fs";

export const UPLOAD_FILE = {
  type: FileTypes, // Pastikan tipe FileTypes sudah didefinisikan dengan benar
  args: {
    file: { type: GraphQLUpload }, // Gunakan GraphQLUpload untuk menangani file upload
  },
  async resolve(parent: any, args: any) {
    const { createReadStream, filename, mimetype, encoding } = await args.file;

    // Menentukan di mana file akan disimpan
    const pathName = path.join(__dirname, `/public/images/${filename}`);

    // Menggunakan stream untuk menulis file yang diunggah
    const stream = createReadStream();
    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(fs.createWriteStream(pathName))
        .on("finish", () => resolve())
        .on("error", (error: any) => reject(error));
    });

    // Mengembalikan URL publik file yang diunggah
    const publicUrl = `${process.env.BASE_URL_API}/images/${filename}`;
    return { success: true, url: publicUrl };
  },
};
