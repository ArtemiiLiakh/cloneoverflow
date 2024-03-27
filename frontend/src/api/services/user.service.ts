import { UserGetProfileResponse } from '../response/user.getProfile.response';
import urls from '../../utils/urls';
import api from '..';
import { UserGetResponse } from '../response/user.get.response';
import { UserGetQuestionsDTO } from '../dtos/user.getQuestion.dto';
import { UserGetAnswersDTO } from '../dtos/user.getAnswer.dto';
import { UserUpdateDto } from '../dtos/user.update.dto';
import { UserGetAnswersResponse } from '../response/user.getAnswers.response';
import { UserGetQuestionResponse } from '../response/user.getQuestion.response';

export class UserService {
  static get(userId: string): Promise<UserGetResponse> {
    return api.get(urls.get(userId));
  }

  static update(userId: string, data: UserUpdateDto): Promise<UserGetResponse> {
    return api.patch(urls.update(userId), data); 
  }

  static getQuestions(userId: string, query?: UserGetQuestionsDTO): Promise<UserGetQuestionResponse> {
    return api.get(urls.getQuestions(userId), {
      params: query,
    });
  }

  static getAnswers(userId: string, query: UserGetAnswersDTO): Promise<UserGetAnswersResponse> {
    return api.get(urls.getAnswers(userId), {
      params: query,
    });
  }

  static getProfile(userId: string): Promise<UserGetProfileResponse> {
    return api.get(urls.getProfile(userId));
  }
}