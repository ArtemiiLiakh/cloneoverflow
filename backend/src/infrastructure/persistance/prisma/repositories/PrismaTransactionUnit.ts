import { AnswerRepository } from "@core/domain/repositories/answer/AnswerRepository";
import { AnswerUserRepository } from "@core/domain/repositories/answer/AnswerUserRepository";
import { QuestionRepository } from "@core/domain/repositories/question/QuestionRepository";
import { QuestionUserRepository } from "@core/domain/repositories/question/QuestionUserRepository";
import { TagRepository } from "@core/domain/repositories/tag/TagRepository";
import { Unit, UnitOfWork } from "@core/domain/repositories/UnitOfWork";
import { PrismaClient } from "@prisma/client";
import { PrismaAnswerRepository } from "./PrismaAnswerRepository";
import { PrismaAnswerUserRepository } from "./PrismaAnswerUserRepository";
import { PrismaQuestionRepository } from "./PrismaQuestionRepository";
import { PrismaQuestionUserRepository } from "./PrismaQuestionUserRepository";
import { PrismaTagRepository } from "./PrismaTagRepository";
import { PrismaUserRepository } from "./PrismaUserRepository";

class RollbackError extends Error {
  name = "RollbackError";
  message = "Rollback transaction";
}

class TransactionUnit implements Unit {
  constructor (
    public userRepository: PrismaUserRepository,
    public questionRepository: QuestionRepository,
    public questionUserRepository: QuestionUserRepository,
    public answerRepository: AnswerRepository,
    public answerUserRepository: AnswerUserRepository,
    public tagRepository: TagRepository,
  ) {}
}

export class PrismaTransactionUnit implements UnitOfWork  {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async execute<I>(fn: (unit: Unit) => Promise<I>): Promise<I | null> {
    return await this.prisma.$transaction(async (context) => {
      const prismaSession = new TransactionUnit(
        new PrismaUserRepository(context as PrismaClient),
        new PrismaQuestionRepository(context as PrismaClient),
        new PrismaQuestionUserRepository(context as PrismaClient),
        new PrismaAnswerRepository(context as PrismaClient),
        new PrismaAnswerUserRepository(context as PrismaClient),
        new PrismaTagRepository(context as PrismaClient),
      );
        
      try {
        return await fn(prismaSession);
      } catch (error) {
        if (error instanceof RollbackError) {
          await context.$queryRaw`ROLLBACK;`;
          return null;
        }
        else {
          throw error;
        }
      }
    });
  }
}