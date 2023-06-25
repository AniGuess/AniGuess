import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import express from 'express';
import http from 'http';
import cors from 'cors';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { createSchema } from './utils/createSchema.js';
import { createAppDataSource } from './utils/createDataSource.js';
import { createAdmin } from './createAdmin.js';
import { redisClient } from './redis.js';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';

const main = async () => {
  const dataSource = createAppDataSource();
  await dataSource.initialize();

  if (process.env.CREATE_ADMIN) {
    await createAdmin();
  }

  const schema = await createSchema();

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true
  });
  await server.start();

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

  app.use(
    '/graphql',
    express.json(),
    express.urlencoded({ extended: true }),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res })
    })
  );

  const PORT = Number(process.env.PORT) || 4000;

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
};

main();
