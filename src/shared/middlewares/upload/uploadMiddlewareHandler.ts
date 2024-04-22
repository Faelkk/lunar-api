import { sendErrorResponse } from "../../helpers/responseError";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../types/httpType";
import CustomError from "../../utils/customError";
import { handleUpload } from "./handleUpload";
import { configureMulter } from "./multerConfig";

export const uploadMiddlewareHandler = async (
  req: CustomIncomingMessage,
  res: CustomServerResponse,
  next: () => void,
  fieldName: string,
  storageName: string,
  allowedTypes: string[],
  required: boolean
) => {
  const upload = await configureMulter(fieldName, allowedTypes);

  upload(req as any, res as any, async (err: any) => {
    try {
      if (err) {
        throw new CustomError("Error in file upload", 400);
      }

      const file = req.file;

      if (!required && !file) {
        next();
        return;
      }

      if (!file) {
        throw new CustomError("No file found attached to the request", 400);
      }

      const fileUrl = await handleUpload({ file, storageName });

      req.fileUrl = fileUrl;

      next();
    } catch (err) {
      return sendErrorResponse(res, err);
    }
  });
};
