import { Question } from '@core/question';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { QuestionMapper } from '@infrastructure/persistence/prisma/adapters/entityMappers/QuestionMapper';
import { INestApplication } from '@nestjs/common';
import { PrismaClient, Question as PrismaQuestion } from '@prisma/client';
import { DatabaseDITokens } from '@web/di/tokens/DatabaseDITokens';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';

export class QuestionUtils {
  private questionRepository: QuestionRepository;
  private prisma: PrismaClient;

  constructor (
    nest: INestApplication,
  ) {
    this.prisma = nest.get(DatabaseDITokens.PrismaClient);
    this.questionRepository = nest.get(PrismaRepositoryDITokens.QuestionRepository);
  }

  async create (question: Partial<PrismaQuestion> & { ownerId: string }): Promise<Question> {
    const newQuestion = await this.prisma.question.create({ 
      data: {
        title: question.title ?? 'title',
        text: question.text,
        ownerId: question.ownerId,
        rating: question.rating,
        views: question.views,
        isClosed: question.isClosed,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      },
    });

    return QuestionMapper.toEntity(newQuestion);
  }

  getQuestion (questionId: string): Promise<Question | null> {
    return this.questionRepository.getById({ questionId }).catch(() => null);
  }

  delete (questionId: string): Promise<void> {
    return this.questionRepository.delete({ questionId });
  }
}