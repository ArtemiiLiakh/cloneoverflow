import { SearchQuestionsResponse } from "@cloneoverflow/common";
import { SearchServiceOutput } from "@core/service/search/dto/SearchServiceOutput";

export function SearchQuestionsMapperOutput (
  questions: SearchServiceOutput.SearchQuestions
): SearchQuestionsResponse {
  return {
    questions: questions.data.map(question => ({
      id: question.entity.id,
      title: question.entity.title,
      text: question.entity.text,
      rate: question.entity.rate,
      views: question.entity.views,
      status: question.entity.status,
      createdAt: question.entity.createdAt,
      updatedAt: question.entity.updatedAt,
      answersAmount: question.answersAmount,
      owner: {
        id: question.owner.id,
        name: question.owner.name,
        reputation: question.owner.reputation,
        username: question.owner.username,
      },
      tags: question.tags.map(tag => tag.text),
    })),
    pagination: questions.pagination,
  }
}