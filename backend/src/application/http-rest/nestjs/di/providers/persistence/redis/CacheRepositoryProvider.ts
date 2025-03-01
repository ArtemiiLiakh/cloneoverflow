import { RedisCacheRepository } from '@infrastructure/persistence/cache/RedisCacheRepository';
import { Provider } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { DatabaseDITokens } from '../../../tokens/DatabaseDITokens';
import { RedisRepositoryDITokens } from '../../../tokens/persistence/RepositoryDITokens';

export const RedisCacheRepositoryProvider: Provider = {
  provide: RedisRepositoryDITokens.CacheRepository,
  useFactory: (client: RedisClientType) => new RedisCacheRepository(client),
  inject: [DatabaseDITokens.RedisClient],
};