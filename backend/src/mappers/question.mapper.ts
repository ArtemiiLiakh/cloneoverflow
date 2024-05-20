import { QuestionCreateResponse, QuestionGetResponse, QuestionUpdateResponse, VoteType } from '@cloneoverflow/common';
import { DbQuestion } from "../types/database/DbQuestion";
import { UserAnswerStatus, UserProfile, UserQuestionStatus } from '@prisma/client';

export class QuestionMapper {
  get(question: DbQuestion, voterId?: string): QuestionGetResponse {
    const owner = question.userQuestions.find(
      (userAnswer) => userAnswer.status === UserQuestionStatus.OWNER
    )?.userProfile as UserProfile;

    const voter = question.userQuestions.find(
      (userQuestion) => userQuestion.status === UserQuestionStatus.VOTER && userQuestion.userId === voterId
    );

    console.log(owner);
    console.log(voter);
    console.log(voterId);

    return {
      id: question.id,
      title: question.title,
      rate: question.rate,
      views: question.views,
      voteType: voter?.voteType as VoteType,
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
      answers: question.answers.map((answer) => {
        const owner = answer.userAnswers.find(
          (userAnswer) => userAnswer.status === UserAnswerStatus.OWNER
        )?.userProfile as UserProfile;

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
            id: owner.userId,
            name: owner.name,
            username: owner.username,
            reputation: owner.reputation,
          },
        };
      }),
    };
  }

  create(question: DbQuestion): QuestionCreateResponse {
    const owner = question.userQuestions[0].userProfile;

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