export type UserType = {
  id?: number;
  username: string;
  password: string;
}

export type GuestUserType = {
  id?: number;
  name: string;
  phone: string;
  user: UserType;
}