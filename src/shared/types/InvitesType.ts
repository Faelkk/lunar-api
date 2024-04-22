export interface InvitesDto {
  userId: string;
  inviteId: string;
}

export interface InvitesUserDto {
  userId: string;
  contactId: string;
}

export interface InvitesCancelDto {
  inviteId: string;
  senderId: string;
}
