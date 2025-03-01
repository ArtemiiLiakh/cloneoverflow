import { redisDatabase } from '@application/databases/RedisDatabase';
import { Provider } from '@nestjs/common';
import { DatabaseDITokens } from '../../tokens/DatabaseDITokens';

export const RedisProvider: Provider = {
  provide: DatabaseDITokens.RedisClient,
  useFactory: async () => {
    await redisDatabase.connect();
    return redisDatabase.getClient();
  },
};