export type UserRole = "admin" | "moderator" | "user";
export type UserStatus = "active" | "banned" | "pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface UserInput {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
