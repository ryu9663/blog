import { ApolloLink, HttpLink, concat } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}` || null,
    },
  }));

  return forward(operation);
});

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: concat(
      authMiddleware,
      new HttpLink({
        uri: "https://graphql.datocms.com/",
      })
    ),
  });
});
