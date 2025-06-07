import { AnswerService } from '@application/answer/AnswerService';
import { VoteTypeEnum } from '@cloneoverflow/common';
import { OkMessage } from '@common/data/OkMessage';

import {
  AnswerCreateBody,
  AnswerCreateResponse,
  AnswerDeleteParams,
  AnswerGetParams,
  AnswerGetResponse,
  AnswerGetVoteParams,
  AnswerGetVoteResponse,
  AnswerUpdateBody,
  AnswerUpdateParams,
  AnswerVoteDownParams,
  AnswerVoteUpParams,
} from '@cloneoverflow/common/api/answer';
import { WithAuth, WithBody, WithOptionalAuth, WithParams } from '@common/controllers/Request';
import { CoreResponseData } from '@common/controllers/Response';
import { AnswerCreateMapperOutput, AnswerGetMapperOutput } from './adapters';

export class AnswerController {
  constructor (
    private answerService: AnswerService,
  ) {}

  async get (
    { executor, params }: WithOptionalAuth & WithParams<AnswerGetParams>, 
  ): Promise<CoreResponseData<AnswerGetResponse>> {
    const answer = await this.answerService.get({
      executorId: executor?.userId,
      answerId: params.answerId,
    });

    return {
      data: AnswerGetMapperOutput(answer),
    };
  }

  async create (
    { body, executor }: WithAuth & WithBody<AnswerCreateBody>, 
  ): Promise<CoreResponseData<AnswerCreateResponse>> {
    const answer = await this.answerService.create({
      executorId: executor.userId,
      questionId: body.questionId,
      text: body.text,
    });

    return {
      data: AnswerCreateMapperOutput(answer),
      status: 201,
    };
  }

  async update (
    { params, body, executor }: WithAuth & WithParams<AnswerUpdateParams> & WithBody<AnswerUpdateBody>, 
  ): Promise<CoreResponseData> {
    await this.answerService.update({
      executorId: executor.userId,
      answerId: params.answerId,
      text: body.text,
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }

  async delete (
    { params, executor }: WithAuth & WithParams<AnswerDeleteParams>, 
  ): Promise<CoreResponseData> {
    await this.answerService.delete({
      executorId: executor.userId,
      answerId: params.answerId,
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }

  async voteUp (
    { params, executor }: WithAuth & WithParams<AnswerVoteUpParams>, 
  ): Promise<CoreResponseData> {
    await this.answerService.vote({
      executorId: executor.userId,
      answerId: params.answerId,
      vote: VoteTypeEnum.UP,  
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }

  async voteDown (
    { params, executor }: WithAuth & WithParams<AnswerVoteDownParams>, 
  ): Promise<CoreResponseData> {
    await this.answerService.vote({
      executorId: executor.userId,
      answerId: params.answerId,
      vote: VoteTypeEnum.DOWN,  
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }

  async getVoter (
    { params, executor }: WithAuth & WithParams<AnswerGetVoteParams>,
  ): Promise<CoreResponseData<AnswerGetVoteResponse>> {
    const voter = await this.answerService.getVoter({
      answerId: params.answerId,
      userId: executor.userId,
    });

    return {
      data: {
        userId: voter.userId,
        voteType: voter.voteType,
      },
    };
  }
}