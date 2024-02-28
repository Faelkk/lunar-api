import { invitesService } from "./invitesService";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../shared/types/httpType";
import { ActiveUserId } from "../../shared/helpers/activeUserId";
import { InviteDtoProps } from "./dto/inviteDto";
import { sendErrorResponse } from "../../shared/helpers/responseError";

export const invitesController = {
  async getInvites(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    try {
      const invites = await invitesService.getInvites(userId);

      return res.send!(200, invites);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  async acceptInvite(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { inviteId } = req.body as InviteDtoProps;
    try {
      const invited = await invitesService.acceptInvite({
        userId,
        inviteIdDto: inviteId,
      });

      return res.send!(200, invited);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
};
