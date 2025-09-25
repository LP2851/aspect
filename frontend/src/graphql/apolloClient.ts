import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/api/graphql", // Keystone GraphQL endpoint
  credentials: "include", // include cookies for session auth
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
