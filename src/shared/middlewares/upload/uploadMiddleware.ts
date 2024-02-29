import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../types/httpType";
import { uploadMiddlewareHandler } from "./uploadMiddlewareHandler";

interface UploadMiddlewareProps {
  req: CustomIncomingMessage;
  res: CustomServerResponse;
  next: () => void;
}

export const uploadMiddleware = (config: {
  fieldName: string;
  storageName: string;
  allowedTypes: string[];
}) => {
  return async ({ req, res, next }: UploadMiddlewareProps) => {
    const { fieldName, storageName, allowedTypes } = config;
    await uploadMiddlewareHandler(
      req,
      res,
      next,
      fieldName,
      storageName,
      allowedTypes
    );
  };
};
