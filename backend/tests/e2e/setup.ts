import { prismaDatabase } from '@application/databases/PrismaDatabase';

(async () => {
  await prismaDatabase.connect();
})();
