import { BeforeInsert, Column, Entity } from 'typeorm';
import { hash } from 'bcrypt';
import { Field, ObjectType } from 'type-graphql';
import { AbstractEntity } from './AbstractEntity.js';

@ObjectType()
@Entity('users')
export class User extends AbstractEntity {
  @Field()
  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, Number(process.env.BCRYPT_ROUNDS) || 12);
  }
}
