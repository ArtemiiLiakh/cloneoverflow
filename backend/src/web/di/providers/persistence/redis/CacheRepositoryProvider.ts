import { RedisCacheRepository } from '@infrastructure/persistence/cache/RedisCacheRepository';
import { Provider } from '@nestjs/common';
import { DatabaseDITokens } from '@web/di/tokens/DatabaseDITokens';
import { RedisRepositoryDITokens } from '@web/di/tokens/persistence';
import { RedisClientType } from 'redis';

export const RedisCacheRepositoryProvider: Provider = {
  provide: RedisRepositoryDITokens.CacheRepository,
  useFactory: (client: RedisClientType) => new RedisCacheRepository(client),
  inject: [DatabaseDITokens.RedisClient],
};