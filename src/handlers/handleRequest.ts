import * as url from "url";

import * as http from "http";
import { isUUID } from "../shared/utils/isUUID";
import { routes } from "../routes/routes";

interface ParsedRequest {
  parsedUrl: url.URL;
  route: Routes | undefined;
}

type Routes = {
  method: string;
  endpoint: string;
  handlers: (req: http.IncomingMessage, res: http.ServerResponse) => void;
  middleware?: string[];
};

export function handleRequest(req: http.IncomingMessage): ParsedRequest {
  const requestUrl = req.url;
  if (requestUrl === undefined) throw new Error();

  const parsedUrl = new url.URL(requestUrl, `http://${req.headers.host}`);

  let pathname = parsedUrl.pathname || "";

  const splitEndPoint = pathname.split("/").filter(Boolean);

  const isDynamicRoute = splitEndPoint.some((segment) => {
    return isUUID(segment);
  });

  const route = routes.find((routeOBJ) => {
    if (isDynamicRoute) {
      return (
        routeOBJ.method === req.method &&
        new RegExp(`^${routeOBJ.endpoint.replace(/:\w+/g, "([^/]+)")}$`).test(
          pathname
        )
      );
    } else {
      return routeOBJ.endpoint === pathname && routeOBJ.method === req.method;
    }
  });

  return { parsedUrl, route };
}
