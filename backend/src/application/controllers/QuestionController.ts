import { QuestionCreateMapperOutput } from '@application/adapters/mappers/question/QuestionCreateMapper';
import { QuestionGetMapperOutput } from '@application/adapters/mappers/question/QuestionGetMapper';
import { QuestionUpdateMapperOutput } from '@application/adapters/mappers/question/QuestionUpdateMapper';
import { QuestionServiceFacade } from '@application/services/QuestionServiceFacade';
import {
  QuestionCloseDTO,
  QuestionCreateDTO,
  QuestionCreateResponse,
  QuestionGetResponse,
  QuestionUpdateDTO,
  QuestionUpdateResponse,
  VoteDTO,
} from '@cloneoverflow/common';
import { WithAuth, WithBody, WithOptionalAuth, WithParams } from './types/Request';
import { CoreResponse } from './types/Response';

export class QuestionController {
  constructor (
    private questionService: QuestionServiceFacade,
  ) {}

  async get (
    { executor, params }: WithOptionalAuth & WithParams<{ questionId: string }>, 
    res: CoreResponse<QuestionGetResponse>,
  ) {
    const question = await this.questionService.get({
      executorId: executor?.userId,
      questionId: params.questionId,
    });
    
    res.send(QuestionGetMapperOutput(question));
  }

  async create (
    { body, executor }: WithAuth & WithBody<QuestionCreateDTO>, 
    res: CoreResponse<QuestionCreateResponse>,
  ) {
    const question = await this.questionService.create({
      executorId: executor.userId,
      data: body,
    });

    res.status(201);
    res.send(QuestionCreateMapperOutput(question));
  }
  
  async update (
    { params, body, executor }: WithAuth & WithParams<{ questionId: string }> & WithBody<QuestionUpdateDTO>, 
    res: CoreResponse<QuestionUpdateResponse>,
  ) {
    const question = await this.questionService.update({
      executorId: executor.userId,
      data: body,
      questionId: params.questionId,
    });

    res.send(QuestionUpdateMapperOutput(question));
  }

  async delete (
    { executor, params }: WithAuth & WithParams<{ questionId: string }>, 
    res: CoreResponse,
  ) {
    await this.questionService.delete({
      executorId: executor.userId,
      questionId: params.questionId,
    });
    
    res.send({ message: 'ok' });
  }

  async closeQuestion (
    { executor, body, params }: WithAuth & WithParams<{ questionId: string }> & WithBody<QuestionCloseDTO>, 
    res: CoreResponse,
  ) {
    await this.questionService.close({
      executorId: executor.userId,
      answerId: body.answerId,
      questionId: params.questionId,
    });

    res.send({ message: 'ok' });
  }

  async openQuestion (
    { executor, params }: WithAuth & WithParams<{ questionId: string }>, 
    res: CoreResponse,
  ) {
    await this.questionService.open({
      executorId: executor.userId,
      questionId: params.questionId,
    });

    res.send({ message: 'ok' });
  }
  
  async voteQuestion (
    { body, params, executor }: WithAuth & WithParams<{ questionId: string }> & WithBody<VoteDTO>, 
    res: CoreResponse,
  ) {
    await this.questionService.vote({
      executorId: executor.userId,
      vote: body.vote,
      questionId: params.questionId,
    });
    
    res.send({ message: 'ok' });
  }
}