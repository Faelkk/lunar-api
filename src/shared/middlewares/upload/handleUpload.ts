import supabase from "../../../connect/supabase";
import env from "../../config/config";
import CustomError from "../../utils/customError";

interface HandleUploadProps {
  storageName: string;
  file: any;
}
export async function handleUpload({ storageName, file }: HandleUploadProps) {
  const response = await supabase.storage
    .from(`${storageName}`)
    .upload(`${Date.now()}--${file.originalname}`, file.buffer, {
      contentType: file.mimetype,
    });

  if (response.error) {
    throw new CustomError("Error uploading to Supabase Storage", 500);
  }

  const baseUrl = `${env.supabaseUrl}/storage/v1/object/public/${storageName}`;
  const fileUrl = `${baseUrl}/${response.data.path}`;

  return fileUrl;
}
