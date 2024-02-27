import CustomError from "../../../shared/utils/customError";

export interface UpdateMessageDtoProps {
  contactId: string;
  contentType: string;
  content: string;
  messageId: string;
}

export const UpdateMessageDto = ({
  contactId,
  content,
  contentType,
  messageId,
}: UpdateMessageDtoProps) => {
  if (!contactId && !content && !contentType && !messageId) {
    throw new CustomError("All fields are  required", 400);
  }

  return { contactId, content, contentType, messageId };
};
