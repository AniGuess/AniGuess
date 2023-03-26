import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

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
