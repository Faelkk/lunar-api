import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import sql from "../../connect/connection";
import env from "../config/config";

interface AuthMiddlewareParams {
  req: CustomIncomingMessage;
  res: ServerResponse;
  next: () => void;
}

interface CustomIncomingMessage extends IncomingMessage {
  userId?: string;
}

export async function authMiddleware({ req, res, next }: AuthMiddlewareParams) {
  const publicRoutes = ["/signin", "/signup"];

  if (publicRoutes.includes(req.url!)) {
    next();
  } else {
    try {
      await verifyJWTTokenFromRequest(req);

      if (isWriteMethod(req.method!)) {
        const isApiKeyValid = await getAndValidateApiKey(req);
        if (isApiKeyValid) {
          next();
        } else {
          throw new Error("Unauthorized");
        }
      } else {
        next();
      }
    } catch (err: any) {
      handleAuthError(res, err);
    }
  }
}

async function verifyJWTTokenFromRequest(req: CustomIncomingMessage) {
  const token = await getTokenFromRequest(req);

  if (token) {
    await verifyJWTToken(req, token);
  }
}

function getTokenFromRequest(req: CustomIncomingMessage) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  return token || null;
}

async function verifyJWTToken(req: CustomIncomingMessage, token: string) {
  try {
    const decoded = (await jwt.verify(token, env.jwtSecret!)) as {
      userId: string;
    };
    req.userId = decoded.userId;
  } catch (err) {
    throw new Error("Token verification failed");
  }
}

async function getAndValidateApiKey(req: CustomIncomingMessage) {
  const apiKey = getApiKey(req);

  if (apiKey) {
    return await validateApiKey(apiKey, req);
  } else {
    return false;
  }
}

function getApiKey(req: CustomIncomingMessage): string | null {
  return req.headers ? String(req.headers.apiKey) : null;
}

async function validateApiKey(apiKey: string, req: CustomIncomingMessage) {
  try {
    const result = await sql` 
      SELECT id FROM api_keys
      WHERE key_value = ${apiKey} AND user_id = ${req.userId!}
    `;

    return result.length > 0;
  } catch (error) {
    throw new Error("API key validation failed");
  }
}

function isWriteMethod(method: string) {
  return ["PUT", "DELETE", "POST"].includes(method);
}

function handleAuthError(res: ServerResponse, err: Error) {
  res.writeHead(401, { "Content-type": "application/json" });
  res.end(JSON.stringify({ error: err.message }));
}
