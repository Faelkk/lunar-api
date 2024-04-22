import CustomError from "../../../shared/utils/customError";

export interface UserEditDto {
  usernameDto: string;
  emailDto: string;
  nameDto: string;
  iconDto: string | undefined;
}

export interface UserEdit {
  username: string;
  email: string;
  name: string;
  icon: string | undefined;
}

export const UserEdit = ({
  usernameDto,
  emailDto,
  nameDto,
  iconDto,
}: UserEditDto) => {
  const validatedDto = {
    username: "",
    name: "",
    email: "",
    icon: "",
  };

  if (usernameDto) {
    if (typeof usernameDto === "string") {
      if (/\s/.test(usernameDto)) {
        throw new CustomError(
          "Username não pode conter espaços em branco",
          400
        );
      }

      validatedDto.username = usernameDto;
    } else {
      throw new CustomError("Username tem que ser uma string", 400);
    }
  }

  if (emailDto) {
    if (typeof emailDto === "string") {
      if (/\s/.test(emailDto)) {
        throw new CustomError("Email não pode conter espaços em branco", 400);
      }

      validatedDto.email = emailDto;
    } else {
      throw new CustomError("Email tem que ser uma string", 400);
    }
  }

  if (nameDto) {
    if (typeof nameDto === "string") {
      if (/\s/.test(nameDto)) {
        throw new CustomError("Nome não pode conter espaços em branco", 400);
      }

      validatedDto.name = nameDto;
    } else {
      throw new CustomError("Nome tem que ser uma string", 400);
    }
  }

  if (iconDto) {
    validatedDto.icon = iconDto;
  }

  return validatedDto;
};
