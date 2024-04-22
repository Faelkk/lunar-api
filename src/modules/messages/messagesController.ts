import { io } from "../../main";
import { ActiveUserId } from "../../shared/helpers/activeUserId";
import { sendErrorResponse } from "../../shared/helpers/responseError";
import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../shared/types/httpType";
import { DeleteMessageControllerDto } from "./dto/DeleteMessageDto";
import { sendMessageControllerDto } from "./dto/SendMessagesDto";
import { UpdateMessageControllerDto } from "./dto/UpdateMessagesDto";
import { messagesServices } from "./messagesServices";

export const messagesController = {
  async getMessages(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { id } = req.params as { id: string };

    try {
      const messages = await messagesServices.getMessages({
        userId,
        contactIdDto: id,
      });

      return res.send!(200, messages);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },

  async getOneMessageById(
    req: CustomIncomingMessage,
    res: CustomServerResponse
  ) {
    const { userId } = await ActiveUserId(req);
    const { id } = req.params as { id: string };

    try {
      const messages = await messagesServices.getOneMessage({
        userId,
        contactIdDto: id,
      });

      return res.send!(200, messages);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },

  async sendMessage(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { contactId, contentType, content } =
      req.body as sendMessageControllerDto;

    try {
      const messages = await messagesServices.sendMessages({
        userId,
        contactIdDto: contactId,
        contentTypeDto: contentType,
        contentDto: content,
      });

      io.emit("messages@new", messages);

      return res.send!(200, messages);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },

  async deleteMessage(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { id } = req.params as { id: string };
    const { contactId } = req.body as DeleteMessageControllerDto;

    try {
      const { messageDeleted, messageId } =
        await messagesServices.deleteMessages({
          userId,
          contactIdDto: contactId,
          messageIdDto: id,
        });

      io.emit("messages@delete", { messageDeleted, messageId });

      return res.send!(200, messageDeleted);
    } catch (err: any) {
      console.log(err);

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

      io.emit("messages@deleteAll", deletedMessage);

      return res.send!(200, deletedMessage);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },

  async updateMessage(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const { id } = req.params as { id: string };
    const { contactId, content, contentType } =
      req.body as UpdateMessageControllerDto;

    try {
      const updatedMessage = await messagesServices.updateMessages({
        userId,
        contactIdDto: contactId,
        messageIdDto: id,
        contentDto: content,
        contentTypeDto: contentType,
      });

      io.emit("messages@new", updatedMessage);

      return res.send!(200, updatedMessage);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  async sendImage(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const content = req.fileUrl as string;

    const { contactId, contentType } = req.body as sendMessageControllerDto;

    try {
      const messages = await messagesServices.sendImage({
        userId,
        contactIdDto: contactId,
        contentTypeDto: contentType,
        contentDto: content,
      });

      io.emit("messages@newImage", messages);

      return res.send!(200, messages);
    } catch (err: any) {
      return sendErrorResponse(res, err);
    }
  },
  async sendVoice(req: CustomIncomingMessage, res: CustomServerResponse) {
    const { userId } = await ActiveUserId(req);
    const content = req.audioUrl as string;
    const { contactId, contentType } = req.body as sendMessageControllerDto;

    try {
      const messages = await messagesServices.sendVoice({
        userId,
        contactIdDto: contactId,
        contentTypeDto: contentType,
        contentDto: content,
      });

      io.emit("messages@new", messages);

      return res.send!(200, messages);
    } catch (err: any) {
      console.log(err);

      return sendErrorResponse(res, err);
    }
  },
};
