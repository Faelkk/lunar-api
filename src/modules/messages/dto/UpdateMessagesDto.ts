import CustomError from "../../../shared/utils/customError";

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

  return {
    contactId: contactIdDto,
    content: contentDto,
    contentType: contentTypeDto,
    messageId: messageIdDto,
  };
};
