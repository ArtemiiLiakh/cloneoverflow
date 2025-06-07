import { prismaDatabase } from '@infrastructure/databases/PrismaDatabase';
import { Provider } from '@nestjs/common';
import { DatabaseDITokens } from '../../tokens/DatabaseDITokens';

export const PrismaProvider: Provider = {
  provide: DatabaseDITokens.PrismaClient,
  useFactory: async () => {
    await prismaDatabase.connect();
    return prismaDatabase.getClient();
  },
};