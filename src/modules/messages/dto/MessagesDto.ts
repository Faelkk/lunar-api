import CustomError from "../../../shared/utils/customError";

export interface MessagesDTOprops {
  contactId: string;
}

export const MessagesDTO = ({ contactId }: MessagesDTOprops) => {
  if (!contactId) {
    throw new CustomError("ContactId is required", 400);
  }

  return { contactId };
};
