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

  const corsOptions: cors.CorsOptions = {
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : (origin, callback) => {
            callback(null, origin);
          }
  };
  app.use(cors(corsOptions));

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
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql', cors: false });

  const PORT = process.env.PORT || 4000;

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

main();
