import { QuestionController } from '@application/controllers/QuestionController';
import { CoreResponse } from '@application/controllers/types/Response';
import { ExecutorPayload, TokenTypeEnum } from '@application/services/auth/data';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { Executor } from '../decorators/executor.decorator';
import { CoreRes } from '../decorators/response.decorator';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';
import { NumberPipe } from '../pipes/number-validation.pipe';

import {
  AnswerGetQuestionAnswersDTO,
  AnswerGetQuestionAnswersResponse,
  QuestionCloseDTO,
  QuestionCreateDTO,
  QuestionUpdateDTO,
} from '@cloneoverflow/common';


@Controller('questions')
export class NestQuestionController {
  constructor (
    @Inject(ControllerDITokens.QuestionController) private questionController: QuestionController,
  ) {}

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/')
  create (
    @Executor() executor: ExecutorPayload,
    @Body() body: QuestionCreateDTO,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.questionController.create({
      executor,
      body,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS, optinoal: true })
  @Get('/:questionId')
  get (
    @Executor() executor: ExecutorPayload | undefined,
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.questionController.get({
      executor,
      params: { questionId },
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS, optinoal: true })
  @Get('/:questionId/answers')
  getAnswers (
    @Executor() executor: ExecutorPayload | undefined,
    @Param('questionId', NumberPipe) questionId: string,
    @Query() query: AnswerGetQuestionAnswersDTO,
    @CoreRes() res: CoreResponse<AnswerGetQuestionAnswersResponse>,
  ): Promise<void> {
    return this.questionController.getAnswers({
      executor,
      params: { questionId },
      query,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Patch('/:questionId')
  update (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @Body() body: QuestionUpdateDTO,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    return this.questionController.update({
      params: { questionId },
      body,
      executor,
    }, res);
  }

  @Auth()
  @Delete('/:questionId')
  delete (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    return this.questionController.delete({
      params: { questionId },
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/:questionId/viewer')
  addViewer (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    return this.questionController.addViewer({
      params: { questionId },
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/:questionId/vote/up')
  voteUp (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    return this.questionController.voteUp({
      params: { questionId },
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/:questionId/vote/down')
  voteDown (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    return this.questionController.voteDown({
      params: { questionId },
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Get('/:questionId/vote')
  getVote (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    return this.questionController.getVoter({
      params: { questionId },
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/:questionId/open')
  open (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    return this.questionController.openQuestion({
      params: { questionId },
      executor,
    }, res);
  }
  
  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/:questionId/close')
  close (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @Body() body: QuestionCloseDTO, 
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.questionController.closeQuestion({
      params: { questionId },
      executor,
      body,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/:questionId/favorite')
  makeFavorite (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.questionController.makeFavorite({
      executor,
      params: { questionId },
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Delete('/:questionId/favorite')
  removeFavorite (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.questionController.removeFavorite({
      executor,
      params: { questionId },
    }, res);
  }
}