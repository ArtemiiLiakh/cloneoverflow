import { PrismaAnswerVoterRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '@web/di/tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';

export const PrismaAnswerVoterRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.AnswerVoterRepository,
  useFactory: (client: PrismaClient) => new PrismaAnswerVoterRepository(client),
  inject: [DatabaseDITokens.PrismaClient],
};