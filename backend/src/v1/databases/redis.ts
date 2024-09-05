import { CacheDatabase, SetOptions } from "@/v1/types/database/CacheDatabase";
import { SingletonDecorator } from '@/v1/utils/decorators/SignletonDecorator';
import { createClient, RedisClientType } from 'redis';

@SingletonDecorator
export class RedisDatabase implements CacheDatabase {
  private client: RedisClientType;

  connect(url: string) {
    this.client = createClient({ url });

    return this.client.connect();
  }

  disconnect() {
    return this.client.disconnect();
  }

  clearAll() {
    return this.client.flushDb();
  }

  getString(key: string) {
    return this.client.get(key);
  }

  setString(key: string, value: string, opt?: SetOptions) {
    const redisOpt = { PX: opt?.expireAt };

    if (opt?.exist) {
      return this.client.set(key, value, {
        ...redisOpt, 
        XX: true,
      });
    }

    if (opt?.notExist) {
      return this.client.set(key, value, {
        ...redisOpt, 
        NX: true,
      });
    }

    return this.client.set(key, value, redisOpt);
  }

  async getObject<T>(key: string): Promise<T | null> {
    const objString = await this.client.get(key);
    return objString ? JSON.parse(objString) : null;
  }

  setObject<T>(key: string, value: T, opt: SetOptions) {
    return this.setString(key, JSON.stringify(value), opt);
  }

  delete(key: string) {
    return this.client.del(key);
  }
}