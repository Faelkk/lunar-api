import { ActiveUserId } from "../../shared/helpers/activeUserId";
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
      await contactsService.getContacts(userId);
    } catch (err: any) {
      return res.send!(
        err.statusCode,
        `Error: ${err.statusCode} ${err.message}`
      );
    }
  },
  async getOneContact(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId } = req.body as ContactDtoController;
    try {
      await contactsService.getOneContact({ userId, contactIdDto: contactId });
    } catch (err: any) {
      return res.send!(
        err.statusCode,
        `Error: ${err.statusCode} ${err.message}`
      );
    }
  },
  async addContacts(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId } = req.body as ContactDtoController;
    try {
      await contactsService.addContacts({ userId, contactIdDto: contactId });
    } catch (err: any) {
      return res.send!(
        err.statusCode,
        `Error: ${err.statusCode} ${err.message}`
      );
    }
  },
  async deleteContact(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId } = req.body as ContactDtoController;
    try {
      await contactsService.deleteContact({ userId, contactIdDto: contactId });
    } catch (err: any) {
      return res.send!(
        err.statusCode,
        `Error: ${err.statusCode} ${err.message}`
      );
    }
  },
};
