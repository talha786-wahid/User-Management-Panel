import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { typeDefs } from "./schemas/schema";
import { resolvers } from "./resolvers/userResolvers";
import { connectDB } from "./config/db";

const startServer = async () => {
  const app = express();

  // Connect to MongoDB
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error("GraphQL Error:", error);
      return error;
    },
  });

  await server.start();

  // Configure CORS with specific origin and credentials
  app.use(
    "/graphql",
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
