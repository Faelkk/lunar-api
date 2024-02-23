import { usersService } from "./usersService";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../shared/types/httpType";
import { UserSignInData, UserSignUpData } from "../../shared/types/userType";

export const usersController = {
  async signin(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { email, password } = req.body as UserSignInData;

    try {
      const { accessToken, apiKey } = await usersService.signin({
        email,
        password,
      });

      return res.send!(200, { accessToken, apiKey });
    } catch (err: any) {
      return res.send!(
        err.statusCode,
        `Error: ${err.statusCode} ${err.message}`
      );
    }
  },

  async signup(req: CustomIncomingMessage, res: CustomServerResponse) {
    const icon = req.fileUrl;
    const { email, password, name, username } = req.body as UserSignUpData;

    try {
      const { accessToken, apiKey } = await usersService.signup({
        email,
        password,
        name,
        username,
        icon,
      });

      return res.send!(200, { accessToken, apiKey });
    } catch (err: any) {
      return res.send!(
        err.statusCode,
        `Error: ${err.statusCode} ${err.message}`
      );
    }
  },
  editUser() {},
};
