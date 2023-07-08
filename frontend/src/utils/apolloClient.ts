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
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, link])
});
