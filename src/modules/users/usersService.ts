import { usersRepository } from "../../shared/database/repositories/users.repository";
import { SigninDTO } from "./dto/SigninDto";
import { SignupnDTO } from "./dto/SignupDto";
import { compare, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import env from "../../shared/config/config";
import CustomError from "../../shared/utils/customError";
import { UserEdit, UserEditDto } from "./dto/UserEdit";
import { UserNameEditDto } from "./dto/UserNameEditDto";

interface SigninProps {
  email: string;
  password: string;
}

interface SignupProps extends SigninProps {
  name: string;
  username: string;
}

interface signinResponse extends SigninProps {
  id: string;
}

interface UserEditIconProps {
  iconDto: string;
  userId: string;
  idDto: string;
}

interface UserNameEditProps {
  userNameDto: string;
  userId: string;
  idDto: string;
}

interface UserEditProps {
  nameDto: string;
  usernameDto: string;
  emailDto: string;
  iconDto: string | undefined;
  userId: string;
}

export const usersService = {
  async signin({ email, password }: SigninProps) {
    const signinDtoData = SigninDTO({ email, password });

    const user: signinResponse | null = await usersRepository.findUnique(
      signinDtoData.email
    );

    if (!user) {
      throw new CustomError("Invalid credentials", 400);
    }
    const hashedPassword = await compare(password, user.password);

    if (!hashedPassword) {
      throw new CustomError("Invalid password", 400);
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      env.jwtSecret!,
      { expiresIn: "7d" }
    );

    const apiKey = await usersRepository.findApiKey(user.id);

    return { accessToken, apiKey: apiKey };
  },
  async signup({ name, email, username, password }: SignupProps) {
    const signupDtoData = SignupnDTO({
      name,
      email,
      username,
      password,
    });

    const userAlreadyExists = await usersRepository.findUnique(
      signupDtoData.email
    );

    if (userAlreadyExists && userAlreadyExists.email) {
      throw new CustomError("User already exists", 409);
    }

    const userNameAlreadyBeingUsed = await usersRepository.findUserName(
      signupDtoData.username
    );

    if (userNameAlreadyBeingUsed && userNameAlreadyBeingUsed.username) {
      throw new CustomError("Username already being used", 409);
    }

    const newapiKey = crypto.randomBytes(16).toString("hex");

    const hashedPassword = hashSync(signupDtoData.password, 10);

    const user = await usersRepository.create({
      email: signupDtoData.email,
      name: signupDtoData.name,
      password: hashedPassword,
      username: signupDtoData.username,
      icon: null,
    });

    if (!user) {
      throw new CustomError("Internal server error", 500);
    }

    const apiKey = await usersRepository.createApiKey({
      apiKey: newapiKey,
      userId: user.id,
    });

    if (!apiKey) {
      throw new CustomError("Internal server error", 500);
    }

    const accessToken = jwt.sign(
      { userId: apiKey.user_id, email: email },
      env.jwtSecret!,
      { expiresIn: "7d" }
    );

    return { accessToken, apiKey };
  },

  // async editUserName({ userId, userNameDto, idDto }: UserNameEditProps) {
  //   const { username, id } = UserNameEditDto({ userNameDto, idDto });

  //   const usersExists = await usersRepository.findUser(userId);
  //   if (!usersExists) {
  //     throw new CustomError("User not found", 404);
  //   }

  //   if (id !== userId) {
  //     throw new CustomError("Unauthorized operation", 403);
  //   }

  //   const userNameAlreadyBeingUsed = await usersRepository.findUserName(
  //     username
  //   );

  //   if (userNameAlreadyBeingUsed && userNameAlreadyBeingUsed.username) {
  //     throw new CustomError("Username already being used", 409);
  //   }

  //   const editedUser = await usersRepository.editUserName(userId, username);

  //   if (!editedUser) {
  //     throw new CustomError("Internal server error", 404);
  //   }

  //   return editedUser;
  // },

  async getUser(userId: string) {
    if (!userId) throw new CustomError("UserId is required", 400);

    const user = await usersRepository.findUser(userId);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return user;
  },

  async editUser({
    usernameDto,
    emailDto,
    nameDto,
    iconDto,
    userId,
  }: UserEditProps) {
    const { name, email, icon, username } = await UserEdit({
      usernameDto,
      emailDto,
      nameDto,
      iconDto,
    });

    const user = await usersRepository.findUser(userId);

    if (!user) {
      throw new CustomError("User not found", 400);
    }

    if (user.email === email) {
      throw new CustomError("Email already being used", 409);
    }

    const userNameAlreadyBeingUsed = await usersRepository.findUserName(
      username
    );

    if (userNameAlreadyBeingUsed && userNameAlreadyBeingUsed.username) {
      throw new CustomError("Username already being used", 409);
    }

    const editedUser = await usersRepository.editUser({
      name,
      email,
      icon,
      username,
      id: userId,
    });

    return editedUser;
  },
};
