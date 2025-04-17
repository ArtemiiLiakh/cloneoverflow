import { DatabaseDITokens } from '@application/http-rest/nestjs/di/tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { Answer } from '@core/models/answer/Answer';
import { AnswerRepository } from '@core/repositories';
import { AnswerMapper } from '@infrastructure/persistence/prisma/adapters/entityMappers/AnswerMapper';
import { INestApplication } from '@nestjs/common';
import { Answer as PrismaAnswer, PrismaClient } from '@prisma/client';

export class AnswerUtils {
  private answerRepository: AnswerRepository;
  private prisma: PrismaClient;

  constructor (
    nest: INestApplication,
  ) {
    this.prisma = nest.get(DatabaseDITokens.PrismaClient);
    this.answerRepository = nest.get(PrismaRepositoryDITokens.AnswerRepository);
  }

  async create (answer: Partial<PrismaAnswer> & { ownerId: string, questionId: number }): Promise<Answer> {
    const newAnswer = await this.prisma.answer.create({ 
      data: {
        ownerId: answer.ownerId,
        questionId: answer.questionId,
        text: answer.text ?? 'text',
        rating: answer.rating,
        isSolution: answer.isSolution,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
      },
    });

    return AnswerMapper.toEntity(newAnswer);
  }

  async getAnswer (answerId: string): Promise<Answer | null> {
    return this.answerRepository.getById({ answerId }).catch(() => null);
  }

  delete (answerId: string): Promise<void> {
    return this.answerRepository.delete({ answerId });
  }
}