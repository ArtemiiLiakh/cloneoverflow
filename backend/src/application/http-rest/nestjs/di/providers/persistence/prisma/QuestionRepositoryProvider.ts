import { PrismaQuestionRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '../../../tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '../../../tokens/persistence/RepositoryDITokens';

export const PrismaQuestionRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.QuestionRepository,
  useFactory: (client: PrismaClient) => new PrismaQuestionRepository(client),
  inject: [DatabaseDITokens.PrismaClient], 
};