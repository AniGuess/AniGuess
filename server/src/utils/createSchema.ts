import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { AuthenticationChecker } from '../helpers/AuthChecker';
import { AuthResolver } from '../modules/auth/resolvers/AuthResolver';
import { HomeResolver } from '../modules/home/resolvers/HomeResolver';

const resolvers = [
  // does not work for the moment being, so we're importing Resolvers manually
  // __dirname +
  //     `../../modules/*/resolvers/*.${process.env.NODE_ENV === 'production' ? 'js' : 'ts'}`
  HomeResolver,
  AuthResolver
] as const;

export const createSchema = async (): Promise<GraphQLSchema> => {
  return await buildSchema({
    resolvers: resolvers,
    authChecker: AuthenticationChecker
  });
};

export const createTestSchema = async (): Promise<GraphQLSchema> => {
  return await buildSchema({
    resolvers: resolvers,
    authChecker: AuthenticationChecker
  });
};
