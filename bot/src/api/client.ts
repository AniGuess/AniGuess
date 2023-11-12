import { Client, cacheExchange, fetchExchange } from '@urql/core';

export const client = new Client({
  url: process.env.API_URL!,
  exchanges: [cacheExchange, fetchExchange],
});
