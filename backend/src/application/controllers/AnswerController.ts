import { AnswerCreateMapperOutput } from '@application/adapters/mappers/answers/AnswerCreateMapper';
import { AnswerGetMapperOutput } from '@application/adapters/mappers/answers/AnswerGetMapper';
import { AnswerUpdateMapperOutput } from '@application/adapters/mappers/answers/AnswerUpdateMapper';
import { AnswerServiceFacade } from '@application/services/AnswerServiceFacade';
import {
  AnswerCreateDTO,
  AnswerCreateResponse,
  AnswerGetAllResponse,
  AnswerGetResponse,
  AnswerGetVoterResponse,
  AnswersGetAllDTO,
  AnswerUpdateDTO,
  AnswerUpdateResponse,
  VoteDTO,
} from '@cloneoverflow/common';
import { WithAuth, WithBody, WithOptionalAuth, WithParams, WithQuery } from './types/Request';
import { CoreResponse } from './types/Response';
import { AnswerGetManyMapper } from '@application/adapters/mappers/answers/AnswerGetManyMapper';

export class AnswerController {
  constructor (
    private answerService: AnswerServiceFacade,
  ) {}

  async get (
    { executor, params }: WithOptionalAuth & WithParams<{ answerId: string }>, 
    res: CoreResponse<AnswerGetResponse>,
  ) {
    const answer = await this.answerService.get({
      executorId: executor?.userId,
      answerId: params.answerId,
    });

    res.send(AnswerGetMapperOutput(answer));
  }

  async getAll (
    { query }: WithOptionalAuth & WithQuery<AnswersGetAllDTO>,
    res: CoreResponse<AnswerGetAllResponse>,
  ) {
    const answers = await this.answerService.getAll({
      questionId: query.questionId,
      ownerId: query.ownerId,
      rateFrom: query.rateFrom,
      rateTo: query.rateTo,
      searchText: query.searchText,
      sortBy: query.sortBy,
      orderBy: query.orderBy,
      pagination: query.pagination,
    });

    res.send(AnswerGetManyMapper(answers));
  }

  async create (
    { body, executor }: WithAuth & WithBody<AnswerCreateDTO>, 
    res: CoreResponse<AnswerCreateResponse>,
  ) {
    const answer = await this.answerService.create({
      executorId: executor.userId,
      questionId: body.questionId,
      text: body.text,
    });

    res.status(201);
    res.send(AnswerCreateMapperOutput(answer));
  }

  async update (
    { params, body }: WithAuth & WithParams<{ answerId: string }> & WithBody<AnswerUpdateDTO>, 
    res: CoreResponse<AnswerUpdateResponse>,
  ) {
    const answer = await this.answerService.update({
      answerId: params.answerId,
      text: body.text,
    });

    res.send(AnswerUpdateMapperOutput(answer));
  }

  async delete (
    { params, executor }: WithAuth & WithParams<{ answerId: string }>, 
    res: CoreResponse,
  ) {
    await this.answerService.delete({
      executorId: executor.userId,
      answerId: params.answerId,
    });

    res.send({ message: 'ok' });
  }

  async voteAnswer (
    { params, executor, body }: WithAuth & WithParams<{ answerId: string }> & WithBody<VoteDTO>, 
    res: CoreResponse,
  ) {
    await this.answerService.vote({
      executorId: executor.userId,
      answerId: params.answerId,
      vote: body.vote,  
    });

    res.send({ message: 'ok' });
  }

  async getVoter (
    { params, executor }: WithAuth & WithParams<{ answerId: string }>,
    res: CoreResponse<AnswerGetVoterResponse>,
  ) {
    const voter = await this.answerService.getVoter({
      answerId: params.answerId,
      userId: executor.userId,
    });

    res.send({
      voter: voter ? {
        answerId: voter.answerId,
        userId: voter.userId,
        voteType: voter.voteType,
      } : null,
    });
  }
}