import { QuestionServiceFacade } from '@application/facades/QuestionServiceFacade';
import {
  QuestionAddViewerUseCase,
  QuestionCloseUseCase,
  QuestionCreateUseCase,
  QuestionDeleteUseCase,
  QuestionGetDetailsUseCase,
  QuestionGetUseCase,
  QuestionGetVoterUseCase,
  QuestionOpenUseCase,
  QuestionUpdateUseCase,
  QuestionVoteUseCase,
} from '@core/services/question';

export const QuestionUseCaseDITokens = {
  AddViewer: Symbol(QuestionAddViewerUseCase.name),
  Close: Symbol(QuestionCloseUseCase.name),
  Create: Symbol(QuestionCreateUseCase.name),
  Delete: Symbol(QuestionDeleteUseCase.name),
  Get: Symbol(QuestionGetUseCase.name),
  GetVoter: Symbol(QuestionGetVoterUseCase.name),
  Open: Symbol(QuestionOpenUseCase.name),
  Update: Symbol(QuestionUpdateUseCase.name),
  Vote: Symbol(QuestionVoteUseCase.name),
  GetDetails: Symbol(QuestionGetDetailsUseCase.name),
};

export const QuestionServiceDIToken = Symbol(QuestionServiceFacade.name);