import { ActiveUserId } from "../../shared/helpers/activeUserId";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../shared/types/httpType";
import { DeleteMessageDtoProps } from "./dto/DeleteMessageDto";
import { MessagesDTOprops } from "./dto/MessagesDto";
import { sendMessageProps } from "./dto/SendMessagesDto";
import { UpdateMessageDtoProps } from "./dto/UpdateMessagesDto";

import { messagesServices } from "./messagesServices";

export const messagesController = {
  async getMessages(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId } = req.body as MessagesDTOprops;
    try {
      const messages = await messagesServices.getMessages({
        userId,
        contactId,
      });

      return res.send!(200, messages);
    } catch (err: any) {
      return res.send!(
        err.statusCode,
        `Error: ${err.statusCode} ${err.message}`
      );
    }
  },

  async sendMessage(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId, contentType, content } = req.body as sendMessageProps;

    const sentAt = new Date();
    try {
      const messages = await messagesServices.sendMessages({
        userId,
        contactId,
        contentType,
        content,
        sentAt,
      });

      return res.send!(200, messages);
    } catch (err: any) {
      return res.send!(
        err.statusCode,
        `Error: ${err.statusCode} ${err.message}`
      );
    }
  },

  async deleteMessage(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId, messageId } = req.body as DeleteMessageDtoProps;
    try {
      const deletedMessage = await messagesServices.deleteMessages({
        userId,
        contactId,
        messageId,
      });

      return res.send!(200, deletedMessage);
    } catch (err: any) {
      return res.send!(
        err.statusCode,
        `Error: ${err.statusCode} ${err.message}`
      );
    }
  },
  async updateMessage(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId, messageId, content, contentType } =
      req.body as UpdateMessageDtoProps;
    const sentAt = new Date();

    try {
      const updatedMessage = await messagesServices.updateMessages({
        userId,
        contactId,
        messageId,
        content,
        contentType,
        sentAt,
      });

      return res.send!(200, updatedMessage);
    } catch (err: any) {
      return res.send!(
        err.statusCode,
        `Error: ${err.statusCode} ${err.message}`
      );
    }
  },
};
