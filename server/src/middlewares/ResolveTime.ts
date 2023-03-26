import { MiddlewareFn } from 'type-graphql';

export const ResolveTime: MiddlewareFn = async ({ info }, next) => {
  if (process.env.NODE_ENV === 'test') return next();
  const start = Date.now();
  await next();
  const resolveTime = Date.now() - start;
  console.log(`${info.parentType.name}.${info.fieldName} [${resolveTime} ms]`);
};
