import CustomError from "../../../shared/utils/customError";

export interface DeleteMessageDtoProps {
  contactId: string;
  messageId: string;
}

export const DeleteMessageDto = ({
  contactId,
  messageId,
}: DeleteMessageDtoProps) => {
  if (!contactId && messageId) {
    throw new CustomError("ContactId and MessageId are required", 400);
  }

  return { contactId };
};
