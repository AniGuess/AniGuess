import { AuthChecker } from 'type-graphql';
import { User } from '../db/entities/User.js';
import { IContext } from '../types/Context.js';

export const AuthenticationChecker: AuthChecker<IContext> = async ({ context }) => {
  console.log(context.req.session);
  if (!context.req.session.userId) {
    return false;
  }

  const user = await User.findOne({ where: { id: context.req.session.userId } });

  if (!user) {
    return false;
  }

  context.user = user;
  return true;
};
