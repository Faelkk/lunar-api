import CustomError from "../../../shared/utils/customError";

export interface UserNameEditDtoProps {
  userNameDto: string;
}

export const UserNameEditDto = ({ userNameDto }: UserNameEditDtoProps) => {
  if (!userNameDto) {
    throw new CustomError("Username is required", 400);
  }

  return { username: userNameDto };
};
