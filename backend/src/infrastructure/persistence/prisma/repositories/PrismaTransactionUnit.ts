import { Exception, IsolationLevel } from '@cloneoverflow/common';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaAnswerRepository } from './PrismaAnswerRepository';
import { PrismaAnswerUserRepository } from './PrismaAnswerUserRepository';
import { PrismaQuestionRepository } from './PrismaQuestionRepository';
import { PrismaQuestionUserRepository } from './PrismaQuestionUserRepository';
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

  execute<I> (
    fn: (unit: Unit) => Promise<I>, 
    isolationLevel=IsolationLevel.ReadCommitted,
  ): Promise<I> {
    return this.prisma.$transaction(async (context) => {
      const prismaSession: Unit = {
        userRepository: new PrismaUserRepository(context as PrismaClient),
        questionRepository: new PrismaQuestionRepository(context as PrismaClient),
        questionUserRepository: new PrismaQuestionUserRepository(context as PrismaClient),
        answerRepository: new PrismaAnswerRepository(context as PrismaClient),
        answerUserRepository: new PrismaAnswerUserRepository(context as PrismaClient),
        tagRepository: new PrismaTagRepository(context as PrismaClient),
      };
      try {
        return fn(prismaSession);
      }
      catch (err) {
        console.log(err);
        await context.$queryRaw`ROLLBACK`;
        throw new Exception('Unit of work failed');
      }
    }, {
      isolationLevel: isolationMapper[isolationLevel],
      maxWait: 5000,
      timeout: 10000,
    });
  }

  executeAll (
    fn: (unit: Unit) => Promise<unknown>[], 
    isolationLevel=IsolationLevel.ReadCommitted,
  ): Promise<void> {
    return this.prisma.$transaction(async (context) => {
      const prismaSession: Unit = {
        userRepository: new PrismaUserRepository(context as PrismaClient),
        questionRepository: new PrismaQuestionRepository(context as PrismaClient),
        questionUserRepository: new PrismaQuestionUserRepository(context as PrismaClient),
        answerRepository: new PrismaAnswerRepository(context as PrismaClient),
        answerUserRepository: new PrismaAnswerUserRepository(context as PrismaClient),
        tagRepository: new PrismaTagRepository(context as PrismaClient),
      };

      try {
        await Promise.all(fn(prismaSession));
      } 
      catch (err) {
        console.log(err);
        await context.$queryRaw`ROLLBACK`;
        throw new Exception('Unit of work failed');
      };
    }, {
      isolationLevel: isolationMapper[isolationLevel],
      maxWait: 5000,
      timeout: 10000,
    });
  }
}