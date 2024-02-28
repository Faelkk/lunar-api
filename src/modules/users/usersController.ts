import { usersService } from "./usersService";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../shared/types/httpType";
import { SigninDTOprops } from "./dto/SigninDto";
import { SignupDTOprops } from "./dto/SignupDto";
import { sendErrorResponse } from "../../shared/helpers/responseError";

export const usersController = {
  async signin(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { email, password } = req.body as SigninDTOprops;

    try {
      const { accessToken, apiKey } = await usersService.signin({
        email,
        password,
      });

      return res.send!(200, { accessToken, apiKey });
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },

  async signup(req: CustomIncomingMessage, res: CustomServerResponse) {
    const icon = req.fileUrl as string;
    const { email, password, name, username } = req.body as SignupDTOprops;

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
      return sendErrorResponse(res, err);
    }
  },
  editUser() {},
};
