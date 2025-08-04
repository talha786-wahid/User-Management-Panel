import type { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as BaseApolloProvider,
} from "@apollo/client";

const API_URL = import.meta.env.VITE_API_URL;

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

interface ApolloProviderProps {
  children: ReactNode;
}

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
};
