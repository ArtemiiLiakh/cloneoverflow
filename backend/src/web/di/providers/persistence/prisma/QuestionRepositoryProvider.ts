import { PrismaQuestionRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '@web/di/tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';

export const PrismaQuestionRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.QuestionRepository,
  useFactory: (client: PrismaClient) => new PrismaQuestionRepository(client),
  inject: [DatabaseDITokens.PrismaClient], 
};