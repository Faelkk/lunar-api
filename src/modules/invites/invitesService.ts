import { contactsRepository } from "../../shared/database/repositories/contacts.repository";
import { invitesRepository } from "../../shared/database/repositories/invites.repository";
import { usersRepository } from "../../shared/database/repositories/users.repository";

import CustomError from "../../shared/utils/customError";

interface InviteProps {
  userId: string;
  inviteId: string;
}

export const invitesService = {
  async getInvites(userId: string) {
    const invites = await invitesRepository.getInvites(userId);

    if (!invites) throw new CustomError("No one invite was found", 404);

    return invites;
  },
  async acceptInvite({ userId, inviteId }: InviteProps) {
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

    await contactsRepository.createContact({
      userId,
      contactId: newContactInfo.id,
      userName: newContactInfo.userName,
      icon: newContactInfo.icon,
    });

    return { invite: true };
  },
};
