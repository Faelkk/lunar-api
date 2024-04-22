import { CustomIncomingMessage } from "../types/httpType";

interface bodyParserProps {
  req: CustomIncomingMessage;
  next: (error?: unknown) => void;
}

export function bodyParser({ req, next }: bodyParserProps) {
  let body = "";

  req.on("data", (chunk: Buffer) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      if (body) {
        body = JSON.parse(body);
      }

      req.body = body;

      next();
    } catch (error) {
      next(error);
    }
  });
}
