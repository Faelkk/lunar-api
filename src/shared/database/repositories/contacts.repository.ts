import sql from "../../../connect/connection";
import { ContactDto } from "../../types/ContactTypes";

export const contactsRepository = {
  async getContacts(userId: string) {
    const result =
      await sql`SELECT * FROM contacts WHERE (inviter_user_id  = ${userId}) OR (accepted_user_id = ${userId}) `;

    return result;
  },

  async getOneContact({ userId, contactId }: ContactDto) {
    const result = await sql`
    SELECT * FROM contacts
    WHERE  (inviter_user_id = ${userId} AND accepted_user_id = ${contactId}) OR (inviter_user_id = ${contactId} AND accepted_user_id = ${userId})
  `;

    return result[0];
  },

  async sendInviteContact({ userId, contactId }: ContactDto) {
    const result = await sql`
  INSERT INTO invites (sender_id, receiver_id, accepted)
  VALUES (${userId}, ${contactId}, false)
  RETURNING *;
`;

    return result;
  },

  async deleteContact({ userId, contactId }: ContactDto) {
    const result =
      await sql`DELETE FROM contacts  WHERE id = ${contactId} AND (inviter_user_id = ${userId} OR accepted_user_id = ${userId})`;
    return result;
  },

  async createContact({ userId, contactId }: ContactDto) {
    const result =
      await sql`INSERT INTO contacts ( inviter_user_id , accepted_user_id) VALUES (${contactId},${userId}) RETURNING *`;

    return result;
  },
};
