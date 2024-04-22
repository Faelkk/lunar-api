import { usersService } from "./usersService";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../shared/types/httpType";
import { SigninDTOprops } from "./dto/SigninDto";
import { SignupDTOprops } from "./dto/SignupDto";
import { sendErrorResponse } from "../../shared/helpers/responseError";
import { ActiveUserId } from "../../shared/helpers/activeUserId";
import { UserEdit } from "./dto/UserEdit";

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
    const { email, password, name, username } = req.body as SignupDTOprops;

    try {
      const { accessToken, apiKey } = await usersService.signup({
        email,
        password,
        name,
        username,
      });

      return res.send!(200, { accessToken, apiKey });
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  // async editUserName(req: CustomIncomingMessage, res: CustomServerResponse) {
  //   const { userName } = req.body as { userName: string };

  //   const { userId } = await ActiveUserId(req);
  //   const { id } = req.params as { id: string };

  //   try {
  //     const editedUserName = await usersService.editUserName({
  //       userId,
  //       userNameDto: userName,
  //       idDto: id,
  //     });

  //     return res.send!(200, editedUserName);
  //   } catch (err: any) {
  //     return sendErrorResponse(res, err);
  //   }
  // },
  // async editUserIcon(req: CustomIncomingMessage, res: CustomServerResponse) {
  //   const icon = req.fileUrl as string;
  //   const { userId } = await ActiveUserId(req);
  //   const { id } = req.params as { id: string };

  //   try {
  //     const editedUserIcon = await usersService.editUserIcon({
  //       userId,
  //       iconDto: icon,
  //       idDto: id,
  //     });

  //     return res.send!(200, editedUserIcon);
  //   } catch (err: any) {
  //     return sendErrorResponse(res, err);
  //   }
  // },
  async getUser(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);

    try {
      const user = await usersService.getUser(userId);
      return res.send!(200, user);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  async getUserById(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { id } = req.params as { id: string };

    try {
      const user = await usersService.getUser(id);

      return res.send!(200, user);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  async editUser(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { username, email, name } = req.body as UserEdit;

    const icon = req.fileUrl;

    const { userId } = await ActiveUserId(req);

    try {
      const editedUser = await usersService.editUser({
        usernameDto: username,
        emailDto: email,
        nameDto: name,
        iconDto: icon,
        userId,
      });

      return res.send!(200, editedUser);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
};
