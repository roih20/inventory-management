export interface PaginatedResult<T> {
  data: T[];
  numberOfElements: number;
  totalElements: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
