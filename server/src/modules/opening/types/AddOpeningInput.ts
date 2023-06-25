import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddOpeningInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsUrl()
  youtubeUrl: string;

  @Field()
  @IsUrl()
  imageUrl: string;

  @Field(() => [String])
  @IsString({ each: true })
  keywords: string[];
}
