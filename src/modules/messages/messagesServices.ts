import { contactsRepository } from "../../shared/database/repositories/contacts.repository";
import { messageRepository } from "../../shared/database/repositories/messages.repository";
import CustomError from "../../shared/utils/customError";

interface MessageProps {
  userId: string;
  contactId: string;
}

interface SendMessage extends MessageProps {
  userId: string;
  contactId: string;
  contentType: string;
  content: string;
  sentAt: Date;
}

interface DeleteMessage extends MessageProps {
  messageId: string;
}

export const messagesServices = {
  async getMessages({ userId, contactId }: MessageProps) {
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
    contactId,
    contentType,
    content,
    sentAt,
  }: SendMessage) {
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
  async deleteMessages({ userId, contactId, messageId }: DeleteMessage) {
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

    return messageDeleted;
  },
  async updateMessages({ userId, contactId, messageId }: DeleteMessage) {
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

    return messageDeleted;
  },
};
