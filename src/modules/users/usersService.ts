import { usersRepository } from "../../shared/database/repositories/users.repository";
import { SigninDTO } from "./dto/SigninDto";
import { SignupnDTO } from "./dto/SignupDto";
import { compare, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import env from "../../shared/config/config";
import CustomError from "../../shared/utils/customError";
import { UserEditIconDto } from "./dto/UserEditIconDto";
import { UserNameEditDto } from "./dto/UserNameEditDto";

interface SigninProps {
  email: string;
  password: string;
}

interface SignupProps extends SigninProps {
  name: string;
  icon: string;
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
  async signup({ name, email, icon, username, password }: SignupProps) {
    const signupDtoData = SignupnDTO({
      name,
      email,
      username,
      password,
      icon,
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
      icon: icon,
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
  async editUserIcon({ userId, iconDto, idDto }: UserEditIconProps) {
    const { icon, id } = UserEditIconDto({ iconDto, idDto });

    const usersExists = await usersRepository.findUser(userId);
    if (!usersExists) {
      throw new CustomError("User not found", 404);
    }

    if (id !== userId) {
      throw new CustomError("Unauthorized operation", 403);
    }

    const editedUser = await usersRepository.editIconUser(userId, icon);

    if (!editedUser) {
      throw new CustomError("Internal server error", 404);
    }

    return editedUser;
  },

  async editUserName({ userId, userNameDto, idDto }: UserNameEditProps) {
    const { username, id } = UserNameEditDto({ userNameDto, idDto });

    const usersExists = await usersRepository.findUser(userId);
    if (!usersExists) {
      throw new CustomError("User not found", 404);
    }

    if (id !== userId) {
      throw new CustomError("Unauthorized operation", 403);
    }

    const userNameAlreadyBeingUsed = await usersRepository.findUserName(
      username
    );

    if (userNameAlreadyBeingUsed && userNameAlreadyBeingUsed.username) {
      throw new CustomError("Username already being used", 409);
    }

    const editedUser = await usersRepository.editUserName(userId, username);

    if (!editedUser) {
      throw new CustomError("Internal server error", 404);
    }

    return editedUser;
  },
};
