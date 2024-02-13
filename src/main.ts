import * as http from "http";
import * as url from "url";
import { routes } from "./routes/routes";
import { handleRoutes } from "./handlers/handleRoutes";

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
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

      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return true;
      }

      const requestUrl = req.url;
      if (requestUrl === undefined) throw new Error();

      const parsedUrl = new url.URL(requestUrl, `http://${req.headers.host}`);

      let pathname = parsedUrl.pathname || "";

      const splitEndPoint = pathname.split("/").filter(Boolean);
      if (splitEndPoint.length > 1) {
        pathname = `/${splitEndPoint[0]}/:id`;
      }

      const route = routes.find(
        (routeOBJ) =>
          routeOBJ.endpoint === pathname && routeOBJ.method === req.method
      );

      if (route) {
        handleRoutes({ req, res, route });
      } else {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end(`Cannot access ${req.method} ${parsedUrl.pathname}`);
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
);

server.listen(3000, () => {
  console.log("server is open");
});
