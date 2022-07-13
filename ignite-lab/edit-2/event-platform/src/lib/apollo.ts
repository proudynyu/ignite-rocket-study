import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URI,
  cache: new InMemoryCache(),
  headers: {
    token: import.meta.env.VITE_ACCESS_TOKEN
  }
})