import { Field, InputType } from 'type-graphql';
import { AddOpeningInput } from './AddOpeningInput.js';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateOpeningInput extends AddOpeningInput {
  @Field()
  @IsNotEmpty()
  id: number;
}
