import {
  AnswerCreateMapperOutput,
  AnswerGetMapperOutput,
  AnswerUpdateMapperOutput,
} from '@application/adapters/mappers/answers';

import {
  AnswerCreateDTO,
  AnswerCreateResponse,
  AnswerGetResponse,
  AnswerGetVoterResponse,
  AnswerUpdateDTO,
  AnswerUpdateResponse,
  VoteTypeEnum,
} from '@cloneoverflow/common';

import { AnswerServiceFacade } from '@application/service-facades/AnswerServiceFacade';
import { WithAuth, WithBody, WithOptionalAuth, WithParams } from './types/Request';
import { CoreResponse } from './types/Response';

export class AnswerController {
  constructor (
    private answerService: AnswerServiceFacade,
  ) {}

  async get (
    { executor, params }: WithOptionalAuth & WithParams<{ answerId: string }>, 
    res: CoreResponse<AnswerGetResponse>,
  ): Promise<void> {
    const answer = await this.answerService.get({
      executorId: executor?.userId,
      answerId: params.answerId,
    });

    res.send(AnswerGetMapperOutput(answer));
  }

  async create (
    { body, executor }: WithAuth & WithBody<AnswerCreateDTO>, 
    res: CoreResponse<AnswerCreateResponse>,
  ): Promise<void> {
    const answer = await this.answerService.create({
      executorId: executor.userId,
      questionId: body.questionId,
      text: body.text,
    });

    res.status(201);
    res.send(AnswerCreateMapperOutput(answer));
  }

  async update (
    { params, body, executor }: WithAuth & WithParams<{ answerId: string }> & WithBody<AnswerUpdateDTO>, 
    res: CoreResponse<AnswerUpdateResponse>,
  ): Promise<void> {
    const answer = await this.answerService.update({
      executorId: executor.userId,
      answerId: params.answerId,
      text: body.text,
    });

    res.send(AnswerUpdateMapperOutput(answer));
  }

  async delete (
    { params, executor }: WithAuth & WithParams<{ answerId: string }>, 
    res: CoreResponse,
  ): Promise<void> {
    await this.answerService.delete({
      executorId: executor.userId,
      answerId: params.answerId,
    });

    res.send({ message: 'ok' });
  }

  async voteUp (
    { params, executor }: WithAuth & WithParams<{ answerId: string }>, 
    res: CoreResponse,
  ): Promise<void> {
    await this.answerService.vote({
      executorId: executor.userId,
      answerId: params.answerId,
      vote: VoteTypeEnum.UP,  
    });

    res.status(200);
    res.send({ message: 'ok' });
  }

  async voteDown (
    { params, executor }: WithAuth & WithParams<{ answerId: string }>, 
    res: CoreResponse,
  ): Promise<void> {
    await this.answerService.vote({
      executorId: executor.userId,
      answerId: params.answerId,
      vote: VoteTypeEnum.DOWN,  
    });

    res.status(200);
    res.send({ message: 'ok' });
  }

  async getVoter (
    { params, executor }: WithAuth & WithParams<{ answerId: string }>,
    res: CoreResponse<AnswerGetVoterResponse>,
  ): Promise<void> {
    const voter = await this.answerService.getVoter({
      answerId: params.answerId,
      userId: executor.userId,
    });

    res.send({
      answerId: voter.answerId,
      userId: voter.userId,
      voteType: voter.voteType,
    });
  }
}