import sql from "../../../connect/connection";
import {
  InvitesDto,
  InvitesUserDto,
  InvitesCancelDto,
} from "../../types/InvitesType";

export const invitesRepository = {
  async findInvite({ userId, inviteId }: InvitesDto) {
    const result =
      await sql`SELECT * FROM invites WHERE  id = ${inviteId} AND receiver_id = ${userId} AND accepted = false`;

    return result[0];
  },
  async findInviteSend({ userId, inviteId }: InvitesDto) {
    const result =
      await sql`SELECT * FROM invites WHERE  id = ${inviteId} AND sender_id = ${userId} AND accepted = false`;

    return result[0];
  },
  async findInviteUser({ userId, contactId }: InvitesUserDto) {
    const result = await sql`
      SELECT * 
      FROM invites 
      WHERE (sender_id = ${userId} AND receiver_id = ${contactId}) 
      OR (sender_id = ${contactId} AND receiver_id = ${userId}) 
      AND accepted = false
    `;

    return result[0];
  },
  async getInvites(userId: string) {
    const result =
      await sql`SELECT * FROM invites WHERE receiver_id = ${userId} AND accepted = false`;

    return result;
  },
  async getSendInvites(userId: string) {
    const result =
      await sql`SELECT * FROM invites WHERE sender_id = ${userId} AND accepted = false`;

    return result;
  },
  async acceptInvite({ userId, inviteId }: InvitesDto) {
    const result = await sql`
    DELETE FROM invites
    WHERE id = ${inviteId} AND receiver_id = ${userId}
    RETURNING sender_id
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
  async cancelInvite({ senderId, inviteId }: InvitesCancelDto) {
    const result = await sql`
    DELETE FROM invites
    WHERE id = ${inviteId} AND sender_id = ${senderId}
`;

    return result;
  },
};
