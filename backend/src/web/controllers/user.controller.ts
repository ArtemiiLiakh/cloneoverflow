import {
  ApiUserGetAnswersParams,
  ApiUserGetAnswersQuery,
  ApiUserGetAnswersResponse,
  ApiUserGetParams,
  ApiUserGetProfileParams,
  ApiUserGetProfileResponse,
  ApiUserGetQuestionsParams,
  ApiUserGetQuestionsQuery,
  ApiUserGetQuestionsResponse,
  ApiUserGetResponse,
  ApiUserUpdateBody,
} from '@web/dtos/user';

import { ExecutorPayload } from '@application/auth/data';
import { CoreResponse } from '@common/controllers/Response';
import { UserIdInvalid, UsernameAlreadyExists } from '@core/user/exceptions';
import { Body, Controller, Get, Inject, Param, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiEndpointDocumentation } from '../decorators/apiEndpoint.decorator';
import { Auth } from '../decorators/auth.decorator';
import { Executor } from '../decorators/executor.decorator';
import { CoreRes } from '../decorators/response.decorator';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';
import { UserController } from '@application/user/UserController';
import { UserPaths } from '@cloneoverflow/common/api/user';

@ApiTags('users')
@Controller()
export class NestUserController {
  constructor (
    @Inject(ControllerDITokens.UserController) private readonly userController: UserController,
  ) {}

  @Get(UserPaths.Get)
  @ApiEndpointDocumentation({
    path: UserPaths.Get,
    summary: 'Get user information by id',
    operationId: 'Get by id',
    response: {
      statusCode: 200,
      type: ApiUserGetResponse,
    },
    useDataValidation: true,
    exceptions: {
      title: 'User with this id not found',
      exception: new UserIdInvalid(),
    },
  })
  get (
    @Param() params: ApiUserGetParams, 
    @CoreRes() res: CoreResponse,
  ): Promise<ApiUserGetResponse> {
    return res.process(this.userController.getUser({ params }));
  }

  @ApiEndpointDocumentation({
    path: UserPaths.GetProfile,
    summary: 'Get user profile',
    operationId: 'Get user profile',
    response: {
      statusCode: 200,
      type: ApiUserGetProfileParams,
    },
    useDataValidation: true,
    exceptions: {
      title: 'User with this id not found',
      exception: new UserIdInvalid(),
    },
  })  
  @Get(UserPaths.GetProfile)
  getProfile (
    @Param() params: ApiUserGetProfileParams, 
    @CoreRes() res: CoreResponse,
  ): Promise<ApiUserGetProfileResponse> {
    return res.process(this.userController.getProfile({ params }));
  }

  @ApiEndpointDocumentation({
    path: UserPaths.GetAnswers,
    summary: 'Get user answers list',
    operationId: 'Get user answers',
    response: {
      statusCode: 200,
      type: ApiUserGetAnswersResponse,
    },
    useDataValidation: true,
  }) 
  @Get(UserPaths.GetAnswers)
  getAnswers (
    @Param() params: ApiUserGetAnswersParams, 
    @Query() query: ApiUserGetAnswersQuery,
    @CoreRes() res: CoreResponse,
  ): Promise<ApiUserGetAnswersResponse> {
    return res.process(this.userController.getOwnAnswers({ params, query }));
  }

  @Get(UserPaths.GetQuestions)
  @ApiEndpointDocumentation({
    path: UserPaths.GetQuestions,
    summary: 'Get user questions list',
    operationId: 'Get user questions',
    response: {
      statusCode: 200,
      type: ApiUserGetQuestionsResponse,
    },
    useDataValidation: true,
  })
  getQuestions (
    @Param() params: ApiUserGetQuestionsParams, 
    @Query() query: ApiUserGetQuestionsQuery,
    @CoreRes() res: CoreResponse,
  ): Promise<ApiUserGetQuestionsResponse> {
    return res.process(this.userController.getOwnQuestions({ 
      params,
      query,
    }));
  }

  @Patch(UserPaths.Update)
  @Auth()
  @ApiEndpointDocumentation({
    path: UserPaths.Update,
    summary: 'Update user information',
    operationId: 'Update user',
    response: {
      statusCode: 204,
      description: 'User was successfully updated',
    },
    exceptions: {
      title: 'Username already exists',
      exception: new UsernameAlreadyExists(),
    },
    useAuthValidation: true,
    useDataValidation: true,
  })
  async update (
    @Executor() executor: ExecutorPayload,
    @Body() body: ApiUserUpdateBody,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    await res.process(this.userController.update({ executor, body }));
  }
}