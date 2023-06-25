import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { compare } from 'bcrypt';
import { LoginInput } from '../types/LoginInput.js';
import { LogAccess } from '../../../middlewares/LogAccess.js';
import { ResolveTime } from '../../../middlewares/ResolveTime.js';
import { User } from '../../../db/entities/User.js';
import { IContext } from '../../../types/Context.js';

@Resolver()
export class AuthResolver {
  @Mutation(() => User, { nullable: true })
  @UseMiddleware(LogAccess, ResolveTime)
  async login(
    @Arg('data') { username, password }: LoginInput,
    @Ctx() { req }: IContext
  ): Promise<User | null> {
    const user = await User.findOne({
      where: { username }
    });

    if (!user) {
      return null;
    }

    if (!(await compare(password, user.password))) {
      return null;
    }

    req.session.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(LogAccess, ResolveTime)
  logout(@Ctx() { req, res }: IContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) {
          console.error(err);
          return reject(false);
        }
        res.clearCookie('sid');
        resolve(true);
      });
    });
  }
}
