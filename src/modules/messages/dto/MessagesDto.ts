import CustomError from "../../../shared/utils/customError";

export interface MessagesDTOprops {
  contactIdDto: string;
}

export interface MessagesControllerDto {
  contactId: string;
}

export const MessagesDTO = ({ contactIdDto }: MessagesDTOprops) => {
  if (!contactIdDto) {
    throw new CustomError("ContactId is required", 400);
  }

  return { contactId: contactIdDto };
};
