import { AnswerService } from '@application/answer/AnswerService';
import {
  IAnswerCreateUseCase,
  IAnswerDeleteUseCase,
  IAnswerGetByQuestionUseCase,
  IAnswerGetUseCase,
  IAnswerGetVoterUseCase,
  IAnswerUpdateUseCase,
  IAnswerVoteUseCase,
} from '@application/answer/usecases/types';
import { Provider } from '@nestjs/common';
import { AnswerServiceDIToken, AnswerUseCaseDITokens } from '@web/di/tokens/services';

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
  ) => AnswerService.new({
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