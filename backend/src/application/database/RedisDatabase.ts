import config from '@/config';
import { RedisClientType, createClient } from 'redis';

class RedisDatabase {
  private client: RedisClientType;

  async connect () {
    this.client = createClient({
      url: config.REDIS_URL,
      database: 0,
    });

    await this.client.connect();
  }

  getClient () {
    return this.client;
  }
}

export const redisDatabase = new RedisDatabase();