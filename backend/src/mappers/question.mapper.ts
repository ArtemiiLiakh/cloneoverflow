import { DbQuestion } from "../types/database/DbQuestion";
import { QuestionCreateResponse } from "../responses/question.create.response";

export class QuestionMapper {
  create(question: DbQuestion): QuestionCreateResponse {
    return {
      id: question.id,
      title: question.title,
      text: question.text,
      rate: question.rate,
      status: question.status,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      user: {
        name: question.userProfile.name,
        username: question.userProfile.username,
        reputation: question.userProfile.reputation,
      },
      tag: question.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
    }
  }
}