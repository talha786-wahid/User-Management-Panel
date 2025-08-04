export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "user";
  status: "active" | "banned" | "pending";
  createdAt: string;
}

// Mock data with 10 users
let users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-02-04T10:00:00.000Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "moderator",
    status: "active",
    createdAt: "2024-02-04T09:30:00.000Z",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
    status: "pending",
    createdAt: "2024-02-04T09:00:00.000Z",
  },
  {
    id: "4",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "user",
    status: "banned",
    createdAt: "2024-02-04T08:30:00.000Z",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "moderator",
    status: "active",
    createdAt: "2024-02-04T08:00:00.000Z",
  },
  {
    id: "6",
    name: "David Miller",
    email: "david@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-02-04T07:30:00.000Z",
  },
  {
    id: "7",
    name: "Eva Davis",
    email: "eva@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-02-04T07:00:00.000Z",
  },
  {
    id: "8",
    name: "Frank White",
    email: "frank@example.com",
    role: "user",
    status: "pending",
    createdAt: "2024-02-04T06:30:00.000Z",
  },
  {
    id: "9",
    name: "Grace Lee",
    email: "grace@example.com",
    role: "moderator",
    status: "active",
    createdAt: "2024-02-04T06:00:00.000Z",
  },
  {
    id: "10",
    name: "Henry Taylor",
    email: "henry@example.com",
    role: "user",
    status: "banned",
    createdAt: "2024-02-04T05:30:00.000Z",
  },
];

export const UserModel = {
  findAll: () => users,

  findById: (id: string) => users.find((user) => user.id === id),

  create: (data: Omit<User, "id" | "createdAt">) => {
    const user: User = {
      ...data,
      id: String(users.length + 1),
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    return user;
  },

  update: (id: string, data: Partial<Omit<User, "id" | "createdAt">>) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...data,
    };
    return users[index];
  },

  delete: (id: string) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    users = users.filter((user) => user.id !== id);
    return true;
  },
};
