import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum UserRole {
    admin
    moderator
    user
  }

  enum UserStatus {
    active
    banned
    pending
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: UserRole!
    status: UserStatus!
    createdAt: String!
  }

  input UserInput {
    name: String!
    email: String!
    role: UserRole!
    status: UserStatus!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`;
