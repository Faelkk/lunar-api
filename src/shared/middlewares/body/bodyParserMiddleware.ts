import { bodyParser } from "../../helpers/bodyParser";
import * as http from "http";

interface BodyParserMiddleware {
  req: http.IncomingMessage;
  next: () => void;
  res: http.ServerResponse;
}

export const bodyParserMiddleware = ({
  req,
  res,
  next,
}: BodyParserMiddleware) => {
  bodyParser({ req, next });
};
