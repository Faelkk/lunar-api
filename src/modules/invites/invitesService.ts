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

    if (!invite) {
      throw new CustomError("Internal server error", 500);
    }

    const { id } = await usersRepository.findUser(invite);

    const createdContact = await contactsRepository.createContact({
      userId,
      contactId: id,
    });

    if (!createdContact) throw new CustomError("Internal server error", 500);

    return createdContact;
  },
  async rejectInvite({ userId, inviteIdDto }: InviteProps) {
    const { inviteId } = InviteDto({ inviteIdDto });
    const inviteExists = await invitesRepository.findInvite({
      userId,
      inviteId,
    });

    if (!inviteExists) {
      throw new CustomError("Invite not found", 404);
    }

    const invitedRejected = await invitesRepository.rejectInvite({
      userId,
      inviteId,
    });

    if (!invitedRejected) {
      throw new CustomError("Internal server error", 500);
    }

    return { deleted: true };
  },
};
