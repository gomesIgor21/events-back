export type UserRegisterType = {
  user: UserType,
  guest?: GuestType,
  organizer?: OrganizerType 
}

export type UserType = {
  id?: number;
  username: string;
  password: string;
  role: string;
}

export type GuestType = {
  id?: number
  user_id: number;
  name: string;
  phone: string;
}

export type OrganizerType = {
  id?: number
  user_id: number;
  name: string;
  phone: string;
}

