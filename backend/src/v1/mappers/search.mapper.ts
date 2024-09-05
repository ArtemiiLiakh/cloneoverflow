import { MappedSearchQuestionResponse, MappedSearchTagsResponse } from "@cloneoverflow/common";
import { DbGetAllQuestions } from "@/v1/types/database/DbQuestion";
import { DbTag } from "@/v1/types/database/DbTag";

export class SearchMapper {
  getQuestions(questions: DbGetAllQuestions[]): MappedSearchQuestionResponse[] {
    return questions.map((question) => {
      return {
        id: question.id,
        title: question.title,
        text: question.text,
        rate: question.rate,
        views: question.views,
        status: question.status,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
        owner: {
          id: question.owner.userId,
          name: question.owner.name,
          username: question.owner.username,
          reputation: question.owner.reputation,
        },
        tags: question.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        answersAmount: question._count.answers,
      };
    });
  }

  getTags(tags: DbTag[]): MappedSearchTagsResponse[] {
    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      questionsAmount: tag._count.questions,
    }));
  }
}