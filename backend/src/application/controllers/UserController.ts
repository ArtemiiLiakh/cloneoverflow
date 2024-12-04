import { UserGetAnswerMapperOutput } from '@application/adapters/mappers/user/UserGetAnswersMapper';
import { UserGetMapperOutput } from '@application/adapters/mappers/user/UserGetMapper';
import { UserGetProfileMapperOutput } from '@application/adapters/mappers/user/UserGetProfileMapper';
import { UserGetQuestionMapperOutput } from '@application/adapters/mappers/user/UserGetQuestionsMapper';
import { UserUpdateMapperOutput } from '@application/adapters/mappers/user/UserUpdateMapper';
import { UserServiceFacade } from '@application/services/UserServiceFacade';
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
import { IAnswerGetAllUseCase } from '@core/services/answer/types/usecases';
import { IQuestionGetAllUseCase } from '@core/services/question/types/usecases';
import { WithAuth, WithBody, WithParams, WithQuery } from './types/Request';
import { CoreResponse } from './types/Response';

export class UserController {
  constructor (
    private userService: UserServiceFacade,
    private answerGetAllUseCase: IAnswerGetAllUseCase,
    private questionGetAllUseCase: IQuestionGetAllUseCase,
  ) {}

  async getUser (
    { params }: WithParams<{ id: string }>, 
    res: CoreResponse<UserGetResponse>,
  ) {
    const user = await this.userService.get({
      userId: params.id,
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
    { executor, params, body }: WithAuth & WithParams<{ userId: string }> & WithBody<UserUpdateDTO>, 
    res: CoreResponse<UserUpdateResponse>,
  ) {
    const user = await this.userService.update({
      executorId: executor.userId,
      userId: params.userId,
      data: body,
    });
    res.send(UserUpdateMapperOutput(user));
  }

  async getAnswers (
    { params, query }: WithParams<{ userId: string }> & WithQuery<UserGetAnswersDTO>, 
    res: CoreResponse<UserGetAnswersResponse>,
  ) {
    const answers = await this.answerGetAllUseCase.execute({
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
    const questions = await this.questionGetAllUseCase.execute({
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