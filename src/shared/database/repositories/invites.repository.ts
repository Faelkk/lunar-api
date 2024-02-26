import sql from "../../../connect/connection";

interface InviteProps {
  userId: string;
  inviteId: string;
}

export const invitesRepository = {
  async findInvite({ userId, inviteId }: InviteProps) {
    const result =
      await sql`SELECT * FROM invites WHERE  id = ${inviteId} AND userId = ${userId}`;

    return result;
  },
  async getInvites(userId: string) {
    const result =
      await sql`SELECT * FROM invites WHERE receiver_id = ${userId} AND accepted = false`;

    return result;
  },
  async acceptInvite({ userId, inviteId }: InviteProps) {
    const result = await sql`
        UPDATE invites
        SET accepted = true
        WHERE id = ${inviteId} AND receiver_id = ${userId}    RETURNING receiver_id
    `;

    return result[0].receiver_id;
  },
};
