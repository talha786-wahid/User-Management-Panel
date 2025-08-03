import { create } from "zustand";
import { User, UserFilter, CacheEntry } from "../types";

interface CacheKey {
  offset: number;
  limit: number;
  filter?: UserFilter;
}

interface UserStore {
  users: User[];
  total: number;
  cache: Map<string, CacheEntry>;
  setUsers: (users: User[], total: number) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  addUser: (user: User) => void;
  getCachedData: (key: CacheKey) => CacheEntry | undefined;
  setCachedData: (key: CacheKey, data: CacheEntry) => void;
}

const serializeCacheKey = (key: CacheKey): string => JSON.stringify(key);

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  total: 0,
  cache: new Map(),

  setUsers: (users, total) => {
    set({ users, total });
  },

  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
      total: state.total - 1,
    })),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
      total: state.total + 1,
    })),

  getCachedData: (key) => {
    const serializedKey = serializeCacheKey(key);
    const entry = get().cache.get(serializedKey);
    if (!entry) return undefined;

    // Cache expires after 5 minutes
    if (Date.now() - entry.timestamp > 5 * 60 * 1000) {
      get().cache.delete(serializedKey);
      return undefined;
    }

    return entry;
  },

  setCachedData: (key, data) => {
    const serializedKey = serializeCacheKey(key);
    get().cache.set(serializedKey, data);
  },
}));
