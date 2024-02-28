import { io } from "../../main";
import { ActiveUserId } from "../../shared/helpers/activeUserId";
import { sendErrorResponse } from "../../shared/helpers/responseError";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../shared/types/httpType";
import { DeleteMessageControllerDto } from "./dto/DeleteMessageDto";
import { MessagesControllerDto } from "./dto/MessagesDto";
import { sendMessageControllerDto } from "./dto/SendMessagesDto";
import { UpdateMessageControllerDto } from "./dto/UpdateMessagesDto";

import { messagesServices } from "./messagesServices";

export const messagesController = {
  async getMessages(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId } = req.body as MessagesControllerDto;
    try {
      const messages = await messagesServices.getMessages({
        userId,
        contactIdDto: contactId,
      });

      io.emit("messages@new", messages);

      return res.send!(200, messages);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },

  async sendMessage(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId, contentType, content } =
      req.body as sendMessageControllerDto;

    const sentAt = new Date();
    try {
      const messages = await messagesServices.sendMessages({
        userId,
        contactIdDto: contactId,
        contentTypeDto: contentType,
        contentDto: content,
        sentAt,
      });

      io.emit("messages@new", messages);

      return res.send!(200, messages);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },

  async deleteMessage(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId, messageId } = req.body as DeleteMessageControllerDto;
    try {
      const deletedMessage = await messagesServices.deleteMessages({
        userId,
        contactIdDto: contactId,
        messageIdDto: messageId,
      });

      return res.send!(200, deletedMessage);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  async deleteAllMessagesContact(
    req: CustomIncomingMessage,
    res: CustomServerResponse
  ) {
    const { userId } = await ActiveUserId(req);
    const { contactId } = req.body as DeleteMessageControllerDto;
    try {
      const deletedMessage = await messagesServices.deleteAllMessages({
        userId,
        contactIdDto: contactId,
      });

      return res.send!(200, deletedMessage);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },

  async updateMessage(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId, messageId, content, contentType } =
      req.body as UpdateMessageControllerDto;
    const sentAt = new Date();

    try {
      const updatedMessage = await messagesServices.updateMessages({
        userId,
        contactIdDto: contactId,
        messageIdDto: messageId,
        contentDto: content,
        contentTypeDto: contentType,
        sentAt,
      });

      return res.send!(200, updatedMessage);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
};
