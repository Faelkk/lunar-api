import { contactsRepository } from "../../shared/database/repositories/contacts.repository";
import CustomError from "../../shared/utils/customError";

interface ContactsProps {
  userId: string;
  contactId: string;
}

export const contactsService = {
  async getContacts(userId: string) {
    const contacts = await contactsRepository.getContacts(userId);

    if (!contacts) throw new CustomError("Contacts not found", 404);

    return contacts;
  },
  async getOneContact({ userId, contactId }: ContactsProps) {
    const contact = await contactsRepository.getOneContact({
      userId,
      contactId,
    });

    if (!contact) throw new CustomError("Contact not Found", 404);

    return contact;
  },
  async addContacts({ userId, contactId }: ContactsProps) {
    const contactExists = await contactsRepository.findContact(userId);

    if (!contactExists) throw new CustomError("Contact not found", 404);

    const inviteId = await contactsRepository.sendInviteContact({
      userId,
      contactId,
    });

    if (!inviteId) throw new CustomError("Internal server error", 500);

    return { inviteId };
  },
  async deleteContact({ userId, contactId }: ContactsProps) {
    const contactExists = await contactsRepository.findContact(userId);

    if (!contactExists) throw new CustomError("contact not found", 404);

    const contacDeleted = await contactsRepository.deleteContact({
      userId,
      contactId,
    });

    if (!contacDeleted) throw new CustomError("Internal server error", 500);

    return { deleted: true };
  },
};
