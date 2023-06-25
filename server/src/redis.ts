import { Redis } from 'ioredis';

export const redisClient = new Redis(
  Number(process.env.REDIS_PORT),
  String(process.env.REDIS_HOST)
);
