import { Authorized, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { IContext } from '../../../types/Context';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';
import { User } from '../../../db/entities/User';

@Resolver()
export class HomeResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  @UseMiddleware(LogAccess, ResolveTime)
  async me(@Ctx() { req }: IContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    return await User.findOne({ where: { id: req.session.userId } });
  }
}
