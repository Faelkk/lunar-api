interface BaseUser {
  email: string;
  password: string;
}

export interface SigninResponse extends BaseUser {
  id: string;
  apiKey: string;
  username: string;
}

export interface SignupDtoData extends BaseUser {
  name: string;
  username: string;
  icon: string;
}

export interface SignupResponse extends SignupDtoData {
  id: string;
}

export interface ApiKeyDto {
  apiKey: string;
  userId: string;
}

export interface ApiKeyResponse {
  createdAt: Date;
  user_id: string;
  api_key: string;
}

export interface UserResponse {
  userName: string;
  icon: string;
  id: string;
}
