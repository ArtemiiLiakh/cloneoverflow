import { DbUser } from "../types/database/DbUser";
import { UserUpdateResponse } from "../responses/user.update.response";
import { DbAnswerQuestion } from '../types/database/DbAnswer';
import { MappedUserGetAnswerResponse, UserGetAnswersResponse } from '../responses/user.getAnswers.response';

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

  getAnswers(answers: DbAnswerQuestion[]): MappedUserGetAnswerResponse[] {
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
}