import {
  QuestionCreateMapperOutput,
  QuestionGetDetailsMapper,
  QuestionUpdateMapperOutput,
} from '@application/adapters/mappers/question';

import {
  AnswerGetQuestionAnswersDTO,
  AnswerGetQuestionAnswersResponse,
  QuestionCloseDTO,
  QuestionCreateDTO,
  QuestionCreateResponse,
  QuestionGetResponse,
  QuestionGetVoterResponse,
  QuestionUpdateDTO,
  QuestionUpdateResponse,
  VoteTypeEnum,
} from '@cloneoverflow/common';

import { AnswerGetQuestionAnswerMapper } from '@application/adapters/mappers/answers/AnswerGetQuestionAnswersMapper';
import { AnswerServiceFacade } from '@application/service-facades/AnswerServiceFacade';
import { QuestionServiceFacade } from '@application/service-facades/QuestionServiceFacade';
import { WithAuth, WithBody, WithOptionalAuth, WithParams, WithQuery } from './types/Request';
import { CoreResponse } from './types/Response';

export class QuestionController {
  constructor (
    private questionService: QuestionServiceFacade,
    private answerService: AnswerServiceFacade,
  ) {}

  async get (
    { executor, params }: WithOptionalAuth & WithParams<{ questionId: string }>, 
    res: CoreResponse<QuestionGetResponse>,
  ): Promise<void> {
    const questionDetails = await this.questionService.getDetails({
      executorId: executor?.userId,
      questionId: params.questionId,
    });

    res.send(QuestionGetDetailsMapper(questionDetails));
  }

  async getAnswers ({ 
    executor,
    params,
    query,
  }: WithOptionalAuth & WithParams<{ questionId: string }> & WithQuery<AnswerGetQuestionAnswersDTO>,
  res: CoreResponse<AnswerGetQuestionAnswersResponse>,
  ): Promise<void> {
    const answers = await this.answerService.getByQuestion({
      questionId: params.questionId,
      voterId: executor?.userId,
      sortBy: query.sortBy,
      orderBy: query.orderBy,
      pagination: query.pagination,
    });

    res.send(AnswerGetQuestionAnswerMapper(answers));
  }

  async create (
    { body, executor }: WithAuth & WithBody<QuestionCreateDTO>, 
    res: CoreResponse<QuestionCreateResponse>,
  ): Promise<void> {
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
  ): Promise<void> {
    const question = await this.questionService.update({
      executorId: executor.userId,
      questionId: params.questionId,
      data: body,
    });

    res.send(QuestionUpdateMapperOutput(question));
  }

  async delete (
    { executor, params }: WithAuth & WithParams<{ questionId: string }>, 
    res: CoreResponse,
  ): Promise<void> {
    await this.questionService.delete({
      executorId: executor.userId,
      questionId: params.questionId,
    });
    
    res.send({ message: 'ok' });
  }

  async closeQuestion (
    { executor, body, params }: WithAuth & WithParams<{ questionId: string }> & WithBody<QuestionCloseDTO>, 
    res: CoreResponse,
  ): Promise<void> {
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
  ): Promise<void> {
    await this.questionService.open({
      executorId: executor.userId,
      questionId: params.questionId,
    });

    res.send({ message: 'ok' });
  }
  
  async voteUp (
    { params, executor }: WithAuth & WithParams<{ questionId: string }>, 
    res: CoreResponse,
  ): Promise<void> {
    await this.questionService.vote({
      executorId: executor.userId,
      vote: VoteTypeEnum.UP,
      questionId: params.questionId,
    });
    
    res.send({ message: 'ok' });
  }
  
  async voteDown (
    { params, executor }: WithAuth & WithParams<{ questionId: string }>, 
    res: CoreResponse,
  ): Promise<void> {
    await this.questionService.vote({
      executorId: executor.userId,
      vote: VoteTypeEnum.DOWN,
      questionId: params.questionId,
    });
    
    res.send({ message: 'ok' });
  }

  async addViewer (
    { executor, params }: WithAuth & WithParams<{ questionId: string }>,
    res: CoreResponse,
  ): Promise<void> {

    await this.questionService.addViewer({
      executorId: executor.userId,
      questionId: params.questionId,
    });

    res.status(201);
    res.send({ message: 'ok' });
  }

  async getVoter (
    { executor, params }: WithAuth & WithParams<{ questionId: string }>, 
    res: CoreResponse<QuestionGetVoterResponse>,
  ): Promise<void> {
    const voter = await this.questionService.getVoter({
      questionId: params.questionId,
      voterId: executor.userId,
    });

    res.send({ 
      voterId: voter.userId,
      questionId: voter.questionId,
      voteType: voter.voteType,
    });
  }

  async makeFavorite (
    { executor, params }: WithAuth & WithParams<{ questionId: string }>,
    res: CoreResponse,
  ): Promise<void> {
    await this.questionService.toggleFavorite({
      executorId: executor.userId,
      questionId: params.questionId,
      action: 'add',
    });

    res.status(201);
    res.send({ message: 'ok' });
  }

  async removeFavorite (
    { executor, params }: WithAuth & WithParams<{ questionId: string }>,
    res: CoreResponse,
  ): Promise<void> {
    await this.questionService.toggleFavorite({
      executorId: executor.userId,
      questionId: params.questionId,
      action: 'delete',
    });

    res.send({ message: 'ok' });
  }
}