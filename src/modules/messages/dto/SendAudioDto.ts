import CustomError from "../../../shared/utils/customError";
import { isUUID } from "../../../shared/utils/isUUID";

export interface sendAudioProps {
  contactIdDto: string;
  contentTypeDto: string;
  contentDto: string;
}

export interface sendAudioControllerDto {
  contactId: string;
  contentType: string;
  content: string;
}

export const sendAudioDto = ({
  contactIdDto,
  contentTypeDto,
  contentDto,
}: sendAudioProps) => {
  if (!contactIdDto || !contentTypeDto || !contentDto) {
    throw new CustomError("All fields are required", 400);
  }

  if (!isUUID(contactIdDto)) {
    throw new CustomError("must be a valid UUID", 400);
  }

  if (contentTypeDto !== "Audio") {
    throw new CustomError("Content Type must be Audio", 400);
  }

  return {
    contactId: contactIdDto,
    content: contentDto,
    contentType: contentTypeDto,
  };
};
