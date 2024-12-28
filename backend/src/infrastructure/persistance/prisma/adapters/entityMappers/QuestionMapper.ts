import { Question } from '@core/domain/entities/Question';
import Prisma from '@prisma/client';

export class QuestionMapper  {
  static toEntity (question: Prisma.Question): Question {
    return {
      id: question.questionId,
      ownerId: question.ownerId,
      text: question.text,
      title: question.title,
      rating: question.rate,
      views: question.views,
      isClosed: question.isClosed,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}