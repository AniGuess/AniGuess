import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { Field, ObjectType } from 'type-graphql';
import { AbstractEntity } from './AbstractEntity';

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
