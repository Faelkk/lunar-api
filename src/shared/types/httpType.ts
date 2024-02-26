import * as http from "http";

export interface CustomServerResponse extends http.ServerResponse {
  send?: (statusCode: number, body?: unknown) => void;
}

export interface CustomIncomingMessage extends http.IncomingMessage {
  method?: string;
  params?: { id?: string };
  body?: unknown;
  file?: any;
  files?: any;
  fileUrl?: string;
  userId?: string;
}
