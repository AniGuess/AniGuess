import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { AbstractEntity } from './AbstractEntity.js';

@ObjectType()
@Entity('openings')
export class Opening extends AbstractEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  youtubeUrl: string;

  @Field(() => [String])
  @Column('text', { array: true })
  keywords: string[];

  @Field()
  @Column()
  imageUrl: string;
}
