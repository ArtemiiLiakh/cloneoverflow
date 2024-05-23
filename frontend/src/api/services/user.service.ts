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
    return api.get(urls.getUser(userId)).then((res) => res.data);
  }

  static update(userId: string, data: UserUpdateDTO): Promise<UserGetResponse> {
    return api.patch(urls.updateUser(userId), data).then((res) => res.data); 
  }

  static getQuestions(userId: string, query?: UserGetQuestionsDTO): Promise<UserGetQuestionResponse> {
    return api.get(urls.getQuestions(userId), {
      params: query,
    }).then((res) => res.data);
  }

  static getAnswers(userId: string, query: UserGetAnswersDTO): Promise<UserGetAnswersResponse> {
    return api.get(urls.getAnswers(userId), {
      params: query,
    }).then((res) => res.data);
  }

  static getProfile(userId: string): Promise<UserGetProfileResponse> {
    return api.get(urls.getProfile(userId)).then((res) => res.data);
  }
}