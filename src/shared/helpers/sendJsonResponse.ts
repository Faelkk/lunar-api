import * as http from "http";

interface sendJsonResponseProps {
  res: http.ServerResponse;
  statusCode: number;
  body: unknown;
}

export function sendJsonResponse({
  res,
  statusCode,
  body,
}: sendJsonResponseProps) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}
