import { QuestionCreateResponse, QuestionGetResponse, QuestionUpdateResponse } from '@cloneoverflow/common';
import { DbQuestion } from "../types/database/DbQuestion";

export class QuestionMapper {
  get(question: DbQuestion): QuestionGetResponse {
    const owner = question.userQuestions[0].userProfile;

    return {
      id: question.id,
      title: question.title,
      rate: question.rate,
      owner: {
        id: owner.userId,
        name: owner.name,
        username: owner.username,
        reputation: owner.reputation,
      },
      text: question.text,
      status: question.status,
      createdAt: new Date(question.createdAt),
      updatedAt: new Date(question.updatedAt),
      tags: question.tags,
      answers: question.answers.map((answer) => ({
        id: answer.id,
        text: answer.text,
        rate: answer.rate,
        isSolution: answer.isSolution,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
        owner: {
          id: answer.userId,
          name: answer.userProfile.name,
          username: answer.userProfile.username,
          reputation: answer.userProfile.reputation,
        },
      })),
    };
  }

  create(question: DbQuestion): QuestionCreateResponse {
    const owner = question.userQuestions[0].userProfile;

    return {
      id: question.id,
      title: question.title,
      text: question.text,
      rate: question.rate,
      status: question.status,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      user: {
        id: owner.userId,
        name: owner.name,
        username: owner.username,
        reputation: owner.reputation,
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
}