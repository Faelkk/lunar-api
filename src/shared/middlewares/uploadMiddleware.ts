import multer from "multer";
import supabase from "../../connect/supabase";

import env from "../config/config";
import { CustomIncomingMessage, CustomServerResponse } from "../types/httpType";
import CustomError from "../utils/customError";

const storage = multer.memoryStorage();
const upload = multer({ storage });

interface UploadMiddlewareProps {
  req: CustomIncomingMessage;
  res: CustomServerResponse;
  next: () => void;
}

interface HandleUploadProps {
  storageName: string;
  file: any;
}

export const uploadMiddleware =
  (fieldName: string, storageName: string) =>
  ({ req, res, next }: UploadMiddlewareProps) => {
    upload.single(fieldName)(req as any, res as any, async (err: any) => {
      if (err) throw new CustomError("Erro no upload do vídeo", 400);

      const file = req.file;

      if (!file)
        throw new CustomError(
          "Não conseguimos achar nenhum arquivo anexado",
          400
        );

      try {
        const fileUrl = await handleUpload({ file, storageName });

        req.fileUrl = fileUrl;

        next();
      } catch (err: any) {
        res.send!(err.statusCode, err.message);
      }
    });
  };

async function handleUpload({ storageName, file }: HandleUploadProps) {
  const response = await supabase.storage
    .from(`${storageName}`)
    .upload(`${Date.now()}--${file.originalname}`, file.buffer, {
      contentType: file.mimetype,
    });

  if (response.error)
    throw new CustomError("Error uploading to Supabase Storage", 500);

  const baseUrl = `${env.supabaseUrl}/storage/v1/object/public/${storageName}`;
  const fileUrl = `${baseUrl}/${response.data.path}`;

  return fileUrl;
}
