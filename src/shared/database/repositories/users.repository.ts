import sql from "../../../connect/connection";

interface signinResponse {
  id: string;
  email: string;
  password: string;
  apiKey: string;
}

interface SignupDtoData {
  name: string;
  email: string;
  password: string;
  username: string;
  icon?: string;
}

interface SignupResponse {
  name: string;
  email: string;
  password: string;
  username: string;
  icon: string | null;
  id: string;
}

interface ApiKeyDto {
  apiKey: string;
  userId: string;
}

interface ApiKeyResponse {
  user_id: string;
  id: string;
  api_key: string;
  createdAt: Date;
}

interface userResponse {
  userName: string;
  icon: string;
  id: string;
}

export const usersRepository = {
  async findUnique(email: string) {
    const result: signinResponse[] =
      await sql`SELECT email FROM users WHERE email = ${email}`;

    return result[0];
  },

  async create(signupDtoData: SignupDtoData) {
    const { name, email, username, password, icon } = signupDtoData;

    const result: SignupResponse[] = await sql`
      INSERT INTO users(email, name, password, username, icon)  
      VALUES (${email}, ${name}, ${password}, ${username}, ${icon || null} )
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
    const result: userResponse[] =
      await sql`SELECT id,username,icon FROM users WHERE id = ${userId}`;

    return result[0];
  },
};
