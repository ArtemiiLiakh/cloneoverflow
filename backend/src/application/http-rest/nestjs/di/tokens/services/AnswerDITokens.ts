import { AnswerServiceFacade } from '@application/facades/AnswerServiceFacade';
import {
  AnswerCreateUseCase,
  AnswerDeleteUseCase,
  AnswerGetManyUseCase,
  AnswerGetUseCase,
  AnswerGetVoteUseCase,
  AnswerUpdateUseCase,
  AnswerVoteUseCase,
} from '@core/services/answer';

export const AnswerUseCaseDITokens = {
  Create: Symbol(AnswerCreateUseCase.name),
  Delete: Symbol(AnswerDeleteUseCase.name),
  Get: Symbol(AnswerGetUseCase.name),
  GetMany: Symbol(AnswerGetManyUseCase.name),
  GetVote: Symbol(AnswerGetVoteUseCase.name),
  Update: Symbol(AnswerUpdateUseCase.name),
  Vote: Symbol(AnswerVoteUseCase.name),
};

export const AnswerServiceDIToken = Symbol(AnswerServiceFacade.name);