import { Global, Module } from '@nestjs/common';
import { JSONUserRatingSystemProvider } from '@web/di/providers/persistence/JSONUserRatingSystemProvider';
import { RedisCacheRepositoryProvider } from '@web/di/providers/persistence/redis';
import { DatabaseModule } from './database.module';

import {
  PrismaAnswerRepositoryProvider,
  PrismaAnswerVoterRepositoryProvider,
  PrismaFavoriteQuestionRepositoryProvider,
  PrismaQuestionRepositoryProvider,
  PrismaQuestionVoterRepositoryProvider,
  PrismaTagRepositoryProvider,
  PrismaTransactionRepositoryProvider,
  PrismaUserRepositoryProvider,
} from '@web/di/providers/persistence/prisma';

@Global()
@Module({
  providers: [
    PrismaAnswerRepositoryProvider,
    PrismaQuestionRepositoryProvider,
    PrismaTagRepositoryProvider,
    PrismaTransactionRepositoryProvider,
    PrismaUserRepositoryProvider,
    PrismaAnswerVoterRepositoryProvider,
    PrismaQuestionVoterRepositoryProvider,
    PrismaFavoriteQuestionRepositoryProvider,

    RedisCacheRepositoryProvider,
    JSONUserRatingSystemProvider,
  ],
  exports: [
    PrismaAnswerRepositoryProvider,
    PrismaQuestionRepositoryProvider,
    PrismaTagRepositoryProvider,
    PrismaTransactionRepositoryProvider,
    PrismaUserRepositoryProvider,
    PrismaAnswerVoterRepositoryProvider,
    PrismaQuestionVoterRepositoryProvider,
    PrismaFavoriteQuestionRepositoryProvider,

    RedisCacheRepositoryProvider,
    JSONUserRatingSystemProvider,
  ],
  imports: [DatabaseModule],
})
export class PersistenceModule {}