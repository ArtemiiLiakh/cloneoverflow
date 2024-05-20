import {
  MappedUserGetAnswerResponse,
  MappedUserGetQuestionResponse,
  QuestionStatus,
  UserGetProfileResponse,
  UserGetResponse,
  UserStatus,
  UserUpdateResponse
} from '@cloneoverflow/common';
import { DbAnswer } from '../types/database/DbAnswer';
import { DbQuestion } from '../types/database/DbQuestion';
import { DbUser, DbUserGetProfile } from "../types/database/DbUser";

export class UserMapper {
  get(user: DbUser): UserGetResponse {
    return {
      id: user.id,
      name: user.userProfile.name,
      email: user.email,
      username: user.userProfile.username,
      reputation: user.userProfile.reputation,
      about: user.userProfile.about ?? '',
      status: user.userProfile.status as UserStatus,
      createdAt: user.userProfile.createdAt,
    };
  }

  update({id, userProfile}: DbUser): UserUpdateResponse {
    return {
      id,
      name: userProfile.name,
      username: userProfile.username,
      about: userProfile.about,
      reputation: userProfile.reputation,
      status: userProfile.status as UserStatus,
      createdAt: userProfile.createdAt,
      updatedAt: userProfile.updatedAt,
    };
  }

  getProfile(user: DbUserGetProfile): UserGetProfileResponse {
    const { userProfile } = user;
    const { answers, userQuestions } = userProfile;
    let bestQuestion: any = null;
    let bestAnswer: any = null;

    if (answers.length) {
      bestAnswer = {
        id: answers[0].id,
        text: answers[0].text,
        rate: answers[0].rate,
        isSolution: answers[0].isSolution,
        createdAt: answers[0].createdAt,
        question: {
          id: answers[0].question.id,
          title: answers[0].question.title,
        },
      };
    }

    if (userQuestions.length) {
      const { question } = userQuestions[0];

      bestQuestion = {
        id: question.id,
        title: question.title,
        rate: question.rate,
        status: question.status as QuestionStatus,
        tags: question.tags.map(tag => tag.name),
        answersAmount: question._count.answers,
        createdAt: question.createdAt,
      };

    }

    return {
      id: user.id,
      name: userProfile.name,
      username: userProfile.username,
      about: userProfile.about,
      reputation: userProfile.reputation,
      status: userProfile.status,
      answersAmount: userProfile._count.answers,
      questionsAmount: userQuestions.length,
      bestAnswer,
      bestQuestion,
      createdAt: userProfile.createdAt,
    };
  }

  getAnswers(answers: DbAnswer[]): MappedUserGetAnswerResponse[] {
    return answers.map(answer => ({
      id: answer.id,
      text: answer.text,
      rate: answer.rate,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      question: {
        id: answer.question.id,
        title: answer.question.title,
        rate: answer.question.rate,
      },
    }));
  }

  getQuestions(questions: DbQuestion[]): MappedUserGetQuestionResponse[] {
    return questions.map(question => ({
      id: question.id,
      userId: question.userId,
      title: question.title,
      text: question.text,
      rate: question.rate,
      status: question.status,
      tags: question.tags.map(tag => tag.name),
      answersAmount: question.answers.length,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }));
  }
}