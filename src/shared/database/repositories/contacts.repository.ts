import sql from "../../../connect/connection";
import {
  ContactCreateDto,
  ContactDto,
  contactResponse,
} from "../../types/ContactTypes";

export const contactsRepository = {
  async findContact(contactId: string) {
    const result: contactResponse[] =
      await sql`SELECT * FROM users WHERE id = ${contactId}`;

    return result[0];
  },

  async getContacts(userId: string) {
    const result = await sql`SELECT * FROM contacts where user_id = ${userId}`;

    return result;
  },

  async getOneContact({ userId, contactId }: ContactDto) {
    const result =
      await sql`SELECT * FROM contacts WHERE user_id = ${userId} AND id = ${contactId}`;

    return result[0];
  },

  async sendInviteContact({ userId, contactId }: ContactDto) {
    const result = await sql`
  INSERT INTO invites (sender_id, receiver_id, accepted)
  VALUES (${userId}, ${contactId}, false)
  ON CONFLICT (receiver_id) DO NOTHING RETURNING *;
`;

    return result;
  },

  async deleteContact({ userId, contactId }: ContactDto) {
    const result =
      await `DELETE FROM contacts WHERE user_id = ${userId} AND id = ${contactId}`;
    return result;
  },

  async createContact({ contactId, userId, icon, userName }: ContactCreateDto) {
    const result =
      await sql`INSERT INTO contacts (user_id,icon,username,contactid) VALUES (${userId},${icon},${userName},${contactId}) RETURNING *`;

    return result;
  },
};
