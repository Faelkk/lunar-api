import CustomError from "../../../shared/utils/customError";
import { isUUID } from "../../../shared/utils/isUUID";

export interface ContactDtoProps {
  contactIdDto: string;
}

export interface ContactDtoController {
  contactId: string;
}

export const ContactDto = ({ contactIdDto }: ContactDtoProps) => {
  if (!contactIdDto) {
    throw new CustomError("Contact id is required", 400);
  }

  if (!isUUID(contactIdDto)) {
    throw new CustomError("contactId must be a valid UUID", 400);
  }

  return { contactId: contactIdDto };
};
