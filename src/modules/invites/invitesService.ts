import { contactsRepository } from "../../shared/database/repositories/contacts.repository";
import { invitesRepository } from "../../shared/database/repositories/invites.repository";
import { usersRepository } from "../../shared/database/repositories/users.repository";

import CustomError from "../../shared/utils/customError";
import { InviteDto } from "./dto/inviteDto";

interface InviteProps {
  userId: string;
  inviteIdDto: string;
}

export const invitesService = {
  async getInvites(userId: string) {
    const invites = await invitesRepository.getInvites(userId);

    if (!invites) throw new CustomError("No one invite was found", 404);

    return invites;
  },
  async acceptInvite({ userId, inviteIdDto }: InviteProps) {
    const { inviteId } = InviteDto({ inviteIdDto });
    const inviteExists = await invitesRepository.findInvite({
      userId,
      inviteId,
    });

    if (!inviteExists) {
      throw new CustomError("Invite not found", 404);
    }

    const invite = await invitesRepository.acceptInvite({ userId, inviteId });

    if (!invite) throw new CustomError("Internal server error", 500);

    const newContactInfo = await usersRepository.findUser(invite);

    const createdContact = await contactsRepository.createContact({
      userId,
      contactId: newContactInfo.id,
      userName: newContactInfo.userName,
      icon: newContactInfo.icon,
    });

    if (!createdContact) throw new CustomError("Internal server error", 500);

    return createdContact;
  },
};
