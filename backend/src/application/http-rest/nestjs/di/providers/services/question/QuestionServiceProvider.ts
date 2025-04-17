import { Provider } from '@nestjs/common';
import { QuestionServiceDIToken, QuestionUseCaseDITokens } from '../../../tokens/services';
import { QuestionServiceFacade } from '@application/facades/QuestionServiceFacade';
import { 
  IQuestionAddViewerUseCase, 
  IQuestionCloseUseCase, 
  IQuestionCreateUseCase,
  IQuestionDeleteUseCase,
  IQuestionGetDetailsUseCase,
  IQuestionGetUseCase,
  IQuestionGetVoterUseCase,
  IQuestionOpenUseCase,
  IQuestionUpdateUseCase,
  IQuestionVoteUseCase,
} from '@core/services/question/types';

export const QuestionServiceProvider: Provider = {
  provide: QuestionServiceDIToken,

  useFactory: (
    AddViewerUseCase: IQuestionAddViewerUseCase,
    CloseUseCase: IQuestionCloseUseCase,
    CreateUseCase: IQuestionCreateUseCase,
    DeleteUseCase: IQuestionDeleteUseCase,
    GetUseCase: IQuestionGetUseCase,
    GetVoterUseCase: IQuestionGetVoterUseCase,
    OpenUseCase: IQuestionOpenUseCase,
    UpdateUseCase: IQuestionUpdateUseCase,
    VoteUseCase: IQuestionVoteUseCase,
    GetDetailsUseCase: IQuestionGetDetailsUseCase,
  ) => QuestionServiceFacade.new({
    AddViewerUseCase,
    CloseUseCase,
    CreateUseCase,
    DeleteUseCase,
    GetUseCase,
    GetVoterUseCase,
    OpenUseCase,
    UpdateUseCase,
    VoteUseCase,
    GetDetailsUseCase,
  }),
  
  inject: [
    QuestionUseCaseDITokens.AddViewer,
    QuestionUseCaseDITokens.Close,
    QuestionUseCaseDITokens.Create,
    QuestionUseCaseDITokens.Delete,
    QuestionUseCaseDITokens.Get,
    QuestionUseCaseDITokens.GetVoter,
    QuestionUseCaseDITokens.Open,
    QuestionUseCaseDITokens.Update,
    QuestionUseCaseDITokens.Vote,
    QuestionUseCaseDITokens.GetDetails,
  ],
};