import { createClient } from 'redis';

export const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => {
  console.error('[Redis Error]', err);
  process.exit(1);
});
