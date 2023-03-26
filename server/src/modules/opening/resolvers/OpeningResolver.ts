import { Arg, Authorized, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';
import { AddOpeningInput } from '../types/AddOpeningInput';
import { Opening } from '../../../db/entities/Opening';
import { PaginationInput } from '../../../types/PaginationInput';
import { MoreThan } from 'typeorm';
import { formatPagination } from '../../../utils/formatPagination';
import { GetOpeningsOutput } from '../types/GetOpeningsOutput';

@Resolver()
export class OpeningResolver {
  @Query(() => GetOpeningsOutput)
  @UseMiddleware(LogAccess, ResolveTime)
  async getOpenings(
    @Arg('data', { nullable: true }) pagination?: PaginationInput
  ): Promise<GetOpeningsOutput> {
    const limit = pagination?.limit ?? 10;
    const cursor = pagination?.cursor;
    const openings = await Opening.find({
      where: {
        id: cursor ? MoreThan(cursor) : undefined
      },
      order: {
        id: 'ASC'
      },
      take: limit
    });

    return formatPagination(openings, { limit });
  }

  @Authorized()
  @Mutation(() => Opening)
  @UseMiddleware(LogAccess, ResolveTime)
  async addOpening(
    @Arg('data') { title, imageUrl, keywords, youtubeUrl }: AddOpeningInput
  ): Promise<Opening> {
    const opening = new Opening();
    opening.title = title;
    opening.imageUrl = imageUrl;
    opening.keywords = keywords;
    opening.youtubeUrl = youtubeUrl;

    await opening.save();

    return opening;
  }
}
