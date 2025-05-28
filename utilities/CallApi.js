import { initializeApollo } from "./appolloClient";

export async function CallApi(operation, query, variables) {

  const client = initializeApollo();
  let resultData = {};

  if (operation === "query") {
    await client
      .query({
        query: query,
        variables: variables,
        fetchPolicy: "no-cache",
      })
      .then((data) => {
        //console.log('data',data); 
        resultData = data;
      })
      .catch((err) => {
        console.log('Apollo client error', err);
        resultData = null;
      });
  } else {
    console.log('operation', operation);
    await client
      .mutate({
        mutation: query,
        variables: variables
      })
      .then((data) => {
        //console.log('data',data); 
        resultData = data;
      })
      .catch((err) => {
        console.log('Apollo client error', err);
        resultData = null;
      });
  }


  return resultData;
}
