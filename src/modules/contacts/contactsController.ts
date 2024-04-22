import { io } from "../../main";
import { ActiveUserId } from "../../shared/helpers/activeUserId";
import { sendErrorResponse } from "../../shared/helpers/responseError";
import { InviteDtoController } from "../../shared/types/ContactTypes";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../shared/types/httpType";
import { contactsService } from "./contactsService";
import { ContactDtoController } from "./dto/ContactDto";

export const contactsController = {
  async getContacts(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    try {
      const contacts = await contactsService.getContacts(userId);

      return res.send!(200, contacts);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  async getOneContact(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId } = req.body as ContactDtoController;
    try {
      await contactsService.getOneContact({ userId, contactIdDto: contactId });
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  async addContacts(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { username } = req.body as InviteDtoController;

    try {
      const inviteId = await contactsService.addContacts({
        userId,
        userName: username,
      });

      io.emit("invite@new", inviteId);

      return res.send!(200, inviteId);
    } catch (err: any) {
      console.log(err);

      return sendErrorResponse(res, err);
    }
  },
  async deleteContact(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { id } = req.params as { id: string };
    try {
      const { contactId, deleted } = await contactsService.deleteContact({
        userId,
        contactIdDto: id,
      });

      io.emit("connection@delete", { contactId, deleted });

      return res.send!(200, deleted);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
};
