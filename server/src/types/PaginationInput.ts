import { IsNumber, IsOptional, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class PaginationInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit = 10;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  cursor?: number | undefined;
}
