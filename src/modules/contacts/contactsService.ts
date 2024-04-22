import { contactsRepository } from "../../shared/database/repositories/contacts.repository";
import { invitesRepository } from "../../shared/database/repositories/invites.repository";
import { messageRepository } from "../../shared/database/repositories/messages.repository";
import { usersRepository } from "../../shared/database/repositories/users.repository";
import CustomError from "../../shared/utils/customError";
import { ContactDto } from "./dto/ContactDto";
import { AddContactDto } from "./dto/addContactDto";

interface ContactsProps {
  userId: string;
  contactIdDto: string;
}

export interface InviteProps {
  userId: string;
  userName: string;
}

export const contactsService = {
  async getContacts(userId: string) {
    const contacts = await contactsRepository.getContacts(userId);

    if (!contacts) {
      throw new CustomError("Contacts not found", 404);
    }

    return contacts;
  },
  async getOneContact({ userId, contactIdDto }: ContactsProps) {
    const { contactId } = ContactDto({ contactIdDto });

    const contact = await contactsRepository.getOneContact({
      userId,
      contactId,
    });

    if (!contact) {
      throw new CustomError("Contact not Found", 404);
    }

    return contact;
  },
  async addContacts({ userId, userName }: InviteProps) {
    const { username } = AddContactDto({
      userName,
    });

    const userExists = await usersRepository.findUserName(username);

    if (!userExists) {
      throw new CustomError("Contact not found", 404);
    }

    const contactId = userExists.id;

    if (contactId === userId) {
      throw new CustomError("Contact not found", 404);
    }

    const contactExists = await contactsRepository.getOneContact({
      userId,
      contactId,
    });

    if (contactExists) {
      throw new CustomError("You are already added", 400);
    }

    const inviteAlreadyExists = await invitesRepository.findInviteUser({
      userId,
      contactId,
    });

    if (inviteAlreadyExists) {
      throw new CustomError("Invite already was send", 400);
    }

    const inviteId = await contactsRepository.sendInviteContact({
      userId,
      contactId,
    });

    if (!inviteId) {
      throw new CustomError("Internal server error", 500);
    }

    return inviteId;
  },
  async deleteContact({ userId, contactIdDto }: ContactsProps) {
    const { contactId } = ContactDto({ contactIdDto });
    const contactExists = await contactsRepository.getOneContactById({
      userId,
      contactId,
    });

    if (!contactExists) {
      throw new CustomError("Contact not found", 404);
    }

    const messageExists = await messageRepository.getMessages({
      userId,
      contactId,
    });

    if (messageExists) {
      const contactId =
        contactExists.accepted_user_id === userId
          ? contactExists.inviter_user_id
          : contactExists.accepted_user_id;
      const deleteMesages = await messageRepository.deleteAllMessages({
        userId,
        contactId,
      });

      if (!deleteMesages) throw new CustomError("Internal server error", 404);
    }

    const contacDeleted = await contactsRepository.deleteContact({
      userId,
      contactId,
    });

    if (!contacDeleted) throw new CustomError("Internal server error", 500);

    return { deleted: true, contactId };
  },
};
