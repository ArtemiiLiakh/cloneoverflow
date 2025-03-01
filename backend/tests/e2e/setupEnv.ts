import { prismaDatabase } from '@application/databases/PrismaDatabase';
import { redisDatabase } from '@application/databases/RedisDatabase';

beforeAll(async () => {
  await redisDatabase.connect();
  await prismaDatabase.connect();

  const prisma = prismaDatabase.getClient();
  const redis = redisDatabase.getClient();

  await prisma.tag.deleteMany();
  await prisma.question.deleteMany();
  await prisma.userCreds.deleteMany();
  await redis.FLUSHALL();

  await redisDatabase.disconnect();
  await prismaDatabase.disconnect();

});

afterAll(async () => {
  await redisDatabase.disconnect();
  await prismaDatabase.disconnect();
});