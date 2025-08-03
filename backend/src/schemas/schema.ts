import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    status: String!
    createdAt: String!
  }

  type UserResponse {
    items: [User!]!
    total: Int!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    role: String!
    status: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    role: String
    status: String
  }

  input UserFilter {
    email: String
    role: String
    status: String
    startDate: String
    endDate: String
  }

  type Query {
    users(offset: Int = 0, limit: Int = 10, filter: UserFilter): UserResponse!
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    updateUserRole(id: ID!, role: String!): User!
    deleteUser(id: ID!): Boolean!
  }
`;
