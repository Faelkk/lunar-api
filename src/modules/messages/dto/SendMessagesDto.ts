import CustomError from "../../../shared/utils/customError";

export interface sendMessageProps {
  contactId: string;
  contentType: string;
  content: string;
}

export const sendMessageDto = ({
  contactId,
  content,
  contentType,
}: sendMessageProps) => {
  if (!contactId && !content && !contentType) {
    throw new CustomError("All fields are required", 400);
  }

  return { contactId, content, contentType };
};
