import { graphql, GraphQLSchema } from 'graphql';

import { createTestSchema } from './createSchema';

let schema: GraphQLSchema;

interface Props {
  source: string;
  variableValues?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
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
        user: {
          userId
        }
      },
      jwtPayload: {
        userId
      }
    }
  });
};
