import { AbstractEntity } from '../db/entities/AbstractEntity.js';
import { IPaginatedResponse } from '../types/PaginatedResponse.js';
import { PaginationInput } from '../types/PaginationInput.js';

export const formatPagination = <T extends AbstractEntity>(
  results: T[],
  { limit }: Pick<PaginationInput, 'limit'>
): IPaginatedResponse<T> => {
  const hasMore = results.length >= limit;
  const lastId = results.length ? results[results.length - 1].id : null;
  return {
    results,
    hasMore,
    lastId
  };
};
