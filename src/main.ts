import * as http from "http";
import * as url from "url";

import { routes } from "./routes/routes";
import { handleRoutes } from "./handlers/handleRoutes";
import { activeCors } from "./shared/helpers/activeCors";
import { handlePreflightRequest } from "./handlers/handlePreflightRequest";
import { CustomServerResponse } from "./shared/types/httpType";
import { authMiddleware } from "./shared/middlewares/authMiddleware";
import { Server } from "socket.io";

const server = http.createServer(
  async (req: http.IncomingMessage, res: CustomServerResponse) => {
    try {
      activeCors(res);
      handlePreflightRequest(req, res);

      const requestUrl = req.url;
      if (requestUrl === undefined) throw new Error();

      const parsedUrl = new url.URL(requestUrl, `http://${req.headers.host}`);

      let pathname = parsedUrl.pathname || "";

      const splitEndPoint = pathname.split("/").filter(Boolean);
      if (splitEndPoint.length > 1) {
        pathname = `/${splitEndPoint[0]}/:id`;
      }

      const route = routes.find((routeOBJ) => {
        return routeOBJ.endpoint === pathname && routeOBJ.method === req.method;
      });

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
