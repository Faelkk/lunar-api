export interface ContactCreateDto {
  contactId: string;
  userId: string;
  icon: string;
  userName: string;
}

export interface ContactDto {
  userId: string;
  contactId: string;
}

export interface contactResponse {
  id: string;
}
