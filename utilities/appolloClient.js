import { ApolloClient,HttpLink,InMemoryCache,} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { app_config} from "../app_config"

let apolloClient;

const httpLink = new HttpLink({
  uri: app_config.API_URI, //"https://localhost:7122/graphql/",
  credentials: "same-origin",
});

// Add this context link to inject the token
const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage (or wherever you store it)
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  };
});
function createApolloClient() {
  return new ApolloClient({
   link: authLink.concat(httpLink), // Chain authLink before httpLink
    cache: new InMemoryCache(),
  });
}

export function initializeApollo() {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}