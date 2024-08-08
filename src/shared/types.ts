export type User = {
  id: string;
  fullName: string;
  phone: string;
  isManager: boolean;
  password: string;
}

export type AuthResponse = {
  user: User;
  accessToken: string;
};