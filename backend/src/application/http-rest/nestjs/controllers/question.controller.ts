import { QuestionController } from '@application/controllers/QuestionController';
import { SearchController } from '@application/controllers/SearchController';
import { CoreResponse } from '@application/controllers/types/Response';
import { ExecutorPayload, TokenTypeEnum } from '@application/services/auth/data';
import { QuestionCloseDTO, QuestionCreateDTO, QuestionUpdateDTO, SearchQuestionsDTO, VoteDTO } from '@cloneoverflow/common';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { Executor } from '../decorators/executor.decorator';
import { CoreRes } from '../decorators/response.decorator';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';
import { NumberPipe } from '../pipes/number-validation.pipe';

@Controller('questions')
export class NestQuestionController {
  constructor (
    @Inject(ControllerDITokens.QuestionController) private questionController: QuestionController,
    @Inject(ControllerDITokens.SearchController) private searchController: SearchController,
  ) {}

  @Get('/')
  search (
    @Query() query: SearchQuestionsDTO,
    @CoreRes() res: CoreResponse,
  ) {
    return this.searchController.searchQuestions({
      query,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/')
  create (
    @Executor() executor: ExecutorPayload,
    @Body() body: QuestionCreateDTO,
    @CoreRes() res: CoreResponse,
  ) {
    return this.questionController.create({
      executor,
      body,
    }, res);
  }

  @Get('/:questionId')
  get (
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ) {
    return this.questionController.get({
      params: { questionId },
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Patch('/:questionId')
  update (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @Body() body: QuestionUpdateDTO,
    @CoreRes() res: CoreResponse,
  ) {

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
  ) {

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
  ) {

    return this.questionController.addViewer({
      params: { questionId },
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Post('/:questionId/vote')
  vote (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @Body() body: VoteDTO,
    @CoreRes() res: CoreResponse,
  ) {

    return this.questionController.voteQuestion({
      params: { questionId },
      body,
      executor,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @Get('/:questionId/vote')
  getVote (
    @Executor() executor: ExecutorPayload,
    @Param('questionId', NumberPipe) questionId: string,
    @CoreRes() res: CoreResponse,
  ) {

    return this.questionController.getVote({
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
  ) {

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
  ) {

    return this.questionController.closeQuestion({
      params: { questionId },
      executor,
      body,
    }, res);
  }
}