import { PrismaTagRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '@web/di/tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';

export const PrismaTagRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.TagRepository,
  useFactory: (client: PrismaClient) => new PrismaTagRepository(client),
  inject: [DatabaseDITokens.PrismaClient],
};