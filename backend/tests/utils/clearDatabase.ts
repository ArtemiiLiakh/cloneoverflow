import { PrismaClient } from '@prisma/client';
import { RedisClientType } from 'redis';

export const clearDatabase = (prisma: PrismaClient, redis: RedisClientType) => {
  return Promise.all([
    prisma.tag.deleteMany(),
    prisma.question.deleteMany(),
    prisma.userCreds.deleteMany(),
    redis.FLUSHALL(),
  ]);
}