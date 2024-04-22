export interface ContactDto {
  userId: string;
  contactId: string;
}

export interface contactResponse {
  id: string;
}

export interface InviteDto extends ContactDto {}

export interface InviteDtoController {
  username: string;
  contactId: string;
}
