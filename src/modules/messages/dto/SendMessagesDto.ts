import CustomError from "../../../shared/utils/customError";

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
  if (!contactIdDto && !contentTypeDto && !contentDto) {
    throw new CustomError("All fields are required", 400);
  }

  return {
    contactId: contactIdDto,
    content: contentDto,
    contentType: contentTypeDto,
  };
};
