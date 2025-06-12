import {
  UserGetAnswersQuery,
  UserGetAnswersResponse,
  UserGetProfileResponse,
  UserGetQuestionsQuery,
  UserGetQuestionsResponse,
  UserGetResponse,
  UserUpdateBody,
} from '@cloneoverflow/common/api/user';
import api from '..';
import urls from '../urls';

export class UserService {
  static get(userId: string): Promise<UserGetResponse> {
    return api.get(urls.getUser(userId)).then((res) => res.data);
  }

  static update(userId: string, data: UserUpdateBody): Promise<void> {
    return api.patch(urls.updateUser(userId), data).then((res) => res.data); 
  }

  static getQuestions(userId: string, query?: UserGetQuestionsQuery): Promise<UserGetQuestionsResponse> {
    return api.get(urls.getQuestions(userId), {
      params: query,
    }).then((res) => res.data);
  }

  static getAnswers(userId: string, query: UserGetAnswersQuery): Promise<UserGetAnswersResponse> {
    return api.get(urls.getAnswers(userId), {
      params: query,
    }).then((res) => res.data);
  }

  static getProfile(userId: string): Promise<UserGetProfileResponse> {
    return api.get(urls.getProfile(userId)).then((res) => res.data);
  }
}