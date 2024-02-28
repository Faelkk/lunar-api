import CustomError from "../../../shared/utils/customError";

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

  return { contactId: contactIdDto };
};
