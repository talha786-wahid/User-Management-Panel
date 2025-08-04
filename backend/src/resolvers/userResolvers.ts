import { UserModel } from "../models/User";

export const resolvers = {
  Query: {
    users: () => UserModel.findAll(),
    user: (_: any, { id }: { id: string }) => UserModel.findById(id),
  },

  Mutation: {
    createUser: (_: any, { input }: { input: any }) => {
      return UserModel.create(input);
    },

    updateUser: (_: any, { id, input }: { id: string; input: any }) => {
      const user = UserModel.update(id, input);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },

    deleteUser: (_: any, { id }: { id: string }) => {
      return UserModel.delete(id);
    },
  },
};
