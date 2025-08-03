export type UserRole = "admin" | "moderator" | "user";
export type UserStatus = "active" | "pending" | "banned";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
}

export interface UserFilter {
  email?: string;
  role?: UserRole;
  status?: UserStatus;
  startDate?: string;
  endDate?: string;
}

export interface CacheEntry {
  users: User[];
  total: number;
  timestamp: number;
}
