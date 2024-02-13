import * as http from "http";

interface newIncomingMessage extends http.IncomingMessage {
  body?: string;
}

interface bodyParserProps {
  req: newIncomingMessage;
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
