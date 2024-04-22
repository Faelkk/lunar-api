import { invitesService } from "./invitesService";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../shared/types/httpType";
import { ActiveUserId } from "../../shared/helpers/activeUserId";
import { InviteDtoProps } from "./dto/inviteDto";
import { sendErrorResponse } from "../../shared/helpers/responseError";
import { io } from "../../main";

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

  async getSendInvites(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    try {
      const invites = await invitesService.getSendInvites(userId);

      return res.send!(200, invites);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },

  async acceptInvite(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { inviteId } = req.body as InviteDtoProps;
    try {
      const { createdContact, inviteExists } =
        await invitesService.acceptInvite({
          userId,
          inviteIdDto: inviteId,
        });

      io.emit("connection@new", { createdContact, inviteExists });

      return res.send!(200, createdContact);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  async rejectInvite(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { inviteId } = req.body as InviteDtoProps;
    try {
      const { deleted, inviteExists } = await invitesService.rejectInvite({
        userId,
        inviteIdDto: inviteId,
      });

      io.emit("invite@rejected", { deleted, inviteExists });

      return res.send!(200, deleted);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  async cancelInvite(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { inviteId } = req.body as InviteDtoProps;
    try {
      const { deleted, inviteExists } = await invitesService.cancelInvite({
        userId,
        inviteIdDto: inviteId,
      });

      io.emit("invite@cancel", { deleted, inviteExists });

      return res.send!(200, deleted);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
};
