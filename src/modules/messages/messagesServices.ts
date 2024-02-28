import { contactsRepository } from "../../shared/database/repositories/contacts.repository";
import { messageRepository } from "../../shared/database/repositories/messages.repository";
import CustomError from "../../shared/utils/customError";
import { DeleteMessageDto } from "./dto/DeleteMessageDto";
import { MessagesDTO } from "./dto/MessagesDto";
import { sendMessageDto } from "./dto/SendMessagesDto";
import { UpdateMessageDto } from "./dto/UpdateMessagesDto";

interface MessageProps {
  userId: string;
  contactIdDto: string;
}

interface SendMessage extends MessageProps {
  userId: string;
  contactIdDto: string;
  contentTypeDto: string;
  contentDto: string;
  sentAt: Date;
}

interface DeleteMessage extends MessageProps {
  messageIdDto: string;
}

interface UpdateMessages extends MessageProps {
  sentAt: Date;
  contentTypeDto: string;
  contentDto: string;
  messageIdDto: string;
}

export const messagesServices = {
  async getMessages({ userId, contactIdDto }: MessageProps) {
    const { contactId } = MessagesDTO({ contactIdDto });
    const contactExists = await contactsRepository.getOneContact({
      userId,
      contactId,
    });

    if (!contactExists) throw new CustomError("Contact Not Found", 404);

    const messages = await messageRepository.getMessages({ userId, contactId });

    if (!messages) {
      throw new CustomError("Messages Not found", 404);
    }

    return messages;
  },
  async sendMessages({
    userId,
    contactIdDto,
    contentTypeDto,
    contentDto,
    sentAt,
  }: SendMessage) {
    const { contactId, content, contentType } = sendMessageDto({
      contactIdDto,
      contentTypeDto,
      contentDto,
    });

    const contactExists = await contactsRepository.getOneContact({
      userId,
      contactId,
    });

    if (!contactExists) throw new CustomError("Contact Not Found", 404);

    const messageSend = await messageRepository.sendMessages({
      userId,
      contactId,
      contentType,
      content,
      sentAt,
    });

    if (!messageSend) throw new CustomError("Internal server error", 500);

    return messageSend;
  },
  async deleteMessages({ userId, contactIdDto, messageIdDto }: DeleteMessage) {
    const { contactId, messageId } = DeleteMessageDto({
      contactIdDto,
      messageIdDto,
    });
    const messageExists = await messageRepository.findOneMessage({
      userId,
      contactId,
      messageId,
    });

    if (!messageExists) throw new CustomError("Message not found", 404);

    const messageDeleted = await messageRepository.deleteMessages({
      userId,
      contactId,
      messageId,
    });

    if (!messageDeleted) throw new CustomError("Internal server error", 404);

    return { messageUpdated: true };
  },
  async updateMessages({
    userId,
    contactIdDto,
    messageIdDto,
    contentDto,
    contentTypeDto,
    sentAt,
  }: UpdateMessages) {
    const { contactId, content, contentType, messageId } = UpdateMessageDto({
      contactIdDto,
      contentDto,
      contentTypeDto,
      messageIdDto,
    });

    const messageExists = await messageRepository.findOneMessage({
      userId,
      contactId,
      messageId,
    });
    if (!messageExists) throw new CustomError("Message not found", 404);

    const messageUpdated = await messageRepository.updateMessages({
      userId,
      contactId,
      messageId,
      content,
      contentType,
      sentAt,
    });

    if (!messageUpdated) throw new CustomError("Internal server error", 404);

    return messageUpdated;
  },
};
