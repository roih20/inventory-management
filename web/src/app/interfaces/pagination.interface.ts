export interface PaginatedResult<T> {
  data: T[];
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
