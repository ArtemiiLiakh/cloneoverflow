import { PrismaAnswerRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '@web/di/tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';

export const PrismaAnswerRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.AnswerRepository,
  useFactory: (client: PrismaClient) => new PrismaAnswerRepository(client),
  inject: [DatabaseDITokens.PrismaClient],
};