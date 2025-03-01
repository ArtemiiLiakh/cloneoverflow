import { AnswerServiceFacade } from '@application/facades/AnswerServiceFacade';
import { Provider } from '@nestjs/common';
import { AnswerServiceDIToken, AnswerUseCaseDITokens } from '../../../tokens/services';
import {
  IAnswerCreateUseCase,
  IAnswerDeleteUseCase,
  IAnswerGetManyUseCase,
  IAnswerGetUseCase,
  IAnswerGetVoteUseCase,
  IAnswerUpdateUseCase,
  IAnswerVoteUseCase,
} from '@core/services/answer/types';

export const AnswerServiceProvider: Provider = {
  provide: AnswerServiceDIToken,

  useFactory: (
    answerCreateUseCase: IAnswerCreateUseCase,
    answerUpdateUseCase: IAnswerUpdateUseCase,
    answerDeleteUseCase: IAnswerDeleteUseCase,
    answerGetUseCase: IAnswerGetUseCase,
    answerGetManyUseCase: IAnswerGetManyUseCase,
    answerVoteUseCase: IAnswerVoteUseCase,
    answerGetVoteUseCase: IAnswerGetVoteUseCase,
  ) => AnswerServiceFacade.new({
    answerCreateUseCase,
    answerUpdateUseCase,
    answerDeleteUseCase,
    answerGetUseCase,
    answerGetManyUseCase,
    answerVoteUseCase,
    answerGetVoteUseCase,
  }),

  inject: [
    AnswerUseCaseDITokens.Create,
    AnswerUseCaseDITokens.Update,
    AnswerUseCaseDITokens.Delete,
    AnswerUseCaseDITokens.Get,
    AnswerUseCaseDITokens.GetMany,
    AnswerUseCaseDITokens.Vote,
    AnswerUseCaseDITokens.GetVote,
  ],
};