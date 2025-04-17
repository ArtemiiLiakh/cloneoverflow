import { CoreResponse } from '@application/controllers/types/Response';
import { UserController } from '@application/controllers/UserController';
import { ExecutorPayload, TokenTypeEnum } from '@application/services/auth/data';
import { UserGetAnswersDTO, UserGetQuestionsDTO, UserUpdateDTO } from '@cloneoverflow/common';
import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Query } from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { Executor } from '../decorators/executor.decorator';
import { CoreRes } from '../decorators/response.decorator';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';

@Controller('users')
export class NestUserController {
  constructor (
    @Inject(ControllerDITokens.UserController) private userController: UserController,
  ) {}

  @Get('/:userId')
  get (@Param('userId', ParseUUIDPipe) userId: string, @CoreRes() res: CoreResponse): Promise<void> {
    return this.userController.getUser({ 
      params: { userId },
    }, res);
  }

  @Get('/:userId/profile')
  getProfile (@Param('userId', ParseUUIDPipe) userId: string, @CoreRes() res: CoreResponse): Promise<void> {
    return this.userController.getProfile({ 
      params: { userId },
    }, res);
  }

  @Get('/:userId/answers')
  getOwnAnswers (
    @Param('userId', ParseUUIDPipe) userId: string, 
    @Query() query: UserGetAnswersDTO,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.userController.getOwnAnswers({ 
      params: { userId },
      query,
    }, res);
  }

  @Get('/:userId/questions')
  getOwnQuestions (
    @Param('userId', ParseUUIDPipe) userId: string, 
    @Query() query: UserGetQuestionsDTO,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.userController.getOwnQuestions({ 
      params: { userId },
      query,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Patch('/')
  update (
    @Executor() executor: ExecutorPayload,
    @Body() body: UserUpdateDTO,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    return this.userController.update({ 
      executor,
      body,
    }, res);
  }
}