export interface CacheSetOptions  {
  ttl?: number;
  ifExist?: true;
  ifNotExist?: true,
}

export interface CacheRepository {
  setString(key: string, value: string, opt?: CacheSetOptions): Promise<void>;
  getString(key: string): Promise<string | null>;
  
  setObject<T>(key: string, value: T, opt?: CacheSetOptions): Promise<void>;
  getObject<T>(key: string): Promise<T | null>;

  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}