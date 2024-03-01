import CustomError from "../../../shared/utils/customError";
import { isUUID } from "../../../shared/utils/isUUID";

export interface UpdateMessageDtoProps {
  contactIdDto: string;
  contentTypeDto: string;
  contentDto: string;
  messageIdDto: string;
}

export interface UpdateMessageControllerDto {
  contactId: string;
  contentType: string;
  content: string;
  messageId: string;
}

export const UpdateMessageDto = ({
  contactIdDto,
  contentDto,
  contentTypeDto,
  messageIdDto,
}: UpdateMessageDtoProps) => {
  if (!contactIdDto && !contentDto && !contentTypeDto && !messageIdDto) {
    throw new CustomError("All fields are  required", 400);
  }

  if (!isUUID(contactIdDto) || !isUUID(messageIdDto)) {
    throw new CustomError("must be a valid UUID", 400);
  }

  if (contentTypeDto !== "Text") {
    throw new CustomError("Content Type must be string", 400);
  }

  return {
    contactId: contactIdDto,
    content: contentDto,
    contentType: contentTypeDto,
    messageId: messageIdDto,
  };
};
