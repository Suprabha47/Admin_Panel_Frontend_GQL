import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_BACKEND_GRAPHQL_URI }),
  cache: new InMemoryCache(),
});

export default client;
