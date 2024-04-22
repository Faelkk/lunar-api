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
import { audioMiddleware } from "../shared/middlewares/audio/audioMiddleware";

interface handleRoutesProps {
  req: CustomIncomingMessage;
  res: CustomServerResponse;
  route: Routes;
}

interface Routes {
  endpoint: string;
  method: string;
  handlers: (req: http.IncomingMessage, res: http.ServerResponse) => void;
  middleware?: string[];
}

export async function handleRoutes({ req, res, route }: handleRoutesProps) {
  req.params = { id: req.url?.split("/").filter(Boolean)[1] || undefined };
  res.send = (statusCode: number, body?: unknown) =>
    sendJsonResponse({ res, statusCode, body });

  if (route.middleware && route.middleware.length > 0) {
    if (route.middleware.includes("uploadMiddleware")) {
      const routeConfig = routeUploadConfig[route.endpoint];

      if (!routeConfig) {
        throw new CustomError("Internal server error", 500);
      }

      const uploadHandler = uploadMiddleware(routeConfig);

      uploadHandler({
        req,
        res,
        next: () => route.handlers(req, res),
      });
    } else {
      const audioHandler = audioMiddleware();

      (await audioHandler)({ req, res, next: () => route.handlers(req, res) });
    }
  } else {
    bodyParserMiddleware({ req, res, next: () => route.handlers(req, res) });
  }
}
