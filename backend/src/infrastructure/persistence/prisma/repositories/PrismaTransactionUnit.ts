import { IsolationLevel } from '@cloneoverflow/common';
import { Unit, UnitOfWork } from '@common/repository/UnitOfWork';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaAnswerRepository } from './PrismaAnswerRepository';
import { PrismaAnswerVoterRepository } from './PrismaAnswerVoterRepository';
import { PrismaQuestionRepository } from './PrismaQuestionRepository';
import { PrismaQuestionVoterRepository } from './PrismaQuestionVoterRepository';
import { PrismaTagRepository } from './PrismaTagRepository';
import { PrismaUserRepository } from './PrismaUserRepository';

const isolationMapper: Record<IsolationLevel, Prisma.TransactionIsolationLevel> = {
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
};

export class PrismaTransactionUnit implements UnitOfWork  {
  constructor (
    private prisma: PrismaClient,
  ) {}

  executeFn<I> (
    fn: (unit: Unit) => Promise<I>, 
    isolationLevel=IsolationLevel.ReadCommitted,
  ): Promise<I> {
    return this.prisma.$transaction((context) => {
      const unit: Unit = {
        userRepository: new PrismaUserRepository(context as PrismaClient),
        questionRepository: new PrismaQuestionRepository(context as PrismaClient),
        answerRepository: new PrismaAnswerRepository(context as PrismaClient),
        tagRepository: new PrismaTagRepository(context as PrismaClient),
        questionVoterRepository: new PrismaQuestionVoterRepository(context as PrismaClient),
        answerVoterRepository: new PrismaAnswerVoterRepository(context as PrismaClient),
      };
      return fn(unit);
    }, {
      isolationLevel: isolationMapper[isolationLevel],
      maxWait: 5000,
      timeout: 10000,
    });
  }

  async executeSeq (
    fn: (unit: Unit) => Promise<unknown>[], 
    isolationLevel=IsolationLevel.ReadCommitted,
  ): Promise<void> {
    return this.prisma.$transaction(async (context) => {
      const unit: Unit = {
        userRepository: new PrismaUserRepository(context as PrismaClient),
        questionRepository: new PrismaQuestionRepository(context as PrismaClient),
        answerRepository: new PrismaAnswerRepository(context as PrismaClient),
        tagRepository: new PrismaTagRepository(context as PrismaClient),
        questionVoterRepository: new PrismaQuestionVoterRepository(context as PrismaClient),
        answerVoterRepository: new PrismaAnswerVoterRepository(context as PrismaClient),
      };

      await Promise.all(fn(unit));
    }, {
      isolationLevel: isolationMapper[isolationLevel],
      maxWait: 5000,
      timeout: 10000,
    }); 
  }
}