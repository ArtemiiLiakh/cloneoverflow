import { PrismaFavoriteQuestionRepository } from '@infrastructure/persistence/prisma/repositories';
import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseDITokens } from '@web/di/tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';

export const PrismaFavoriteQuestionRepositoryProvider: Provider = {
  provide: PrismaRepositoryDITokens.FavoriteQuestionRepository,
  useFactory: (client: PrismaClient) => new PrismaFavoriteQuestionRepository(client),
  inject: [DatabaseDITokens.PrismaClient],
};