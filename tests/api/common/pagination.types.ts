export type PagedInfo = {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
};

export type PagedResponse<T> = {
  pagedInfo: PagedInfo;
  value: T[];
};