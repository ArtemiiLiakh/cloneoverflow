import { prismaDatabase } from '@application/databases/PrismaDatabase';

beforeAll(async () => {
  const prisma = prismaDatabase.getClient();
  await prisma.tag.deleteMany();
  await prisma.question.deleteMany();
  await prisma.userCreds.deleteMany();
});