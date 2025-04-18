import { QuestionServiceFacade } from '@application/service-facades/QuestionServiceFacade';
import { IQuestionToggleFavoriteUseCase } from '@core/services/question/toggleFavorite/type';
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
import { Provider } from '@nestjs/common';
import { QuestionServiceDIToken, QuestionUseCaseDITokens } from '../../../tokens/services';

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
    ToggleFavoriteUseCase: IQuestionToggleFavoriteUseCase,
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
    ToggleFavoriteUseCase,
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
    QuestionUseCaseDITokens.ToggleFavorite,
  ],
};