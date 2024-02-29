import CustomError from "../../../shared/utils/customError";
import { isUUID } from "../../../shared/utils/isUUID";

export interface UserNameEditDtoProps {
  userNameDto: string;
  idDto: string;
}

export const UserNameEditDto = ({
  userNameDto,
  idDto,
}: UserNameEditDtoProps) => {
  if (!userNameDto || !idDto) {
    throw new CustomError("Username and id are required", 400);
  }

  if (!isUUID(idDto)) {
    throw new CustomError("userId must be a valid UUID", 400);
  }

  return { username: userNameDto, id: idDto };
};
