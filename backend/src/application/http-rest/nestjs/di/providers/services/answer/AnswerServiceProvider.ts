import { AnswerServiceFacade } from '@application/facades/AnswerServiceFacade';
import { Provider } from '@nestjs/common';
import { AnswerServiceDIToken, AnswerUseCaseDITokens } from '../../../tokens/services';
import {
  IAnswerCreateUseCase,
  IAnswerDeleteUseCase,
  IAnswerGetByQuestionUseCase,
  IAnswerGetUseCase,
  IAnswerGetVoterUseCase,
  IAnswerUpdateUseCase,
  IAnswerVoteUseCase,
} from '@core/services/answer/types';

export const AnswerServiceProvider: Provider = {
  provide: AnswerServiceDIToken,

  useFactory: (
    CreateUseCase: IAnswerCreateUseCase,
    UpdateUseCase: IAnswerUpdateUseCase,
    DeleteUseCase: IAnswerDeleteUseCase,
    GetUseCase: IAnswerGetUseCase,
    VoteUseCase: IAnswerVoteUseCase,
    GetVoterUseCase: IAnswerGetVoterUseCase,
    GetQuestionAnswersUseCase: IAnswerGetByQuestionUseCase,
  ) => AnswerServiceFacade.new({
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
    GetUseCase,
    VoteUseCase,
    GetVoterUseCase,
    GetQuestionAnswersUseCase,
  }),

  inject: [
    AnswerUseCaseDITokens.Create,
    AnswerUseCaseDITokens.Update,
    AnswerUseCaseDITokens.Delete,
    AnswerUseCaseDITokens.Get,
    AnswerUseCaseDITokens.Vote,
    AnswerUseCaseDITokens.GetVoter,
    AnswerUseCaseDITokens.GetByQuestion,
  ],
};