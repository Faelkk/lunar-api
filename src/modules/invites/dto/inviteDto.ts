import CustomError from "../../../shared/utils/customError";

export interface InviteDtoProps {
  inviteId: string;
  contactId: string;
}

export const InviteDto = ({ inviteId, contactId }: InviteDtoProps) => {
  if (!inviteId && !contactId) {
    throw new CustomError("inviteId and contactId are required", 400);
  }

  return { inviteId };
};
