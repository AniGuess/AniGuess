import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class GetOpeningInput {
  @Field()
  @IsNotEmpty()
  id: number;
}
