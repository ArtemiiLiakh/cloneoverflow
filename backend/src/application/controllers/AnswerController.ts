import { AnswerCreateMapperOutput } from '@application/adapters/mappers/answers/AnswerCreateMapper';
import { AnswerGetMapperOutput } from '@application/adapters/mappers/answers/AnswerGetMapper';
import { AnswerUpdateMapperOutput } from '@application/adapters/mappers/answers/AnswerUpdateMapper';
import { AnswerServiceFacade } from '@application/services/AnswerServiceFacade';
import {
  AnswerCreateDTO,
  AnswerCreateResponse,
  AnswerGetAllResponse,
  AnswerGetResponse,
  AnswersGetAllDTO,
  AnswerUpdateDTO,
  AnswerUpdateResponse,
  VoteDTO,
} from '@cloneoverflow/common';
import { WithAuth, WithBody, WithOptionalAuth, WithParams } from './types/Request';
import { CoreResponse } from './types/Response';
import { AnswerGetAllMapper } from '@application/adapters/mappers/answers/AnswerGetAllMapper';

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
    { executor, body }: WithOptionalAuth & WithBody<AnswersGetAllDTO>,
    res: CoreResponse<AnswerGetAllResponse>,
  ) {
    const answers = await this.answerService.getAll({
      executorId: executor?.userId,
      questionId: body.questionId,
      ownerId: body.ownerId,
      rateFrom: body.rateFrom,
      rateTo: body.rateTo,
      searchText: body.searchText,
      sortBy: body.sortBy,
      orderBy: body.orderBy,
      pagination: body.pagination,
    });

    res.send(AnswerGetAllMapper(answers));
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
    { params, body, executor }: WithAuth & WithParams<{ answerId: string }> & WithBody<AnswerUpdateDTO>, 
    res: CoreResponse<AnswerUpdateResponse>,
  ) {
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
}