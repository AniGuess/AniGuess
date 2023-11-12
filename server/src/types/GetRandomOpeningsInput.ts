import { IsNumber, IsOptional, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class GetRandomOpeningsInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit = 10;
}
