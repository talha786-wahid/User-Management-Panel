import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createHttpLink } from "@apollo/client/link/http";
import { App, message } from "antd";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message: errorMessage }) => {
      message.error(`GraphQL Error: ${errorMessage}`);
    });
  }

  if (networkError) {
    message.error(`Network Error: ${networkError.message}`);
  }
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export const ApolloProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ApolloProvider client={client}>
      <App>{children}</App>
    </ApolloProvider>
  );
};
