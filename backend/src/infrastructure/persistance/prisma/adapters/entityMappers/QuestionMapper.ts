import { Question } from '@core/domain/entities/Question';
import Prisma from '@prisma/client';
import { bytesToUUID } from '../../utils/uuid';

export class QuestionMapper  {
  static toEntity (question: Partial<Prisma.Question>): Question {
    return Question.new({
      id: question.id?.toString(),
      ownerId: question.ownerId ? bytesToUUID(question.ownerId) : '',
      text: question.text ?? '',
      title: question.title ?? '',
      rating: question.rate,
      views: question.views,
      isClosed: question.isClosed,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    });
  }
}