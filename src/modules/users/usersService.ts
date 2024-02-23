import { usersRepository } from "../../shared/database/repositories/users.repository";
import { SigninDTO } from "./dto/SigninDto";
import { SignupnDTO } from "./dto/SignupDto";
import { compare, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import env from "../../shared/config/config";
import CustomError from "../../shared/utils/customError";

interface SigninProps {
  email: string;
  password: string;
}

interface SignupProps extends SigninProps {
  name: string;
  icon: string | undefined;
  username: string;
}

interface signinResponse extends SigninProps {
  id: string;
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

    if (userAlreadyExists) {
      throw new CustomError("User already exists", 409);
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
};
