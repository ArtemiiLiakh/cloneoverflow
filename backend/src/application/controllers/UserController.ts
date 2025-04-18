import {
  UserGetMapperOutput,
  UserGetOwnAnswerMapperOutput,
  UserGetOwnQuestionMapperOutput,
  UserGetProfileMapperOutput,
  UserUpdateMapperOutput,
} from '@application/adapters/mappers/user';

import {
  UserGetAnswersDTO,
  UserGetAnswersResponse,
  UserGetProfileResponse,
  UserGetQuestionsResponse,
  UserGetQuestionsDTO,
  UserGetResponse,
  UserUpdateDTO,
  UserUpdateResponse,
} from '@cloneoverflow/common';

import { UserServiceFacade } from '@application/service-facades/UserServiceFacade';
import { WithAuth, WithBody, WithParams, WithQuery } from './types/Request';
import { CoreResponse } from './types/Response';

export class UserController {
  constructor (
    private userService: UserServiceFacade,
  ) {}

  async getUser (
    { params }: WithParams<{ userId: string }>, 
    res: CoreResponse<UserGetResponse>,
  ): Promise<void> {
    const user = await this.userService.get({
      userId: params.userId,
    });

    res.send(UserGetMapperOutput(user));
  }

  async getOwnAnswers (
    { params, query }: WithParams<{ userId: string }> & WithQuery<UserGetAnswersDTO>, 
    res: CoreResponse<UserGetAnswersResponse>,
  ): Promise<void> {
    const answers = await this.userService.getOwnAnswers({
      userId: params.userId,
      answerOptions: {
        searchText: query.searchText,
        sortBy: query.sortBy,
        orderBy: query.orderBy,
        pagination: query.pagination,
      },
    });

    res.send(UserGetOwnAnswerMapperOutput(answers));
  }

  async getOwnQuestions (
    { params, query }: WithParams<{ userId: string }> & WithQuery<UserGetQuestionsDTO>, 
    res: CoreResponse<UserGetQuestionsResponse>,
  ): Promise<void> {
    const questions = await this.userService.getOwnQuestions({
      userId: params.userId,
      questionOptions: {
        searchText: query.search,
        tags: query.tags,
        sortBy: query.sortBy,
        orderBy: query.orderBy,
        pagination: query.pagination,
      },
    });

    res.send(UserGetOwnQuestionMapperOutput(questions));
  }

  async getProfile (
    { params }: WithParams<{ userId: string }>, 
    res: CoreResponse<UserGetProfileResponse>,
  ): Promise<void> {
    const profile = await this.userService.getProfile({
      userId: params.userId,
    });
    res.send(UserGetProfileMapperOutput(profile));
  }

  async update (
    { executor, body }: WithAuth & WithBody<UserUpdateDTO>, 
    res: CoreResponse<UserUpdateResponse>,
  ): Promise<void> {
    const user = await this.userService.update({
      executorId: executor.userId,
      data: body,
    });
    res.send(UserUpdateMapperOutput(user));
  }
}