import { redisDatabase } from '@application/database/RedisDatabase';
import { RedisCacheRepository } from '@infrastructure/persistance/redis/RedisCacheRepository';

export default new RedisCacheRepository(redisDatabase.getClient());