import { AudioMiddlewareProps, audioHandler } from "./audioHandler";

export const audioMiddleware = async () => {
  return async ({ req, res, next }: AudioMiddlewareProps) => {
    await audioHandler({ req, res, next });
  };
};
