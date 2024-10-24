import { QuestionStatus } from "@cloneoverflow/common";
import { Question } from "@core/domain/entities/Question";
import Prisma from "@prisma/client";

export class QuestionMapper  {
  static toEntity(question: Prisma.Question): Question {
    return Question.new({
      id: question.id,
      ownerId: question.ownerId,
      text: question.text,
      title: question.title,
      rate: question.rate,
      views: question.views,
      status: question.status as QuestionStatus,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt
    });
  }

  static toEntities(questions: Prisma.Question[]): Question[] {
    return questions.map(this.toEntity);
  } 
}