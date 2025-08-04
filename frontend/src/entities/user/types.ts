// User role and status types
export type UserRole = "admin" | "moderator" | "user";
export type UserStatus = "active" | "banned" | "pending";

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

// User input interface for create/update operations
export interface UserInput {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
