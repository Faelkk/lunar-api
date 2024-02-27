import sql from "../../../connect/connection";

interface MessageProps {
  userId: string;
  contactId: string;
}

interface SendMessageProps extends MessageProps {
  userId: string;
  contactId: string;
  contentType: string;
  content: string;
  sentAt: Date;
}

interface MessageBodyProps extends MessageProps {
  messageId: string;
}

interface UpdateMessageBody extends SendMessageProps {
  messageId: string;
}

export const messageRepository = {
  async getMessages({ userId, contactId }: MessageProps) {
    const response = await sql`
    SELECT *
    FROM messages
    WHERE (sender_id = ${userId} AND receiver_id = ${contactId})
       OR (sender_id = ${contactId} AND receiver_id = ${userId})
    ORDER BY sent_at;
  `;

    return response;
  },
  async findOneMessage({ userId, contactId, messageId }: MessageBodyProps) {
    const response = await sql`
    SELECT *
    FROM messages
    WHERE id = ${messageId}  AND sender_id = ${userId} AND receiver_id = ${contactId}
  `;

    return response;
  },
  async sendMessages({
    userId,
    contactId,
    contentType,
    content,
    sentAt,
  }: SendMessageProps) {
    const response =
      await sql`INSERT INTO  messages (sender_id,receiver_id,content_type,content,sent_at) VALUES (${userId}, ${contactId}, ${contentType}, ${content}, ${sentAt}) RETURNING *
      `;

    return response;
  },
  async deleteMessages({ userId, contactId, messageId }: MessageBodyProps) {
    const response =
      await sql`DELETE FROM messages WHERE id = ${messageId} AND sender_id = ${userId} AND receiver_id = ${contactId}`;

    return response;
  },
  async updateMessages({
    userId,
    contactId,
    messageId,
    content,
    contentType,
  }: UpdateMessageBody) {
    const response =
      await sql`UPDATE messages   SET content = ${content}, content_type = ${contentType}  WHERE id = ${messageId} AND sender_id = ${userId} AND receiver_id = ${contactId}
      RETURNING *`;

    return response;
  },
};
