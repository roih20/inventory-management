export interface PaginatedResult<T> extends PaginationMetadata {
  data: T[];
}

export interface PaginationMetadata {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalElements: number;
  numberOfElements: number;
  currentPage: number;
  totalPages: number;
}
