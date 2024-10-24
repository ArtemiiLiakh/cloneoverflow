import { redisDatabase } from "@app/database/RedisDatabase";
import { RedisCacheRepository } from "@infra/persistance/redis/RedisCacheRepository";

export default new RedisCacheRepository(redisDatabase.getClient());