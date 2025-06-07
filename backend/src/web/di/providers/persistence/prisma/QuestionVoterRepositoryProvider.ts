import { PrismaQuestionVoterRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '@web/di/tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';

export const PrismaQuestionVoterRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.QuestionVoterRepository,
  useFactory: (client: PrismaClient) => new PrismaQuestionVoterRepository(client),
  inject: [DatabaseDITokens.PrismaClient],
};