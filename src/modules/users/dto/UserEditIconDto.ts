import CustomError from "../../../shared/utils/customError";

export interface UserEditIconDtoProps {
  iconDto: string;
}

export const UserEditIconDto = ({ iconDto }: UserEditIconDtoProps) => {
  if (!iconDto) {
    throw new CustomError("Icon is required", 400);
  }

  return { icon: iconDto };
};
