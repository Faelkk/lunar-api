import CustomError from "../../../shared/utils/customError";

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
  if (!contactIdDto && messageIdDto) {
    throw new CustomError("ContactId and MessageId are required", 400);
  }

  return { contactId: contactIdDto, messageId: messageIdDto };
};
