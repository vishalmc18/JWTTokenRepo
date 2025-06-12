import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "../utilities/appolloClient";

export default function App({ Component, pageProps }) {
  const apolloClient = initializeApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}