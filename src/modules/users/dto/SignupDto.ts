import CustomError from "../../../shared/utils/customError";

interface SignupDTOprops {
  email: string;
  name: string;
  password: string;
  username: string;
  icon: string | undefined;
}

export const SignupnDTO = ({
  name,
  email,
  username,
  password,
  icon,
}: SignupDTOprops) => {
  if (!email || !name || !password || !username) {
    throw new CustomError(
      "Name,email and userName and password are required",
      400
    );
  }

  return { email, name, password, username, icon };
};
