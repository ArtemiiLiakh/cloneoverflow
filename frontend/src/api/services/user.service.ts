import {
  UserGetAnswersDTO,
  UserGetAnswersResponse,
  UserGetProfileResponse,
  UserGetQuestionResponse,
  UserGetQuestionsDTO,
  UserGetResponse,
  UserUpdateDTO
} from '@cloneoverflow/common';
import api from '..';
import urls from '../urls';

export class UserService {
  static get(userId: string): Promise<UserGetResponse> {
    return api.get(urls.get(userId));
  }

  static update(userId: string, data: UserUpdateDTO): Promise<UserGetResponse> {
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