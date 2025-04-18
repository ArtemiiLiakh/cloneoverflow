import { AnswerServiceFacade } from '@application/service-facades/AnswerServiceFacade';
import {
  AnswerCreateUseCase,
  AnswerDeleteUseCase,
  AnswerGetByQuestionUseCase,
  AnswerGetUseCase,
  AnswerGetVoterUseCase,
  AnswerUpdateUseCase,
  AnswerVoteUseCase,
} from '@core/services/answer';

export const AnswerUseCaseDITokens = {
  Create: Symbol(AnswerCreateUseCase.name),
  Delete: Symbol(AnswerDeleteUseCase.name),
  Get: Symbol(AnswerGetUseCase.name),
  GetVoter: Symbol(AnswerGetVoterUseCase.name),
  Update: Symbol(AnswerUpdateUseCase.name),
  Vote: Symbol(AnswerVoteUseCase.name),
  GetByQuestion: Symbol(AnswerGetByQuestionUseCase.name),
};

export const AnswerServiceDIToken = Symbol(AnswerServiceFacade.name);