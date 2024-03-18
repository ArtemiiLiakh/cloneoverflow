import { DbUser } from "../types/database/DbUser";
import { UserUpdateResponse } from "../responses/user.update.response";
import { MappedUserGetAnswerResponse, UserGetAnswersResponse } from '../responses/user.getAnswers.response';
import { DbAnswer } from '../types/database/DbAnswer';
import { DbQuestion } from '../types/database/DbQuestion';
import { MappedUserGetQuestionResponse } from '../responses/user.getQuestion.response';

export class UserMapper {
  update({id, userProfile}: DbUser): UserUpdateResponse {
    return {
      id,
      name: userProfile.name,
      username: userProfile.username,
      about: userProfile.about,
      reputation: userProfile.reputation,
      status: userProfile.status,
      createdAt: userProfile.createdAt,
      updatedAt: userProfile.updatedAt,
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
      tags: question.tags,
      answersAmount: question.answers.length,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }));
  }
}