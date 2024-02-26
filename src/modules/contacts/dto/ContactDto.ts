import CustomError from "../../../shared/utils/customError";

export interface ContactDtoProps {
  contactId: string;
}

export const ContactDto = ({ contactId }: ContactDtoProps) => {
  if (!contactId) {
    throw new CustomError("Contact id is required", 400);
  }

  return { contactId };
};
