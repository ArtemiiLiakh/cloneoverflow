import { MappedGetAllResponse, QuestionCreateResponse, QuestionGetAllResponse, QuestionUpdateResponse } from '@clone-overflow/common';
import { DbGetAllQuestions, DbQuestion } from "../types/database/DbQuestion";
import { question } from '../routers/question';

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

  update(question: DbQuestion): QuestionUpdateResponse {
    return {
      id: question.id,
      title: question.title,
      text: question.text,
      rate: question.rate,
      status: question.status,
      createdAt: question.createdAt,
      updatedAt: question.createdAt,
      tags: question.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
    }
  }

  getAll(questions: DbGetAllQuestions[]): MappedGetAllResponse[] {
    return questions.map((question) => ({
      id: question.id,
      title: question.title,
      text: question.text,
      rate: question.rate,
      status: question.status,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      owner: {
        id: question.userId,
        name: question.userProfile.name,
        username: question.userProfile.username,
        reputation: question.userProfile.reputation,
      },
      tags: question.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
      answersAmount: question._count.answers,
    }));
  }
}