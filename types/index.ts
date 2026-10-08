export type Maybe<T> = T | null | undefined;

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore?: boolean;
};

export type Option = {
  id: string | number;
  name: string;
};
