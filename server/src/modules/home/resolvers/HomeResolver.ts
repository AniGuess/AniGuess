import { Authorized, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { IContext } from '../../../types/Context.js';
import { LogAccess } from '../../../middlewares/LogAccess.js';
import { ResolveTime } from '../../../middlewares/ResolveTime.js';
import { User } from '../../../db/entities/User.js';

@Resolver()
export class HomeResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  @UseMiddleware(LogAccess, ResolveTime)
  async me(@Ctx() { req }: IContext): Promise<User | null> {
    console.log(req.session.userId);
    if (!req.session.userId) {
      return null;
    }
    return await User.findOne({ where: { id: req.session.userId } });
  }
}
