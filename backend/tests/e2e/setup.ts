import { prismaDatabase } from '@application/databases/PrismaDatabase';
import { JSONUserRatingSystemDI } from '@application/di/security/ratingSystem/JSONUserRatingSystemDI';

(async () => {
  await prismaDatabase.connect();
  await JSONUserRatingSystemDI.readFile();
})();
