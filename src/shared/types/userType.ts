// types.ts

export interface UserSignInData {
  email: string;
  password: string;
}

export interface UserSignUpData {
  email: string;
  name: string;
  icon?: any;
  password: string;
  username: string;
}
