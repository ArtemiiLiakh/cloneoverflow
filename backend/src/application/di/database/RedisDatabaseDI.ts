import { redisDatabase } from '@application/databases/RedisDatabase';

export const RedisDatabaseDI = redisDatabase.getClient();