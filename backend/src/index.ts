import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schemas/schema";
import { resolvers } from "./resolvers/userResolvers";

async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: app as any,
    cors: {
      origin: ["http://localhost:5173", "http://localhost:3000"],
      credentials: true,
    },
  });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
