import { AnswerService } from '@application/answer/AnswerService';
import {
  AnswerCreateUseCase,
  AnswerDeleteUseCase,
  AnswerGetByQuestionUseCase,
  AnswerGetUseCase,
  AnswerGetVoterUseCase,
  AnswerUpdateUseCase,
  AnswerVoteUseCase,
} from '@application/answer/usecases';

export const AnswerUseCaseDITokens = {
  Create: Symbol(AnswerCreateUseCase.name),
  Delete: Symbol(AnswerDeleteUseCase.name),
  Get: Symbol(AnswerGetUseCase.name),
  GetVoter: Symbol(AnswerGetVoterUseCase.name),
  Update: Symbol(AnswerUpdateUseCase.name),
  Vote: Symbol(AnswerVoteUseCase.name),
  GetByQuestion: Symbol(AnswerGetByQuestionUseCase.name),
};

export const AnswerServiceDIToken = Symbol(AnswerService.name);