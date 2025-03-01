import { PrismaTagRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '../../../tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '../../../tokens/persistence/RepositoryDITokens';

export const PrismaTagRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.TagRepository,
  useFactory: (client: PrismaClient) => new PrismaTagRepository(client),
  inject: [DatabaseDITokens.PrismaClient],
};