import * as http from "http";
import { bodyParserMiddleware } from "../shared/middlewares/body/bodyParserMiddleware";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../shared/types/httpType";
import { sendJsonResponse } from "../shared/helpers/sendJsonResponse";

import { uploadMiddleware } from "../shared/middlewares/upload/uploadMiddleware";
import CustomError from "../shared/utils/customError";
import { routeUploadConfig } from "../shared/middlewares/upload/uploadConfig";

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

  const routeConfig = routeUploadConfig[route.endpoint];

  if (["POST", "PUT", "PATCH"].includes(req.method!)) {
    if (
      req.headers["content-type"] &&
      req.headers["content-type"].startsWith("multipart/form-data")
    ) {
      if (!routeConfig) throw new CustomError("Internal server error", 500);

      const uploadHandler = uploadMiddleware(routeConfig);

      uploadHandler({ req, res, next: () => route.handlers(req, res) });

      return;
    }
  }

  bodyParserMiddleware({ req, res, next: () => route.handlers(req, res) });
}
