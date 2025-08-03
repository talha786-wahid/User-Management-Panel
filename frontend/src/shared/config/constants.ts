import { UserRole, UserStatus } from "../../entities/user/types.ts";

export const USER_ROLES: UserRole[] = ["admin", "user", "moderator"];
export const USER_STATUSES: UserStatus[] = ["active", "banned", "pending"];

export const TABLE_PAGE_SIZE = 10;

export const DATE_FORMAT = "dd.MM.yyyy HH:mm";
export const DATE_FORMAT_FULL = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";
