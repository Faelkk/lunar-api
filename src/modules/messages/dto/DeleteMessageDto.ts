import CustomError from "../../../shared/utils/customError";
import { isUUID } from "../../../shared/utils/isUUID";

export interface DeleteMessageDtoProps {
  contactIdDto: string;
  messageIdDto: string;
}

export interface DeleteMessageControllerDto {
  contactId: string;
  messageId: string;
}

export const DeleteMessageDto = ({
  contactIdDto,
  messageIdDto,
}: DeleteMessageDtoProps) => {
  if (!contactIdDto || !messageIdDto) {
    throw new CustomError("ContactId and MessageId are required", 400);
  }

  if (!isUUID(contactIdDto) || !isUUID(messageIdDto)) {
    throw new CustomError("must be a valid UUID", 400);
  }

  return { contactId: contactIdDto, messageId: messageIdDto };
};
