import { prismaDatabase } from '@infrastructure/databases/PrismaDatabase';
import { redisDatabase } from '@infrastructure/databases/RedisDatabase';
import { clearDatabase } from '@tests/utils/clearDatabase';

beforeAll(async () => {
  const prisma = prismaDatabase.getClient();
  const redis = redisDatabase.getClient();
  
  await Promise.all([
    redisDatabase.connect(),
    prismaDatabase.connect(),
  ]); 
  
  await clearDatabase(prisma, redis);
  
  await Promise.all([
    redisDatabase.disconnect(),
    prismaDatabase.disconnect(),
  ]); 
});

afterAll(async () => {
  await Promise.all([
    redisDatabase.disconnect().catch(() => {}),
    prismaDatabase.disconnect().catch(() => {}),
  ]);
});