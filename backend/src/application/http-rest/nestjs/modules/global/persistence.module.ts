import { Global, Module } from '@nestjs/common';
import { JSONUserRatingSystemProvider } from '../../di/providers/persistence/JSONUserRatingSystemProvider';
import {
  PrismaAnswerRepositoryProvider,
  PrismaAnswerVoterRepositoryProvider,
  PrismaFavoriteQuestionRepositoryProvider,
  PrismaQuestionRepositoryProvider,
  PrismaQuestionVoterRepositoryProvider,
  PrismaTagRepositoryProvider,
  PrismaTransactionRepositoryProvider,
  PrismaUserRepositoryProvider,
} from '../../di/providers/persistence/prisma';
import { RedisCacheRepositoryProvider } from '../../di/providers/persistence/redis';
import { DatabaseModule } from './database.module';

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