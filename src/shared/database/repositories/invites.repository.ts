import sql from "../../../connect/connection";
import { InvitesDto, InvitesUserDto } from "../../types/InvitesType";

export const invitesRepository = {
  async findInvite({ userId, inviteId }: InvitesDto) {
    const result =
      await sql`SELECT * FROM invites WHERE  id = ${inviteId} AND receiver_id = ${userId} AND accepted = false`;

    return result[0];
  },
  async findInviteUser({ userId, contactId }: InvitesUserDto) {
    const result =
      await sql`SELECT * FROM invites WHERE  sender_id = ${userId} AND receiver_id = ${contactId}  AND accepted = false`;

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
        WHERE id = ${inviteId} AND receiver_id = ${userId}    RETURNING sender_id
    `;

    return result[0].sender_id;
  },
  async rejectInvite({ userId, inviteId }: InvitesDto) {
    const result = await sql`
    DELETE FROM invites
    WHERE id = ${inviteId} AND receiver_id = ${userId}
`;

    return result;
  },
};
