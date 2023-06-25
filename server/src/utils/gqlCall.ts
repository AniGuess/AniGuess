import { graphql, GraphQLSchema } from 'graphql';
import { jest } from '@jest/globals';

import { createTestSchema } from './createSchema.js';
import { Maybe } from 'graphql/jsutils/Maybe.js';

let schema: GraphQLSchema;

interface Props {
  source: string;
  variableValues?: Maybe<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }>;
  userId?: number;
}

export const gqlCall = async ({ source, variableValues, userId }: Props) => {
  if (!schema) {
    schema = await createTestSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: jest.fn()
      }
    }
  });
};
