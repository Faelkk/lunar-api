import CustomError from "../../../shared/utils/customError";
import { isUUID } from "../../../shared/utils/isUUID";

export interface UserEditIconDtoProps {
  iconDto: string;
  idDto: string;
}

export const UserEditIconDto = ({ iconDto, idDto }: UserEditIconDtoProps) => {
  if (!iconDto && idDto) {
    throw new CustomError("Icon and Id are required", 400);
  }

  if (!isUUID(idDto)) {
    throw new CustomError("userId must be a valid UUID", 400);
  }

  return { icon: iconDto, id: idDto };
};
