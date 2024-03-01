import sql from "../../../connect/connection";
import {
  SigninResponse,
  SignupDtoData,
  SignupResponse,
  ApiKeyDto,
  ApiKeyResponse,
  UserResponse,
} from "../../types/UsersType";

export const usersRepository = {
  async findUnique(email: string) {
    const result: SigninResponse[] =
      await sql`SELECT * FROM users WHERE email = ${email}`;

    return result[0];
  },

  async findUserName(userName: string) {
    const result: SigninResponse[] =
      await sql`SELECT * FROM users WHERE username = ${userName}`;

    return result[0];
  },

  async create(signupDtoData: SignupDtoData) {
    const { name, email, username, password, icon } = signupDtoData;

    const result: SignupResponse[] = await sql`
      INSERT INTO users(email, name, password, username, icon)  
      VALUES (${email}, ${name}, ${password}, ${username}, ${icon} )
      RETURNING id, email, password, username, icon`;

    return result[0];
  },

  async createApiKey(apiKeyDto: ApiKeyDto) {
    const { apiKey, userId } = apiKeyDto;

    const apiKeyResult: ApiKeyResponse[] = await sql`
      INSERT INTO api_keys (api_key, user_id) VALUES (${apiKey}, ${userId}) RETURNING *
    `;

    return apiKeyResult[0];
  },

  async findApiKey(userId: string) {
    const apiKey: ApiKeyResponse[] =
      await sql`SELECT * FROM api_keys WHERE user_id = ${userId}`;

    return apiKey[0];
  },

  async findUser(userId: string) {
    const result: UserResponse[] =
      await sql`SELECT * FROM users WHERE id = ${userId}`;

    return result[0];
  },
  async editIconUser(userId: string, icon: string) {
    const result =
      await sql`UPDATE users SET icon = ${icon} WHERE id = ${userId} RETURNING *`;
    return result[0];
  },

  async editUserName(userId: string, username: string) {
    const result =
      await sql`UPDATE users SET username = ${username} WHERE id = ${userId} RETURNING username`;
    return result[0];
  },
};
