import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { LoginInput } from '../types/LoginInput';
import { compare } from 'bcrypt';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';
import { User } from '../../../db/entities/User';
import { IContext } from '../../../interfaces/Context';

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
          console.log(err);
          return reject(false);
        }
        res.clearCookie('sid');
        resolve(true);
      });
    });
  }
}
