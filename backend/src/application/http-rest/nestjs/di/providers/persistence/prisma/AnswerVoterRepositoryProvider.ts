import { PrismaAnswerVoterRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '../../../tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '../../../tokens/persistence/RepositoryDITokens';

export const PrismaAnswerVoterRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.AnswerVoterRepository,
  useFactory: (client: PrismaClient) => new PrismaAnswerVoterRepository(client),
  inject: [DatabaseDITokens.PrismaClient],
};