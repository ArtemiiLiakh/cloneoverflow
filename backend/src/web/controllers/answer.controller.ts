import { AnswerController } from '@application/answer/AnswerController';
import { ExecutorPayload, TokenTypeEnum } from '@application/auth/data';
import { AnswerPaths } from '@cloneoverflow/common/api/answer';
import { CoreResponse } from '@common/controllers/Response';
import { AnswerIdInvalid } from '@core/answer/exceptions/AnswerIdInvalid';
import { AnswerOwnerInvalid } from '@core/answer/exceptions/AnswerOwnerInvalid';
import { AnswerVoteNotFound } from '@core/answer/exceptions/AnswerVoterNotFound';
import { CannotVoteAnswerTwice } from '@core/answer/exceptions/CannotVoteAnswerTwice';
import { CannotVoteOwnAnswer } from '@core/answer/exceptions/CannotVoteOwnAnswer';
import { QuestionIdInvalid } from '@core/question/exceptions/QuestionIdInvalid';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiAnswerCreateBody,
  ApiAnswerCreateResponse,
  ApiAnswerDeleteParams,
  ApiAnswerGetParams,
  ApiAnswerGetResponse,
  ApiAnswerGetVoteParams,
  ApiAnswerGetVoteResponse,
  ApiAnswerUpdateBody,
  ApiAnswerUpdateParams,
  ApiAnswerVoteDownParams,
  ApiAnswerVoteUpParams,
} from '@web/dtos/answer';
import { ApiEndpointDocumentation } from '../decorators/apiEndpoint.decorator';
import { Auth } from '../decorators/auth.decorator';
import { Executor } from '../decorators/executor.decorator';
import { CoreRes } from '../decorators/response.decorator';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';

@ApiTags('answers')
@Controller()
export class NestAnswerController {
  constructor (
    @Inject(ControllerDITokens.AnswerController) private readonly answerController: AnswerController,
  ) {}
  
  @Post(AnswerPaths.Create)
  @Auth()
  @ApiEndpointDocumentation({
    path: AnswerPaths.Create,
    summary: 'Creates a new answer for the question',
    operationId: 'Create answer',
    response: {
      type: ApiAnswerCreateResponse,
      statusCode: 201,
    },
    useDataValidation: true,
    useAuthValidation: true,
    exceptions: {
      title: 'Question with this id not found', 
      exception: new QuestionIdInvalid(),
    },
  })
  create (
    @Executor() executor: ExecutorPayload,
    @Body() body: ApiAnswerCreateBody,
    @CoreRes() res: CoreResponse,
  ): Promise<ApiAnswerCreateResponse> {
    return res.process(this.answerController.create({
      body,
      executor,
    }));
  }

  @Get(AnswerPaths.Get)
  @Auth({ tokenType: TokenTypeEnum.ACCESS, optional: true })
  @ApiEndpointDocumentation({
    path: AnswerPaths.Get,
    summary: 'Get answer by id',
    operationId: 'Get answer by id',
    response: {
      statusCode: 200,
      type: ApiAnswerGetResponse,
    },
    exceptions: {
      title: 'Question with this id not found', 
      exception: new QuestionIdInvalid(),
    },
    useAuthValidation: {
      access: true,
    },
    useDataValidation: true,
  })
  get (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiAnswerGetParams,
    @CoreRes() res: CoreResponse,
  ): Promise<ApiAnswerGetResponse> {
    return res.process(this.answerController.get({
      params,
      executor,
    }));
  }
  
  @Patch(AnswerPaths.Update)
  @Auth()
  @ApiEndpointDocumentation({
    path: AnswerPaths.Update,
    summary: 'Update answer',
    operationId: 'Update answer',
    response: {
      statusCode: 204,
      description: 'Answer was successfully updated',
    },
    exceptions: {
      title: 'Answer with this id not found',
      exception: new AnswerIdInvalid(),
    },
    useAuthValidation: true,
    useDataValidation: true,
    useRatingValidation: true,
  })
  async update (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiAnswerUpdateParams,
    @Body() body: ApiAnswerUpdateBody,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.answerController.update({
      params,
      body,
      executor, 
    }));
  }

  @Delete(AnswerPaths.Delete)
  @Auth()
  @ApiEndpointDocumentation({
    path: AnswerPaths.Delete,
    summary: 'Delete answer',
    operationId: 'Delete answer',
    response: {
      statusCode: 204,
      description: 'Answer was successfully deleted',
    },
    useAuthValidation: true,
    useDataValidation: true,
    exceptions: [
      {
        title: 'User that deletes answer is not owner',
        exception: new AnswerOwnerInvalid(),
      },
      {
        title: 'Answer with that id is not found',
        exception: new AnswerIdInvalid(),
      },
    ],
  })
  async delete (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiAnswerDeleteParams,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.answerController.delete({
      params,
      executor,
    }));
  }

  @Post(AnswerPaths.VoteUp)
  @Auth()
  @ApiEndpointDocumentation({
    path: AnswerPaths.VoteUp,
    summary: 'Vote answer up',
    operationId: 'Vote answer up',
    response: {
      statusCode: 204,
      description: 'Answer vote was successfully applied',
    },
    exceptions: [
      {
        title: 'Cannot vote answer if you are owner',
        exception: new CannotVoteOwnAnswer(),
      },
      {
        title: 'Cannot vote answer twice with the same vote type',
        exception: new CannotVoteAnswerTwice(),
      },
      {
        title: 'Answer with this id is not found',
        exception: new AnswerIdInvalid(),
      },
    ],
    useAuthValidation: true,
    useDataValidation: true,
    useRatingValidation: true,
  })
  async voteUp (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiAnswerVoteUpParams,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.answerController.voteUp({
      params,
      executor,
    }));
  }

  @Post(AnswerPaths.VoteDown)
  @Auth()
  @ApiEndpointDocumentation({
    path: AnswerPaths.VoteDown,
    summary: 'Vote answer down',
    operationId: 'Vote answer down',
    response: {
      statusCode: 204,
      description: 'Answer vote was successfully applied',
    },
    exceptions: [
      {
        title: 'Cannot vote answer if you are owner',
        exception: new CannotVoteOwnAnswer(),
      },
      {
        title: 'Cannot vote answer twice with the same vote type',
        exception: new CannotVoteAnswerTwice(),
      },
      {
        title: 'Answer with this id is not found',
        exception: new AnswerIdInvalid(),
      },
    ],
    useAuthValidation: true,
    useDataValidation: true,
    useRatingValidation: true,
  })
  async voteDown (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiAnswerVoteDownParams,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    await res.process(this.answerController.voteDown({
      params,
      executor,
    }));
  }

  @Get(AnswerPaths.GetVote)
  @Auth({ tokenType: TokenTypeEnum.ACCESS })
  @ApiEndpointDocumentation({
    path: AnswerPaths.GetVote,
    summary: 'Get user vote for this answer',
    operationId: 'Get answer vote',
    response: {
      statusCode: 200,
      type: ApiAnswerGetVoteResponse,
    },
    exceptions: {
      title: 'Answer vote not found',
      exception: new AnswerVoteNotFound(),
    },
    useAuthValidation: {
      access: true,
    },
    useDataValidation: true,
  })
  getVote (
    @Executor() executor: ExecutorPayload,
    @Param() params: ApiAnswerGetVoteParams,
    @CoreRes() res: CoreResponse,
  ): Promise<ApiAnswerGetVoteResponse> {
    return res.process(this.answerController.getVoter({
      params,
      executor,
    }));
  }
}