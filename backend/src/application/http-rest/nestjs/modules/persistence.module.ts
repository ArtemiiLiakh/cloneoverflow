import { Global, Module } from '@nestjs/common';
import { JSONUserRatingSystemProvider } from '../di/providers/persistence/JSONUserRatingSystemProvider';
import {
  PrismaAnswerRepositoryProvider,
  PrismaAnswerUserRepositoryProvider,
  PrismaQuestionRepositoryProvider,
  PrismaQuestionUserRepositoryProvider,
  PrismaTagRepositoryProvider,
  PrismaTransactionRepositoryProvider,
  PrismaUserRepositoryProvider,
} from '../di/providers/persistence/prisma';
import { RedisCacheRepositoryProvider } from '../di/providers/persistence/redis';
import { DatabaseModule } from './database.module';

@Global()
@Module({
  providers: [
    PrismaAnswerRepositoryProvider,
    PrismaAnswerUserRepositoryProvider,
    PrismaQuestionRepositoryProvider,
    PrismaQuestionUserRepositoryProvider,
    PrismaTagRepositoryProvider,
    PrismaTransactionRepositoryProvider,
    PrismaUserRepositoryProvider,

    RedisCacheRepositoryProvider,

    JSONUserRatingSystemProvider,
  ],
  exports: [
    PrismaAnswerRepositoryProvider,
    PrismaAnswerUserRepositoryProvider,
    PrismaQuestionRepositoryProvider,
    PrismaQuestionUserRepositoryProvider,
    PrismaTagRepositoryProvider,
    PrismaTransactionRepositoryProvider,
    PrismaUserRepositoryProvider,

    RedisCacheRepositoryProvider,

    JSONUserRatingSystemProvider,
  ],
  imports: [DatabaseModule],
})
export class PersistenceModule {}