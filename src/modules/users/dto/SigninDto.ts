import CustomError from "../../../shared/utils/customError";

export interface SigninDTOprops {
  email: string;
  password: string;
}

export const SigninDTO = ({ email, password }: SigninDTOprops) => {
  if (!email || !password) {
    throw new CustomError("Email and password are required", 400);
  }

  return { email, password };
};
