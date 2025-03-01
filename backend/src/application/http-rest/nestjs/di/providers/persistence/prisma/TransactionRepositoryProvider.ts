import { PrismaTransactionUnit } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '../../../tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '../../../tokens/persistence/RepositoryDITokens';

export const PrismaTransactionRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.UnitOfWork,
  useFactory: (client: PrismaClient) => new PrismaTransactionUnit(client),
  inject: [DatabaseDITokens.PrismaClient],
};