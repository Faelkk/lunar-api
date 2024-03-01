import CustomError from "../../../shared/utils/customError";
import { isUUID } from "../../../shared/utils/isUUID";

export interface sendImageProps {
  contactIdDto: string;
  contentTypeDto: string;
  contentDto: string;
}

export interface sendImageControllerDto {
  contactId: string;
  contentType: string;
  content: string;
}

export const sendImageDto = ({
  contactIdDto,
  contentTypeDto,
  contentDto,
}: sendImageProps) => {
  if (!contactIdDto || !contentTypeDto || !contentDto) {
    throw new CustomError("All fields are required", 400);
  }

  if (!isUUID(contactIdDto)) {
    throw new CustomError("must be a valid UUID", 400);
  }

  if (contentTypeDto !== "Image") {
    throw new CustomError("Content Type must be image", 400);
  }

  return {
    contactId: contactIdDto,
    content: contentDto,
    contentType: contentTypeDto,
  };
};
