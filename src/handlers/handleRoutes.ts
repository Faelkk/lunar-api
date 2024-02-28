import * as http from "http";
import { bodyParserMiddleware } from "../shared/middlewares/bodyParserMiddleware";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../shared/types/httpType";
import { sendJsonResponse } from "../shared/helpers/sendJsonResponse";
import { routeUploadConfig } from "../shared/utils/uploadConfig";
import { uploadMiddleware } from "../shared/middlewares/uploadMiddleware";
import CustomError from "../shared/utils/customError";

interface handleRoutesProps {
  req: CustomIncomingMessage;
  res: CustomServerResponse;
  route: Routes;
}

interface Routes {
  endpoint: string;
  method: string;
  handlers: (req: http.IncomingMessage, res: http.ServerResponse) => void;
}

export function handleRoutes({ req, res, route }: handleRoutesProps) {
  req.params = { id: req.url?.split("/").filter(Boolean)[1] || undefined };
  res.send = (statusCode: number, body?: unknown) =>
    sendJsonResponse({ res, statusCode, body });

  console.log(route.endpoint);

  if (["POST", "PUT", "PATCH"].includes(req.method!)) {
    if (
      req.headers["content-type"] &&
      req.headers["content-type"].startsWith("multipart/form-data")
    ) {
      const { fieldName, storageName } =
        routeUploadConfig[route.endpoint] || {};

      if (!fieldName || !storageName)
        throw new CustomError("Internal server error", 500);

      const uploadHandler = uploadMiddleware(fieldName, storageName);

      uploadHandler({ req, res, next: () => route.handlers(req, res) });

      return;
    }
  }

  bodyParserMiddleware({ req, res, next: () => route.handlers(req, res) });
}
