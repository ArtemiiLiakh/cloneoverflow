import { prismaDatabase } from '@application/databases/PrismaDatabase';
import { redisDatabase } from '@application/databases/RedisDatabase';
import { JSONUserRatingSystemDI } from '@application/di/security/ratingSystem/JSONUserRatingSystemDI';
import config from './config';

(async () => {
  await prismaDatabase.connect();
  await redisDatabase.connect();
  await JSONUserRatingSystemDI.readFile();
  
  const { app } = await import('@/application/http-rest/server');

  app.listen(config.SERVER_PORT, () => {
    console.log('Started on http://127.0.0.1:8000');
  });
})();
