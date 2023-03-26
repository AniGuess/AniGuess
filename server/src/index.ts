import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import Express from 'express';
import cors from 'cors';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { createSchema } from './utils/createSchema';
import { createAppDataSource } from './utils/createDataSource';
import { IContext } from './types/Context';
import { createAdmin } from './createAdmin';
import { redisClient } from './redis';

const main = async () => {
  const dataSource = createAppDataSource();
  await dataSource.initialize();

  if (process.env.CREATE_ADMIN) {
    await createAdmin();
  }

  const app = Express();

  const schema = await createSchema();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        const origins = String(process.env.CORS_ORIGIN).split(',');
        if (!origin || origins.includes(String(origin))) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      }
    })
  );
  app.use(
    session({
      name: 'sid',
      secret: String(process.env.SESSION_SECRET),
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        sameSite: 'lax'
      },
      resave: false,
      saveUninitialized: false
    })
  );

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: IContext) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

main();
