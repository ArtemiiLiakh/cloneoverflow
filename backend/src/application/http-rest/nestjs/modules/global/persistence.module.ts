import { Global, Module } from '@nestjs/common';
import { JSONUserRatingSystemProvider } from '../../di/providers/persistence/JSONUserRatingSystemProvider';
import {
  PrismaAnswerRepositoryProvider,
  PrismaQuestionRepositoryProvider,
  PrismaTagRepositoryProvider,
  PrismaTransactionRepositoryProvider,
  PrismaUserRepositoryProvider,
} from '../../di/providers/persistence/prisma';
import { RedisCacheRepositoryProvider } from '../../di/providers/persistence/redis';
import { DatabaseModule } from './database.module';
import { PrismaAnswerVoterRepositoryProvider } from '../../di/providers/persistence/prisma/AnswerVoterRepositoryProvider';
import { PrismaQuestionVoterRepositoryProvider } from '../../di/providers/persistence/prisma/QuestionVoterRepositoryProvider';

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

    RedisCacheRepositoryProvider,
    JSONUserRatingSystemProvider,
  ],
  imports: [DatabaseModule],
})
export class PersistenceModule {}