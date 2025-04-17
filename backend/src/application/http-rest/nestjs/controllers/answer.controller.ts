import { AnswerController } from '@application/controllers/AnswerController';
import { CoreResponse } from '@application/controllers/types/Response';
import { ExecutorPayload, TokenTypeEnum } from '@application/services/auth/data';
import { AnswerCreateDTO, AnswerUpdateDTO } from '@cloneoverflow/common';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { Executor } from '../decorators/executor.decorator';
import { CoreRes } from '../decorators/response.decorator';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';
import { NumberPipe } from '../pipes/number-validation.pipe';

@Controller('answers')
export class NestAnswerController {
  constructor (
    @Inject(ControllerDITokens.AnswerController) private answerController: AnswerController,
  ) {}

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/')
  create (
    @Executor() executor: ExecutorPayload,
    @Body() body: AnswerCreateDTO,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.answerController.create({
      body,
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS, optinoal: true })
  @Get('/:answerId')
  get (
    @Executor() executor: ExecutorPayload,
    @Param('answerId', NumberPipe) answerId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.answerController.get({
      params: { answerId },
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Patch('/:answerId')
  update (
    @Executor() executor: ExecutorPayload,
    @Param('answerId', NumberPipe) answerId: string,
    @Body() body: AnswerUpdateDTO,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.answerController.update({
      params: { answerId },
      body,
      executor, 
    }, res);
  }

  @Auth()
  @Delete('/:answerId')
  delete (
    @Executor() executor: ExecutorPayload,
    @Param('answerId', NumberPipe) answerId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.answerController.delete({
      params: { answerId },
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/:answerId/vote/up')
  voteUp (
    @Executor() executor: ExecutorPayload,
    @Param('answerId', NumberPipe) answerId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.answerController.voteUp({
      params: { answerId },
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/:answerId/vote/down')
  voteDown (
    @Executor() executor: ExecutorPayload,
    @Param('answerId', NumberPipe) answerId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.answerController.voteDown({
      params: { answerId },
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Get('/:answerId/vote')
  getVote (
    @Executor() executor: ExecutorPayload,
    @Param('answerId', NumberPipe) answerId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.answerController.getVoter({
      params: { answerId },
      executor,
    }, res);
  }
}