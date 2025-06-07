import {
  UserGetMapperOutput,
  UserGetOwnAnswerMapperOutput,
  UserGetOwnQuestionMapperOutput,
  UserGetProfileMapperOutput,
} from '@application/user/adapters';
import { UserService } from '@application/user/UserService';
import { WithAuth, WithBody, WithParams, WithQuery } from '@common/controllers/Request';
import { CoreResponseData } from '@common/controllers/Response';
import { OkMessage } from '@common/data/OkMessage';

import {
  UserGetAnswersParams,
  UserGetAnswersQuery,
  UserGetAnswersResponse,
  UserGetParams,
  UserGetProfileParams,
  UserGetProfileResponse,
  UserGetQuestionsParams,
  UserGetQuestionsQuery,
  UserGetQuestionsResponse,
  UserGetResponse,
  UserUpdateBody,
} from '@cloneoverflow/common/api/user';

export class UserController {
  constructor (
    private userService: UserService,
  ) {}

  async getUser (
    { params }: WithParams<UserGetParams>, 
  ): Promise<CoreResponseData<UserGetResponse>> {
    const user = await this.userService.get({
      userId: params.userId,
    });

    return {
      data: UserGetMapperOutput(user),
    };
  }

  async getOwnAnswers (
    { params, query }: WithParams<UserGetAnswersParams> & WithQuery<UserGetAnswersQuery>, 
  ): Promise<CoreResponseData<UserGetAnswersResponse>> {
    const answers = await this.userService.getOwnAnswers({
      userId: params.userId,
      answerOptions: {
        searchText: query.search,
        sortBy: query.sortBy,
        orderBy: query.orderBy,
        pagination: {
          page: query.page,
          pageSize: query.pageSize,
        },
      },
    });

    return {
      data: UserGetOwnAnswerMapperOutput(answers),
    };
  }

  async getOwnQuestions (
    { params, query }: WithParams<UserGetQuestionsParams> & WithQuery<UserGetQuestionsQuery>, 
  ): Promise<CoreResponseData<UserGetQuestionsResponse>> {
    const questions = await this.userService.getOwnQuestions({
      userId: params.userId,
      questionOptions: {
        searchText: query.search,
        tags: query.tags,
        sortBy: query.sortBy,
        orderBy: query.orderBy,
        pagination: {
          page: query.page,
          pageSize: query.pageSize,
        },
      },
    });

    return {
      data: UserGetOwnQuestionMapperOutput(questions),
    };
  }

  async getProfile (
    { params }: WithParams<UserGetProfileParams>, 
  ): Promise<CoreResponseData<UserGetProfileResponse>> {
    const profile = await this.userService.getProfile({
      userId: params.userId,
    });
    return {
      data: UserGetProfileMapperOutput(profile),
    };
  }

  async update (
    { executor, body }: WithAuth & WithBody<UserUpdateBody>, 
  ): Promise<CoreResponseData> {
    await this.userService.update({
      executorId: executor.userId,
      data: body,
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }
}