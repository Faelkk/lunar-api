import sql from "../../../connect/connection";
import { InvitesDto } from "../../types/InvitesType";

export const invitesRepository = {
  async findInvite({ userId, inviteId }: InvitesDto) {
    const result =
      await sql`SELECT * FROM invites WHERE  id = ${inviteId} AND userId = ${userId}`;

    return result[0];
  },
  async getInvites(userId: string) {
    const result =
      await sql`SELECT * FROM invites WHERE receiver_id = ${userId} AND accepted = false`;

    return result;
  },
  async acceptInvite({ userId, inviteId }: InvitesDto) {
    const result = await sql`
        UPDATE invites
        SET accepted = true
        WHERE id = ${inviteId} AND receiver_id = ${userId}    RETURNING receiver_id
    `;

    return result[0].receiver_id;
  },
};
