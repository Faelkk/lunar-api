import CustomError from "../../../shared/utils/customError";
import { isUUID } from "../../../shared/utils/isUUID";

export interface sendMessageProps {
  contactIdDto: string;
  contentTypeDto: string;
  contentDto: string;
}

export interface sendMessageControllerDto {
  contactId: string;
  contentType: string;
  content: string;
}

export const sendMessageDto = ({
  contactIdDto,
  contentTypeDto,
  contentDto,
}: sendMessageProps) => {
  if (!contactIdDto || !contentTypeDto || !contentDto) {
    throw new CustomError("All fields are required", 400);
  }

  if (!isUUID(contactIdDto)) {
    throw new CustomError("must be a valid UUID", 400);
  }

  if (contentTypeDto !== "Text") {
    throw new CustomError("Content Type must be string", 400);
  }

  return {
    contactId: contactIdDto,
    content: contentDto,
    contentType: contentTypeDto,
  };
};
