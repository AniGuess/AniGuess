import { ClassType, Field, ObjectType } from 'type-graphql';

export interface IPaginatedResponse<T> {
  results: T[];
  hasMore: boolean;
  lastId: number | null;
}

export const PaginatedResponse = <T>(TClass: ClassType<T>) => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResults {
    @Field(() => [TClass])
    results: T[];

    @Field()
    hasMore: boolean;

    @Field(() => Number, { nullable: true })
    lastId?: number | null;
  }
  return PaginatedResults;
};
