import { PrismaAnswerUserRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '../../../tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '../../../tokens/persistence/RepositoryDITokens';

export const PrismaAnswerUserRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.AnswerUserRepository,
  useFactory: (client: PrismaClient) => new PrismaAnswerUserRepository(client),
  inject: [DatabaseDITokens.PrismaClient],
};