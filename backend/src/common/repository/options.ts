export interface RepositoryOptions<Include = unknown, Count = unknown, OrderBy = unknown> {
  include?: Include;
  count?: Count,
  orderBy?: OrderBy | OrderBy[];
}

export interface RepositoryFindManyOptions<Include = unknown, Count = unknown, OrderBy = unknown> {
  include?: Include;
  count?: Count;
  offset?: number;
  take?: number;
  orderBy?: OrderBy | OrderBy[];
}