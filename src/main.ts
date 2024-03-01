import * as http from "http";
import * as url from "url";

import { routes } from "./routes/routes";
import { handleRoutes } from "./handlers/handleRoutes";
import { activeCors } from "./shared/helpers/activeCors";
import { handlePreflightRequest } from "./handlers/handlePreflightRequest";
import { CustomServerResponse } from "./shared/types/httpType";
import { authMiddleware } from "./shared/middlewares/auth/authMiddleware";
import { Server } from "socket.io";
import { isUUID } from "./shared/utils/isUUID";
import { handleRequest } from "./handlers/handleRequest";

const server = http.createServer(
  async (req: http.IncomingMessage, res: CustomServerResponse) => {
    try {
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

export const io = new Server(server);

server.listen(3000, () => {
  console.log("server is open");
});
