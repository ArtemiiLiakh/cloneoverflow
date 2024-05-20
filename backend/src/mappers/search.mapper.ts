import { MappedSearchQuestionResponse, MappedSearchTagsResponse } from "@cloneoverflow/common";
import { DbGetAllQuestions } from "../types/database/DbQuestion";
import { DbTag } from "../types/database/DbTag";

export class SearchMapper {
  getQuestions(questions: DbGetAllQuestions[]): MappedSearchQuestionResponse[] {
    return questions.map((question) => {
      const owner = question.userQuestions[0].userProfile;

      return {
        id: question.id,
        title: question.title,
        text: question.text,
        rate: question.rate,
        status: question.status,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
        owner: {
          id: question.userId,
          name: owner.name,
          username: owner.username,
          reputation: owner.reputation,
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