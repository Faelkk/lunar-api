import * as http from "http";

export function handlePreflightRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return true;
  }
}
