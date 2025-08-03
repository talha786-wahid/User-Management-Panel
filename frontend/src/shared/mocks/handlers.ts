import { graphql } from "msw";
import { faker } from "@faker-js/faker";
import { UserRole, UserStatus } from "../../entities/user/types.ts";

const roles: UserRole[] = ["admin", "user", "moderator"];
const statuses: UserStatus[] = ["active", "banned", "pending"];

// Generate mock users
const generateMockUsers = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: faker.date.past().toISOString(),
    __typename: "User",
  }));
};

const mockUsers = generateMockUsers(50);

export const handlers = [
  graphql.query("GetUsers", (req, res, ctx) => {
    const { offset = 0, limit = 10, filter } = req.variables;

    let filteredUsers = [...mockUsers];

    if (filter?.email) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(filter.email.toLowerCase())
      );
    }

    if (filter?.role) {
      filteredUsers = filteredUsers.filter((user) => user.role === filter.role);
    }

    return res(
      ctx.data({
        users: {
          items: filteredUsers.slice(offset, offset + limit),
          total: filteredUsers.length,
          __typename: "UserResponse",
        },
      })
    );
  }),

  graphql.mutation("CreateUser", (req, res, ctx) => {
    const { input } = req.variables;

    if (!input) {
      return res(
        ctx.errors([
          {
            message: "Input is required",
            extensions: { code: "BAD_USER_INPUT" },
          },
        ])
      );
    }

    const newUser = {
      id: faker.string.uuid(),
      ...input,
      createdAt: new Date().toISOString(),
      __typename: "User",
    };

    mockUsers.unshift(newUser);

    return res(
      ctx.data({
        createUser: newUser,
      })
    );
  }),

  graphql.mutation("UpdateUser", (req, res, ctx) => {
    const { id, input } = req.variables;
    const userIndex = mockUsers.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res(
        ctx.errors([
          {
            message: "User not found",
            extensions: { code: "NOT_FOUND" },
          },
        ])
      );
    }

    const updatedUser = {
      ...mockUsers[userIndex],
      ...input,
      __typename: "User",
    };
    mockUsers[userIndex] = updatedUser;

    return res(
      ctx.data({
        updateUser: updatedUser,
      })
    );
  }),

  graphql.mutation("DeleteUser", (req, res, ctx) => {
    const { id } = req.variables;
    const userIndex = mockUsers.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res(
        ctx.errors([
          {
            message: "User not found",
            extensions: { code: "NOT_FOUND" },
          },
        ])
      );
    }

    mockUsers.splice(userIndex, 1);

    return res(
      ctx.data({
        deleteUser: true,
      })
    );
  }),
];
