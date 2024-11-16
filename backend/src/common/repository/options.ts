export interface RepositoryOptions<Select=unknown, Include = unknown, Count = unknown, OrderBy = unknown> {
  select?: Select;
  include?: Include;
  count?: Count,
  orderBy?: OrderBy | OrderBy[];
}

export interface RepositoryFindManyOptions<Select, Include = unknown, Count = unknown, OrderBy = unknown> {
  select?: Select;
  include?: Include;
  count?: Count;
  offset?: number;
  take?: number;
  orderBy?: OrderBy | OrderBy[];
}