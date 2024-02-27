import CustomError from "../../../shared/utils/customError";

export interface sendMessageProps {
  contactId: string;
  contentType: string;
  content: string;
}

export const sendMessageDto = ({ contactId }: sendMessageProps) => {
  if (!contactId) {
    throw new CustomError("ContactId is required", 400);
  }

  return { contactId };
};
