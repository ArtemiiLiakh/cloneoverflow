import { AnswerController } from '@application/controllers/AnswerController';
import { CoreResponse } from '@application/controllers/types/Response';
import { ExecutorPayload, TokenTypeEnum } from '@application/services/auth/data';
import { AnswerCreateDTO, AnswersGetAllDTO, AnswerUpdateDTO, VoteDTO } from '@cloneoverflow/common';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
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
  ) {
    return this.answerController.create({
      body,
      executor,
    }, res);
  }

  @Get('/:answerId')
  get (
    @Param('answerId', NumberPipe) answerId: string,
    @CoreRes() res: CoreResponse,
  ) {
    return this.answerController.get({
      params: { answerId },
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Patch('/:answerId')
  update (
    @Executor() executor: ExecutorPayload,
    @Param('answerId', NumberPipe) answerId: string,
    @Body() body: AnswerUpdateDTO,
    @CoreRes() res: CoreResponse,
  ) {
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
  ) {
    return this.answerController.delete({
      params: { answerId },
      executor,
    }, res);
  }

  @Get('/')
  getMany (
    @Query() query: AnswersGetAllDTO,
    @CoreRes() res: CoreResponse,
  ) {
    return this.answerController.getMany({
      query,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/:answerId/vote')
  vote (
    @Executor() executor: ExecutorPayload,
    @Param('answerId', NumberPipe) answerId: string,
    @Body() body: VoteDTO,
    @CoreRes() res: CoreResponse,
  ) {
    return this.answerController.voteAnswer({
      params: { answerId },
      executor,
      body,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Get('/:answerId/vote')
  getVote (
    @Executor() executor: ExecutorPayload,
    @Param('answerId', NumberPipe) answerId: string,
    @CoreRes() res: CoreResponse,
  ) {
    return this.answerController.getVote({
      params: { answerId },
      executor,
    }, res);
  }
}