import { PrismaUserRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '../../../tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '../../../tokens/persistence/RepositoryDITokens';

export const PrismaUserRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.UserRepository,
  useFactory: (client: PrismaClient) => new PrismaUserRepository(client),
  inject: [DatabaseDITokens.PrismaClient],
};