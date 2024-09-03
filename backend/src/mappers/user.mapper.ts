import { DbAnswerWithQuestion } from '@/types/database/DbAnswer';
import { DbGetAllQuestions } from '@/types/database/DbQuestion';
import { DbUser, DbUserGetProfile } from '@/types/database/DbUser';
import {
  MappedUserGetAnswerResponse,
  MappedUserGetQuestionResponse,
  QuestionStatus,
  UserGetProfileResponse,
  UserGetResponse,
  UserStatus,
  UserUpdateResponse
} from '@cloneoverflow/common';

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
    const { userAnswers, userQuestions } = userProfile;
    let bestQuestion: any = null;
    let bestAnswer: any = null;

    if (userAnswers.length) {
      const { answer } = userAnswers[0];

      bestAnswer = {
        id: answer.id,
        text: answer.text,
        rate: answer.rate,
        isSolution: answer.isSolution,
        createdAt: answer.createdAt,
        question: {
          id: answer.question.id,
          title: answer.question.title,
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
      answersAmount: userProfile._count.userAnswers,
      questionsAmount: userQuestions.length,
      bestAnswer,
      bestQuestion,
      createdAt: userProfile.createdAt,
    };
  }

  getAnswers(answers: DbAnswerWithQuestion[]): MappedUserGetAnswerResponse[] {
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

  getQuestions(questions: DbGetAllQuestions[]): MappedUserGetQuestionResponse[] {
    return questions.map(question => ({
      id: question.id,
      title: question.title,
      text: question.text,
      rate: question.rate,
      views: question.views,
      status: question.status,
      tags: question.tags.map(tag => tag.name),
      answersAmount: question._count.answers,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }));
  }
}