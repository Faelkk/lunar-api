import CustomError from "../../../shared/utils/customError";

export interface InviteDtoProps {
  inviteId: string;
  contactId: string;
}

export interface InviteControllerDto {
  inviteIdDto: string;
}

export const InviteDto = ({ inviteIdDto }: InviteControllerDto) => {
  if (!inviteIdDto) {
    throw new CustomError("inviteId  are required", 400);
  }

  return { inviteId: inviteIdDto };
};
