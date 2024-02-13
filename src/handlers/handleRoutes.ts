import * as http from "http";
import { sendJsonResponse } from "../shared/helpers/sendJsonResponse";
import { bodyParserMiddleware } from "../middlewares/bodyParserMiddleware";

interface CustomIncomingMessage extends http.IncomingMessage {
  params?: { id?: string };
}

interface CustomServerResponse extends http.ServerResponse {
  send?: (statusCode: number, body?: unknown) => void;
}

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

  bodyParserMiddleware({ req, res, next: () => route.handlers(req, res) });
}
