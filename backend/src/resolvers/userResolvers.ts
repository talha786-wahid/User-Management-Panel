import { GraphQLError } from "graphql";
import { User } from "../models/User";

export const resolvers = {
  Query: {
    users: async (_, { offset = 0, limit = 10, filter = {} }) => {
      try {
        const query: any = {};

        if (filter.email) {
          query.email = { $regex: filter.email, $options: "i" };
        }

        if (filter.role) {
          query.role = filter.role;
        }

        if (filter.status) {
          query.status = filter.status;
        }

        if (filter.startDate && filter.endDate) {
          query.createdAt = {
            $gte: filter.startDate,
            $lte: filter.endDate,
          };
        }

        // Ensure we return a valid response even if the query fails
        let items = [];
        let total = 0;

        try {
          [items, total] = await Promise.all([
            User.find(query)
              .sort({ createdAt: -1 })
              .skip(offset)
              .limit(limit)
              .lean(),
            User.countDocuments(query),
          ]);
        } catch (error) {
          console.error("MongoDB query error:", error);
        }

        // Always return a valid response
        return {
          items: items || [],
          total: total || 0,
        };
      } catch (error) {
        console.error("Error in users query:", error);
        // Return empty result instead of null
        return {
          items: [],
          total: 0,
        };
      }
    },

    user: async (_, { id }) => {
      try {
        const user = await User.findById(id).lean();
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return user;
      } catch (error) {
        console.error("Error in user query:", error);
        throw new GraphQLError("Failed to fetch user", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
          throw new GraphQLError("Email already exists", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }

        const user = new User({
          ...input,
          createdAt: Date.now().toString(),
        });
        await user.save();
        return user;
      } catch (error) {
        console.error("Error in createUser mutation:", error);
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError("Failed to create user", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    updateUser: async (_, { id, input }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { $set: input },
          { new: true }
        );
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return user;
      } catch (error) {
        console.error("Error in updateUser mutation:", error);
        throw new GraphQLError("Failed to update user", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    updateUserRole: async (_, { id, role }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { $set: { role } },
          { new: true }
        );
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return user;
      } catch (error) {
        console.error("Error in updateUserRole mutation:", error);
        throw new GraphQLError("Failed to update user role", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },

    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return true;
      } catch (error) {
        console.error("Error in deleteUser mutation:", error);
        throw new GraphQLError("Failed to delete user", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },
};
