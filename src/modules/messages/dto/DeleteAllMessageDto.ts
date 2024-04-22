import CustomError from "../../../shared/utils/customError";
import { isUUID } from "../../../shared/utils/isUUID";

export interface DeleteMessageDtoProps {
  contactIdDto: string;
}

export interface DeleteMessageControllerDto {
  contactId: string;
}

export const DeleteAllMessageDto = ({
  contactIdDto,
}: DeleteMessageDtoProps) => {
  if (!contactIdDto) {
    throw new CustomError("ContactId isrequired", 400);
  }

  if (!isUUID(contactIdDto)) {
    throw new CustomError("must be a valid UUID", 400);
  }

  return { contactId: contactIdDto };
};
