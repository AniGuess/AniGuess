import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ response }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (response) response.errors = null as any;
});

const link = createHttpLink({
  uri: process.env.API_URL,
  credentials: 'include'
});

export const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getOpenings: {
            keyArgs: false,
            merge: (existing, incoming) => {
              if (existing) {
                return { ...incoming, results: [...existing.results, ...incoming.results] };
              }
              return incoming;
            }
          }
        }
      }
    }
  }),
  link: ApolloLink.from([errorLink, link])
});
