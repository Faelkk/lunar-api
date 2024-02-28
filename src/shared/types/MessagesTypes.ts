export interface MessageBase {
  userId: string;
  contactId: string;
}

export interface MessageIdDto extends MessageBase {
  messageId: string;
}

export interface SendMessageDto extends MessageBase {
  contentType: string;
  content: string;
  sentAt: Date;
}

export interface UpdateMessageDto extends SendMessageDto {
  messageId: string;
}

export interface MessageIdDtoBase extends MessageBase {
  messageId: string;
}

export interface MessageResponse extends MessageBase {
  id: string;
  sender_id: string;
  receiver_Id: string;
  contentType: string;
  content: string;
  sentAt: Date;
}
