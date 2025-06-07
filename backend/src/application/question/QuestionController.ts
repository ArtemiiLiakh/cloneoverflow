import { AnswerService } from '@application/answer/AnswerService';
import { QuestionService } from '@application/question/QuestionService';
import { VoteTypeEnum } from '@cloneoverflow/common';
import { WithAuth, WithBody, WithOptionalAuth, WithParams, WithQuery } from '@common/controllers/Request';
import { CoreResponseData } from '@common/controllers/Response';
import { OkMessage } from '@common/data/OkMessage';
import { QuestionCreateMapperOutput, QuestionGetAnswersMapper, QuestionGetDetailsMapper } from './adapters';

import {
  QuestionAddViewerParams,
  QuestionCloseBody,
  QuestionCloseParams,
  QuestionCreateBody,
  QuestionCreateResponse,
  QuestionDeleteParams,
  QuestionGetAnswersParams,
  QuestionGetAnswersQuery,
  QuestionGetAnswersResponse,
  QuestionGetResponse,
  QuestionGetVoteParams,
  QuestionGetVoteResponse,
  QuestionMarkFavoriteParams,
  QuestionOpenParams,
  QuestionRemoveFavoriteParams,
  QuestionUpdateBody,
  QuestionUpdateParams,
  QuestionVoteDownParams,
  QuestionVoteUpParams,
} from '@cloneoverflow/common/api/question';


export class QuestionController {
  constructor (
    private questionService: QuestionService,
    private answerService: AnswerService,
  ) {}

  async get (
    { executor, params }: WithOptionalAuth & WithParams<{ questionId: string }>, 
  ): Promise<CoreResponseData<QuestionGetResponse>> {
    const questionDetails = await this.questionService.getDetails({
      executorId: executor?.userId,
      questionId: params.questionId,
    });

    return {
      data: QuestionGetDetailsMapper(questionDetails),
    };
  }

  async getAnswers ({ 
    executor,
    params,
    query,
  }: WithOptionalAuth & WithParams<QuestionGetAnswersParams> & WithQuery<QuestionGetAnswersQuery>,
  ): Promise<CoreResponseData<QuestionGetAnswersResponse>> {
    const answers = await this.answerService.getByQuestion({
      questionId: params.questionId,
      voterId: executor?.userId,
      sortBy: query.sortBy,
      orderBy: query.orderBy,
      pagination: {
        page: query.page,
        pageSize: query.pageSize,
      },
    });

    return {
      data: QuestionGetAnswersMapper(answers),
    };
  }

  async create (
    { body, executor }: WithAuth & WithBody<QuestionCreateBody>, 
  ): Promise<CoreResponseData<QuestionCreateResponse>> {
    const question = await this.questionService.create({
      executorId: executor.userId,
      data: body,
    });
    
    return {
      data: QuestionCreateMapperOutput(question),
      status: 201,
    };
  }
  
  async update (
    { params, body, executor }: WithAuth & WithParams<QuestionUpdateParams> & WithBody<QuestionUpdateBody>, 
  ): Promise<CoreResponseData> {
    await this.questionService.update({
      executorId: executor.userId,
      questionId: params.questionId,
      data: body,
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }

  async delete (
    { executor, params }: WithAuth & WithParams<QuestionDeleteParams>, 
  ): Promise<CoreResponseData> {
    await this.questionService.delete({
      executorId: executor.userId,
      questionId: params.questionId,
    });
   
    return {
      data: OkMessage,
      status: 204,
    };
  }

  async closeQuestion (
    { executor, body, params }: WithAuth & WithParams<QuestionCloseParams> & WithBody<QuestionCloseBody>, 
  ): Promise<CoreResponseData> {
    await this.questionService.close({
      executorId: executor.userId,
      answerId: body.answerId,
      questionId: params.questionId,
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }

  async openQuestion (
    { executor, params }: WithAuth & WithParams<QuestionOpenParams>, 
  ): Promise<CoreResponseData> {
    await this.questionService.open({
      executorId: executor.userId,
      questionId: params.questionId,
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }
  
  async voteUp (
    { params, executor }: WithAuth & WithParams<QuestionVoteUpParams>, 
  ): Promise<CoreResponseData> {
    await this.questionService.vote({
      executorId: executor.userId,
      vote: VoteTypeEnum.UP,
      questionId: params.questionId,
    });
   
    return {
      data: OkMessage,
      status: 204,
    };
  }
  
  async voteDown (
    { params, executor }: WithAuth & WithParams<QuestionVoteDownParams>, 
  ): Promise<CoreResponseData> {
    await this.questionService.vote({
      executorId: executor.userId,
      vote: VoteTypeEnum.DOWN,
      questionId: params.questionId,
    });
    
    return {
      data: OkMessage,
      status: 204,
    };
  }

  async addViewer (
    { executor, params }: WithAuth & WithParams<QuestionAddViewerParams>,
  ): Promise<CoreResponseData> {
    await this.questionService.addViewer({
      executorId: executor.userId,
      questionId: params.questionId,
    });

    return {
      data: OkMessage,
      status: 201,
    };
  }

  async getVoter (
    { executor, params }: WithAuth & WithParams<QuestionGetVoteParams>, 
  ): Promise<CoreResponseData<QuestionGetVoteResponse>> {
    const voter = await this.questionService.getVoter({
      questionId: params.questionId,
      voterId: executor.userId,
    });

    return {
      data: {
        voterId: voter.userId,
        voteType: voter.voteType,
      },
    };
  }

  async markFavorite (
    { executor, params }: WithAuth & WithParams<QuestionMarkFavoriteParams>,
  ): Promise<CoreResponseData> {
    await this.questionService.toggleFavorite({
      executorId: executor.userId,
      questionId: params.questionId,
      action: 'add',
    });

    return {
      data: OkMessage,
      status: 201,
    };
  }

  async removeFavorite (
    { executor, params }: WithAuth & WithParams<QuestionRemoveFavoriteParams>,
  ): Promise<CoreResponseData> {
    await this.questionService.toggleFavorite({
      executorId: executor.userId,
      questionId: params.questionId,
      action: 'delete',
    });

    return {
      data: OkMessage,
      status: 204,
    };
  }
}