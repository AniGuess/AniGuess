import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { AuthenticationChecker } from '../helpers/AuthChecker.js';
import { AuthResolver } from '../modules/auth/resolvers/AuthResolver.js';
import { HomeResolver } from '../modules/home/resolvers/HomeResolver.js';
import { OpeningResolver } from '../modules/opening/resolvers/OpeningResolver.js';

const resolvers = [
  // does not work for the moment being, so we're importing Resolvers manually
  // __dirname +
  //     `../../modules/*/resolvers/*.${process.env.NODE_ENV === 'production' ? 'js' : 'ts'}`
  HomeResolver,
  AuthResolver,
  OpeningResolver
] as const;

export const createSchema = async (): Promise<GraphQLSchema> => {
  return await buildSchema({
    resolvers: resolvers,
    authChecker: AuthenticationChecker,
    validate: {
      whitelist: true,
      validationError: {
        target: true,
        value: false
      }
    }
  });
};

export const createTestSchema = async (): Promise<GraphQLSchema> => {
  return await buildSchema({
    resolvers: resolvers,
    authChecker: AuthenticationChecker,
    validate: {
      whitelist: true,
      validationError: {
        target: true,
        value: false
      },
      forbidUnknownValues: false
    }
  });
};
