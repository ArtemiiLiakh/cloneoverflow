import { PrismaQuestionUserRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '../../../tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '../../../tokens/persistence/RepositoryDITokens';

export const PrismaQuestionUserRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.QuestionUserRepository,
  useFactory: (client: PrismaClient) => new PrismaQuestionUserRepository(client),
  inject: [DatabaseDITokens.PrismaClient],
};