import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ response }) => {
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
