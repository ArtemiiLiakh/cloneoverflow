import { prismaDatabase } from '@application/databases/PrismaDatabase';
import { redisDatabase } from '@application/databases/RedisDatabase';
import { EmailProvider } from '@application/interfaces/email/EmailProvider';

beforeAll(async () => {
  await redisDatabase.connect();
  await prismaDatabase.connect();
  
  jest.mock('@application/di/email/GoogleEmailProviderDI', () => ({
    GoogleEmailProviderDI: {
      sendEmail: jest.fn(),
    } as EmailProvider,
  }));

  const prisma = prismaDatabase.getClient();

  await prisma.tag.deleteMany();
  await prisma.question.deleteMany();
  await prisma.userCreds.deleteMany();
});

afterAll(async () => {
  await redisDatabase.disconnect();
  await prismaDatabase.disconnect();
});