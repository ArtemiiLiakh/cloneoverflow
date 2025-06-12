import {
  ApiQuestionAddViewerParams,
  ApiQuestionCloseBody,
  ApiQuestionCloseParams,
  ApiQuestionCreateBody,
  ApiQuestionCreateResponse,
  ApiQuestionDeleteParams,
  ApiQuestionGetAnswersParams,
  ApiQuestionGetAnswersQuery,
  ApiQuestionGetAnswersResponse,
  ApiQuestionGetParams,
  ApiQuestionGetResponse,
  ApiQuestionGetVoteParams,
  ApiQuestionGetVoteResponse,
  ApiQuestionMarkFavoriteParams,
  ApiQuestionOpenParams,
  ApiQuestionRemoveFavoriteParams,
  ApiQuestionUpdateBody,
  ApiQuestionUpdateParams,
  ApiQuestionVoteDownParams,
  ApiQuestionVoteUpParams,
} from '@web/dtos/question';

import { ExecutorPayload, TokenTypeEnum } from '@application/auth/data';
import { QuestionController } from '@application/question/QuestionController';
import { QuestionPaths } from '@cloneoverflow/common/api/question';
import { CoreResponse } from '@common/controllers/Response';
import { AnswerNotBelongToQuestion } from '@core/answer/exceptions';
import { CannotDeleteOthersQuestion, CannotVoteOwnQuestion, CannotVoteQuestionTwice, QuestionAlreadyFavorite, QuestionAlreadyOpened, QuestionIdInvalid, QuestionNotFavorite, QuestionViewerAlreadyExists, QuestionVoteNotFound } from '@core/question/exceptions';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiEndpointDocumentation } from '../decorators/apiEndpoint.decorator';
import { Auth } from '../decorators/auth.decorator';
import { Executor } from '../decorators/executor.decorator';
import { CoreRes } from '../decorators/response.decorator';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';

@ApiTags('questions')
@Controller()
export class NestQuestionController {
  constructor (
    @Inject(ControllerDITokens.QuestionController) private readonly questionController: QuestionController,
  ) {}

  @Post(QuestionPaths.Create)
  @Auth()
  @ApiEndpointDocumentation({
    path: QuestionPaths.Create,
    summary: 'Create question',
    operationId: 'Create question',
    response: {
      statusCode: 201,
      type: ApiQuestionCreateResponse,
    },
    useAuthValidation: true,
    useDataValidation: true,
  })
  create (
    @Executor() executor: ExecutorPayload,
    @Body() body: ApiQuestionCreateBody,
    @CoreRes() res: CoreResponse,
  ): Promise<ApiQuestionCreateResponse> {
    return res.process(this.questionController.create({
      executor,
      body,
    }));
  }

  @Get(QuestionPaths.Get)
  @Auth({ tokenType: TokenTypeEnum.ACCESS, optional: true })
  @ApiEndpointDocumentation({
    path: QuestionPaths.Get,
    summary: 'Get question by id',
    operationId: 'Get question',
    response: {
      statusCode: 200,
      type: ApiQuestionGetResponse,
    },
    exceptions: {
      title: 'Question with this id not found',
      exception: new QuestionIdInvalid(),
    },
    useAuthValidation: {
      access: true,
      optional: true,
    },
    useDataValidation: true,
  })
  get (
    @Executor() executor: ExecutorPayload | undefined,
    @Param() params: ApiQuestionGetParams,
    @CoreRes() res: CoreResponse,
  ): Promise<ApiQuestionGetResponse> {
    return res.process(this.questionController.get({
      executor,
      params,
    }));
  }

  @Get(QuestionPaths.GetAnswers)
  @Auth({ tokenType: TokenTypeEnum.ACCESS, optional: true })
  @ApiEndpointDocumentation({
    path: QuestionPaths.GetAnswers,
    summary: 'Get question answers',
    operationId: 'Get question answers',
    useAuthValidation: {
      access: true,
    },
    response: {
      statusCode: 200,
      type: ApiQuestionGetAnswersResponse,
    },
    exceptions: {
      title: 'Question with this id not found',
      exception: new QuestionIdInvalid(),
    },
  })
  getAnswers (
    @Executor() executor: ExecutorPayload | undefined,
    @Param() params: ApiQuestionGetAnswersParams,
    @Query() query: ApiQuestionGetAnswersQuery,
    @CoreRes() res: CoreResponse,
  ): Promise<ApiQuestionGetAnswersResponse> {
    return res.process(this.questionController.getAnswers({
      executor,
      params,
      query,
    }));
  }

  @Patch(QuestionPaths.Update)
  @Auth()
  @ApiEndpointDocumentation({
    path: QuestionPaths.Update,
    summary: 'Update question',
    operationId: 'Update question',
    response: {
      statusCode: 204,
      description: 'Question was successfully updated',
    },
    useAuthValidation: true,
    useRatingValidation: true,
    useDataValidation: true,
    exceptions: {
      title: 'Question with this id not found',
      exception: new QuestionIdInvalid(),
    },
  })
  async update (
    @Executor() executor: ExecutorPayload,
    @Param() { questionId }: ApiQuestionUpdateParams,
    @Body() body: ApiQuestionUpdateBody,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    await res.process(this.questionController.update({
      params: { questionId },
      body,
      executor,
    }));
  }

  @Delete(QuestionPaths.Delete)
  @Auth()
  @ApiEndpointDocumentation({
    path: QuestionPaths.Delete,
    summary: 'Delete question',
    operationId: 'Delete question',
    response: {
      statusCode: 204,
      description: 'Question was successfully deleted',
    },
    exceptions: [
      {
        title: 'Cannot delete other\'s questinon',
        exception: new CannotDeleteOthersQuestion(),
      },
      {
        title: 'Question with this id not found',
        exception: new QuestionIdInvalid(),
      },
    ],
    useAuthValidation: true,
    useDataValidation: true,
  })
  async delete (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiQuestionDeleteParams,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    await res.process(this.questionController.delete({
      params,
      executor,
    }));
  }

  @Post(QuestionPaths.AddViewer)
  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @ApiEndpointDocumentation({
    path: QuestionPaths.AddViewer,
    summary: 'Add viewer to question',
    operationId: 'Add viewer',
    response: {
      statusCode: 204,
      description: 'Viewer was successfully added to question',
    },
    exceptions: [
      {
        title: 'Question viewer already exists',
        exception: new QuestionViewerAlreadyExists(),
      },
      {
        title: 'Question with that id not found',
        exception: new QuestionIdInvalid(),
      },
    ],
  })
  async addViewer (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiQuestionAddViewerParams,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    await res.process(this.questionController.addViewer({
      params,
      executor,
    }));
  }

  
  @Post(QuestionPaths.VoteUp)
  @Auth()
  @ApiEndpointDocumentation({
    path: QuestionPaths.VoteUp,
    summary: 'Vote up question',
    operationId: 'Question vote up',
    response: {
      statusCode: 204,
      description: 'Question was successfully voted',
    },
    useAuthValidation: true,
    useDataValidation: true,
    useRatingValidation: true, 
    exceptions: [
      {
        title: 'Cannot vote own question',
        exception: new CannotVoteOwnQuestion(),
      },
      {
        title: 'Cannot vote question up or down twice',
        exception: new CannotVoteQuestionTwice(),
      },
    ],
  })
  async voteUp (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiQuestionVoteUpParams,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    await res.process(this.questionController.voteUp({
      params,
      executor,
    }));
  }

  @Post(QuestionPaths.VoteDown)
  @Auth()
  @ApiEndpointDocumentation({
    path: QuestionPaths.VoteDown,
    summary: 'Vote donw question',
    operationId: 'Question vote down',
    response: {
      statusCode: 204,
      description: 'Question was successfully voted',
    },
    useAuthValidation: true,
    useDataValidation: true,
    useRatingValidation: true, 
    exceptions: [
      {
        title: 'Cannot vote own question',
        exception: new CannotVoteOwnQuestion(),
      },
      {
        title: 'Cannot vote question up or down twice',
        exception: new CannotVoteQuestionTwice(),
      },
    ],
  })
  async voteDown (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiQuestionVoteDownParams,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    await res.process(this.questionController.voteDown({
      params,
      executor,
    }));
  }

  @Get(QuestionPaths.GetVote)
  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @ApiEndpointDocumentation({
    path: QuestionPaths.VoteUp,
    summary: 'Vote up question',
    operationId: 'Question vote up',
    response: {
      statusCode: 200,
      type: ApiQuestionGetVoteResponse,
    },
    useAuthValidation: {
      access: true,
    },
    useDataValidation: true,
    useRatingValidation: true, 
    exceptions: {
      title: 'Question vote not found',
      exception: new QuestionVoteNotFound(),
    },
  })
  getVote (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiQuestionGetVoteParams,
    @CoreRes() res: CoreResponse,
  ): Promise<ApiQuestionGetVoteResponse> {
    return res.process(this.questionController.getVoter({
      params,
      executor,
    }));
  }

  @Post(QuestionPaths.Open)
  @Auth()
  @ApiEndpointDocumentation({
    path: QuestionPaths.Open,
    summary: 'Mark question as opened',
    operationId: 'Open question',
    response: {
      statusCode: 204,
      description: 'Question was successfully opened',
    },
    exceptions: {
      title: 'Question already opened',
      exception: new QuestionAlreadyOpened(),
    },
    useAuthValidation: true,
    useRatingValidation: true,
    useDataValidation: true,
  })
  async open (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiQuestionOpenParams,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {

    await res.process(this.questionController.openQuestion({
      params,
      executor,
    }));
  }
  
  @Post(QuestionPaths.Close)
  @Auth()
  @ApiEndpointDocumentation({
    path: QuestionPaths.Close,
    summary: 'Close question as solved',
    operationId: 'Close question',
    response: {
      statusCode: 204,
      description: 'Question was successfully closed',
    },
    exceptions: {
      title: 'Answer id is wrong',
      exception: new AnswerNotBelongToQuestion(),
    },
    useAuthValidation: true,
    useDataValidation: true,
    useRatingValidation: true,
  })
  async close (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiQuestionCloseParams,
    @Body() body: ApiQuestionCloseBody, 
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.questionController.closeQuestion({
      params,
      executor,
      body,
    }));
  }

  @Post(QuestionPaths.MarkFavorite)
  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @ApiEndpointDocumentation({
    path: QuestionPaths.MarkFavorite,
    summary: 'Make question favorite',
    operationId: 'Make favorite',
    response: {
      statusCode: 204,
      description: 'Question was marked as favorite',
    },
    exceptions: [
      {
        title: 'Question with this id not found',
        exception: new QuestionIdInvalid(),
      },
      {
        title: 'Question is already favorite',
        exception: new QuestionAlreadyFavorite(),
      },
    ],
    useAuthValidation: {
      access: true,
    },
    useDataValidation: true,
  })
  async markFavorite (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiQuestionMarkFavoriteParams,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.questionController.markFavorite({
      executor,
      params,
    }));
  }

  @Delete(QuestionPaths.RemoveFavorite)
  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @ApiEndpointDocumentation({
    path: QuestionPaths.MarkFavorite,
    summary: 'Remove question from favorites',
    operationId: 'Remove favorite',
    response: {
      statusCode: 204,
      description: 'Question was removed from favorite list',
    },
    exceptions: [
      {
        title: 'Question with this id not found',
        exception: new QuestionIdInvalid(),
      },
      {
        title: 'Question is not favorite',
        exception: new QuestionNotFavorite(),
      },
    ],
    useAuthValidation: {
      access: true,
    },
    useDataValidation: true,
  })
  async removeFavorite (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiQuestionRemoveFavoriteParams,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.questionController.removeFavorite({
      executor,
      params,
    }));
  }
}