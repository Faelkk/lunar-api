import * as http from "http";

import { handleRoutes } from "./handlers/handleRoutes";
import { activeCors } from "./shared/helpers/activeCors";
import { handlePreflightRequest } from "./handlers/handlePreflightRequest";
import { CustomServerResponse } from "./shared/types/httpType";
import { authMiddleware } from "./shared/middlewares/auth/authMiddleware";
import { Server } from "socket.io";
import { handleRequest } from "./handlers/handleRequest";

const server = http.createServer(
  async (req: http.IncomingMessage, res: CustomServerResponse) => {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      activeCors(res);
      handlePreflightRequest(req, res);

      const { parsedUrl, route } = handleRequest(req);

      if (route) {
        authMiddleware({
          req,
          res,
          next: () => {
            handleRoutes({ req, res, route });
          },
        });
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Cannot access ${req.method} ${parsedUrl.pathname}`);
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true, // if you need to send cookies along with the request
  },
});

server.listen(5000, () => {
  console.log("server is open");
});
