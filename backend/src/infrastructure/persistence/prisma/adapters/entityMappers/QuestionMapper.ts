import { Question } from '@core/models/question/Question';
import Prisma from '@prisma/client';

export class QuestionMapper  {
  static toEntity (question: Partial<Prisma.Question>): Question {
    return Question.new({
      questionId: question.id ? question.id.toString() : '',
      ownerId: question.ownerId ? question.ownerId : '',
      text: question.text ?? '',
      title: question.title ?? '',
      rating: question.rating ?? 0,
      views: question.views ?? 0,
      isClosed: question.isClosed ?? false,
      createdAt: question.createdAt ?? new Date(),
      updatedAt: question.updatedAt ?? new Date(),
    });
  }
}