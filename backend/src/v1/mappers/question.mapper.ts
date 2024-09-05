import { QuestionCreateResponse, QuestionGetResponse, QuestionUpdateResponse, VoteType } from '@cloneoverflow/common';
import { DbQuestion, QuestionUserAnswerRelation, QuestionUserRelation } from "@/v1/types/database/DbQuestion";
import { UserAnswerStatus, UserQuestionStatus } from '@prisma/client';

export class QuestionMapper {
  get(question: DbQuestion & QuestionUserAnswerRelation & QuestionUserRelation, voterId?: string): QuestionGetResponse {
    const voter = question.userQuestions.find(
      (userQuestion) => userQuestion.status === UserQuestionStatus.VOTER && userQuestion.userId === voterId
    );

    return {
      id: question.id,
      title: question.title,
      rate: question.rate,
      views: question.views,
      voteType: voter?.voteType as VoteType,
      owner: {
        id: question.owner.userId,
        name: question.owner.name,
        username: question.owner.username,
        reputation: question.owner.reputation,
      },
      text: question.text,
      status: question.status,
      createdAt: new Date(question.createdAt),
      updatedAt: new Date(question.updatedAt),
      tags: question.tags,
      answers: question.answers.map((answer) => {
        const voter = answer.userAnswers.find(
          (userAnswer) => userAnswer.status === UserAnswerStatus.VOTER && userAnswer.userId === voterId
        );

        return {
          id: answer.id,
          text: answer.text,
          rate: answer.rate,
          isSolution: answer.isSolution,
          createdAt: answer.createdAt,
          updatedAt: answer.updatedAt,
          voteType: voter?.voteType as VoteType,
          owner: {
            id: answer.owner.userId,
            name: answer.owner.name,
            username: answer.owner.username,
            reputation: answer.owner.reputation,
          },
        };
      }),
    };
  }

  create(question: DbQuestion): QuestionCreateResponse {
    return {
      id: question.id,
      title: question.title,
      text: question.text,
      rate: question.rate,
      views: question.views,
      status: question.status,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      user: {
        id: question.owner.userId,
        name: question.owner.name,
        username: question.owner.username,
        reputation: question.owner.reputation,
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
      views: question.views,
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