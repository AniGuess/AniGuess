import { ObjectType } from 'type-graphql';
import { Opening } from '../../../db/entities/Opening.js';
import { PaginatedResponse } from '../../../types/PaginatedResponse.js';

@ObjectType()
export class GetOpeningsOutput extends PaginatedResponse(Opening) {}
