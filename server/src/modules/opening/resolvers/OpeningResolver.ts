import { Arg, Authorized, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { MoreThan } from 'typeorm';
import { LogAccess } from '../../../middlewares/LogAccess.js';
import { ResolveTime } from '../../../middlewares/ResolveTime.js';
import { AddOpeningInput } from '../types/AddOpeningInput.js';
import { Opening } from '../../../db/entities/Opening.js';
import { PaginationInput } from '../../../types/PaginationInput.js';
import { formatPagination } from '../../../utils/formatPagination.js';
import { GetOpeningsOutput } from '../types/GetOpeningsOutput.js';
import { GetOpeningInput } from '../types/GetOpeningInput.js';
import { UpdateOpeningInput } from '../types/UpdateOpeningInput.js';

@Resolver()
export class OpeningResolver {
  @Authorized()
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
      take: limit + 1
    });

    return formatPagination(openings, { limit });
  }

  @Authorized()
  @Query(() => Opening, { nullable: true })
  @UseMiddleware(LogAccess, ResolveTime)
  async getOpening(@Arg('data') { id }: GetOpeningInput): Promise<Opening | null> {
    return await Opening.findOne({
      where: {
        id: id
      }
    });
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

  @Authorized()
  @Mutation(() => Opening, { nullable: true })
  @UseMiddleware(LogAccess, ResolveTime)
  async updateOpening(
    @Arg('data') { id, title, imageUrl, keywords, youtubeUrl }: UpdateOpeningInput
  ): Promise<Opening | null> {
    const opening = await Opening.findOne({
      where: {
        id
      }
    });
    if (opening) {
      opening.title = title;
      opening.imageUrl = imageUrl;
      opening.keywords = keywords;
      opening.youtubeUrl = youtubeUrl;
      await opening.save();
    }

    return opening;
  }

  @Authorized()
  @Mutation(() => Opening, { nullable: true })
  @UseMiddleware(LogAccess, ResolveTime)
  async deleteOpening(@Arg('data') { id }: GetOpeningInput): Promise<Opening | null> {
    const opening = await Opening.findOne({
      where: {
        id: id
      }
    });

    if (opening) {
      await opening.softRemove();
    }
    return opening;
  }
}
