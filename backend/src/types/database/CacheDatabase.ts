export interface SetOptions  {
  expireAt?: number;
  exist?: true;
  notExist?: true,
}

export interface CacheDatabase {
  setString(key: string, value: string, opt?: SetOptions);
  getString(key: string): Promise<string | null>;
  
  setObject<T>(key: string, value: T, opt?: SetOptions);
  getObject<T>(key: string): Promise<T | null>;

  delete(key: string);
}