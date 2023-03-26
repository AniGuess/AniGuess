import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { timestamp } from '../../utils/timestamp';

@ObjectType()
export abstract class AbstractEntity extends BaseEntity {
  constructor() {
    super();
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: timestamp()
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: timestamp()
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: timestamp()
  })
  deletedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
