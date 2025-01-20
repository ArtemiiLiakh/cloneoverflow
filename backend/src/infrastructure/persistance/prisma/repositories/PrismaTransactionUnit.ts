import { IsolationLevel } from '@cloneoverflow/common';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
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
  async execute<I> (
    fn: (unit: Unit) => Promise<I> | Promise<unknown>[], 
    isolationLevel = IsolationLevel.ReadCommitted,
  ): Promise<I | true | null> {
    return await this.prisma.$transaction(async (context) => {
      const prismaSession: Unit = {
        userRepository: new PrismaUserRepository(context as PrismaClient),
        questionRepository: new PrismaQuestionRepository(context as PrismaClient),
        questionUserRepository: new PrismaQuestionUserRepository(context as PrismaClient),
        answerRepository: new PrismaAnswerRepository(context as PrismaClient),
        answerUserRepository: new PrismaAnswerUserRepository(context as PrismaClient),
        tagRepository: new PrismaTagRepository(context as PrismaClient),
      };
      try {
        const fnExpression = fn(prismaSession);
        if (Array.isArray(fnExpression)) {
          await Promise.all(fnExpression);
          return true;
        }
        return fnExpression;
      }
      catch (err) {
        console.log(err);
        await context.$queryRaw`ROLLBACK;`;
        return null;
      }
    }, {
      isolationLevel: isolationMapper[isolationLevel],
      maxWait: 5000,
      timeout: 10000,
    });
  }
}