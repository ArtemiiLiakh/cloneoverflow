import { CacheRepository, CacheSetOptions } from '@application/cache/CacheRepository';
import { RedisClientType, RedisFunctions, RedisModules, RedisScripts, SetOptions } from 'redis';

export class RedisCacheRepository<
  M extends RedisModules, 
  F extends RedisFunctions, 
  S extends RedisScripts,
> implements CacheRepository {
  constructor (
    private client: RedisClientType<M, F, S>,
  ) {}

  async setString (key: string, value: string, opt?: CacheSetOptions): Promise<void> {
    const options: SetOptions = {
      EX: opt?.ttl,
    };

    options.XX = opt?.ifExist ? true : undefined;
    options.NX = opt?.ifNotExist ? true : undefined;

    await this.client.SET(key, value, options);
  }

  async getString (key: string): Promise<string | null> {
    return this.client.GET(key);
  }

  async setObject<T> (key: string, value: T, opt?: CacheSetOptions): Promise<void> {
    const options: SetOptions = {
      EX: opt?.ttl,
    };

    options.XX = opt?.ifExist ? true : undefined;
    options.NX = opt?.ifNotExist ? true : undefined;

    await this.client.SET(key, JSON.stringify(value), options);
  }

  async getObject<T> (key: string): Promise<T | null> {
    const value = await this.client.GET(key);
    
    if (!value) return null;
    return JSON.parse(value);
  }

  async delete (key: string): Promise<void> {
    await this.client.DEL(key);
  }

  async clear (): Promise<void> {
    await this.client.FLUSHALL();
  }
}