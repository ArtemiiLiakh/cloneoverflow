import {
  UserGetAnswerMapperOutput,
  UserGetMapperOutput,
  UserGetProfileMapperOutput,
  UserGetQuestionMapperOutput,
  UserUpdateMapperOutput,
} from '@application/adapters/mappers/user';

import {
  UserGetAnswersDTO,
  UserGetAnswersResponse,
  UserGetProfileResponse,
  UserGetQuestionResponse,
  UserGetQuestionsDTO,
  UserGetResponse,
  UserUpdateDTO,
  UserUpdateResponse,
} from '@cloneoverflow/common';

import { UserServiceFacade } from '@application/facades/UserServiceFacade';
import { IAnswerGetManyUseCase } from '@core/services/answer/types';
import { IQuestionGetManyUseCase } from '@core/services/question/types';
import { WithAuth, WithBody, WithParams, WithQuery } from './types/Request';
import { CoreResponse } from './types/Response';

export class UserController {
  constructor (
    private userService: UserServiceFacade,
    private answerGetManyUseCase: IAnswerGetManyUseCase,
    private questionGetManyUseCase: IQuestionGetManyUseCase,
  ) {}

  async getUser (
    { params }: WithParams<{ userId: string }>, 
    res: CoreResponse<UserGetResponse>,
  ) {
    const user = await this.userService.get({
      userId: params.userId,
    });

    res.send(UserGetMapperOutput(user));
  }

  async getProfile (
    { params }: WithParams<{ userId: string }>, 
    res: CoreResponse<UserGetProfileResponse>,
  ) {
    const profile = await this.userService.getProfile({
      userId: params.userId,
    });
    res.send(UserGetProfileMapperOutput(profile));
  }

  async update (
    { executor, body }: WithAuth & WithBody<UserUpdateDTO>, 
    res: CoreResponse<UserUpdateResponse>,
  ) {
    const user = await this.userService.update({
      executorId: executor.userId,
      data: body,
    });
    res.send(UserUpdateMapperOutput(user));
  }

  async getAnswers (
    { params, query }: WithParams<{ userId: string }> & WithQuery<UserGetAnswersDTO>, 
    res: CoreResponse<UserGetAnswersResponse>,
  ) {
    const answers = await this.answerGetManyUseCase.execute({
      ownerId: params.userId, 
      orderBy: query.orderBy,
      pagination: query.pagination,
      searchText: query.searchText,
      sortBy: query.sortBy,
    });
    res.send(UserGetAnswerMapperOutput(answers));
  }

  async getQuestions (
    { params, query }: WithParams<{ userId: string }> & WithQuery<UserGetQuestionsDTO>, 
    res: CoreResponse<UserGetQuestionResponse>,
  ) {
    const questions = await this.questionGetManyUseCase.execute({
      ownerId: params.userId,
      orderBy: query.orderBy,
      pagination: query.pagination,
      search: query.search,
      sortBy: query.sortBy,
      tags: query.tags,
    });
    res.send(UserGetQuestionMapperOutput(questions));
  }
}