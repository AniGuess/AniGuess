import { ObjectType } from 'type-graphql';
import { Opening } from '../../../db/entities/Opening';
import { PaginatedResponse } from '../../../types/PaginatedResponse';

@ObjectType()
export class GetOpeningsOutput extends PaginatedResponse(Opening) {}
