import { prismaDatabase } from '@application/databases/PrismaDatabase';
import { redisDatabase } from '@application/databases/RedisDatabase';
import config from './config';

(async () => {
  await prismaDatabase.connect();
  await redisDatabase.connect();
  
  const { app } = await import('@/application/http-rest/server');

  app.listen(config.SERVER_PORT, () => {
    console.log('Started on http://127.0.0.1:8000');
  });
})();
