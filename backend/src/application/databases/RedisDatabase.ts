import config from '@/config';
import { createClient, RedisClientType } from 'redis';

class RedisDatabase {
  private client: RedisClientType;

  constructor () {
    this.client = createClient({
      url: config.REDIS_URL,
      database: 0,
    });
  }

  async connect () {
    await this.client.connect();
  }
  
  getClient () {
    return this.client;
  }

  async disconnect ()   {
    await this.client.disconnect();
  }
}

export const redisDatabase = new RedisDatabase();