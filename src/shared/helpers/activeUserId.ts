import sql from "../../connect/connection";
import { usersRepository } from "../database/repositories/users.repository";
import { CustomIncomingMessage } from "../types/httpType";

export const ActiveUserId = async (req: CustomIncomingMessage) => {
  const userId = req.userId;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userExists = await sql`SELECT * FROM users WHERE id = ${userId}`;

  if (!userExists) {
    throw new Error("User not found");
  }

  return { userId };
};
