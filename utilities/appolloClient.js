// import { ApolloClient,HttpLink,InMemoryCache,} from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { app_config} from "../app_config"

// let apolloClient;

// const httpLink = new HttpLink({
//   uri: app_config.API_URI, //"https://localhost:7122/graphql/",
//   credentials: "same-origin",
// });

// // Add this context link to inject the token
// const authLink = setContext((_, { headers }) => {
//   // Get the token from localStorage (or wherever you store it)
//   const token = localStorage.getItem("jwtToken");
//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : "",
//     }
//   };
// });
// function createApolloClient() {
//   return new ApolloClient({
//    link: authLink.concat(httpLink), // Chain authLink before httpLink
//     cache: new InMemoryCache(),
//   });
// }

// export function initializeApollo() {
//   const _apolloClient = apolloClient ?? createApolloClient();
//   if (!apolloClient) apolloClient = _apolloClient;

//   return _apolloClient;
// }


import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { app_config } from "../app_config";

let apolloClient;

const httpLink = new HttpLink({
  uri: app_config.API_URI, // e.g. "https://your-api.azurewebsites.net/graphql"
});
const wsLink = typeof window !== "undefined"
  ? new WebSocketLink({
      uri: app_config.API_URI.replace(/^http/, "ws"),
      options: {
        reconnect: true,
        connectionParams: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken") || ""}`,
        },
      },
    })
  : null;

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Use split for proper "routing" of requests
const splitLink = wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      authLink.concat(httpLink)
    )
  : authLink.concat(httpLink);

function createApolloClient() {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo() {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}
