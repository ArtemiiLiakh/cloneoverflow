import { Provider } from '@nestjs/common';
import { QuestionServiceDIToken, QuestionUseCaseDITokens } from '../../../tokens/services';
import { QuestionServiceFacade } from '@application/facades/QuestionServiceFacade';
import { 
  IQuestionAddViewerUseCase, 
  IQuestionCloseUseCase, 
  IQuestionCreateUseCase,
  IQuestionDeleteUseCase,
  IQuestionGetManyUseCase,
  IQuestionGetUseCase,
  IQuestionGetVoteUseCase,
  IQuestionOpenUseCase,
  IQuestionUpdateUseCase,
  IQuestionVoteUseCase,
} from '@core/services/question/types';

export const QuestionServiceProvider: Provider = {
  provide: QuestionServiceDIToken,

  useFactory: (
    questionAddViewerUseCase: IQuestionAddViewerUseCase,
    questionCloseUseCase: IQuestionCloseUseCase,
    questionCreateUseCase: IQuestionCreateUseCase,
    questionDeleteUseCase: IQuestionDeleteUseCase,
    questionGetManyUseCase: IQuestionGetManyUseCase,
    questionGetUseCase: IQuestionGetUseCase,
    questionGetVoteUseCase: IQuestionGetVoteUseCase,
    questionOpenUseCase: IQuestionOpenUseCase,
    questionUpdateUseCase: IQuestionUpdateUseCase,
    questionVoteUseCase: IQuestionVoteUseCase,
  ) => QuestionServiceFacade.new({
    questionAddViewerUseCase,
    questionCloseUseCase,
    questionCreateUseCase,
    questionDeleteUseCase,
    questionGetManyUseCase,
    questionGetUseCase,
    questionGetVoteUseCase,
    questionOpenUseCase,
    questionUpdateUseCase,
    questionVoteUseCase,
  }),
  
  inject: [
    QuestionUseCaseDITokens.AddViewer,
    QuestionUseCaseDITokens.Close,
    QuestionUseCaseDITokens.Create,
    QuestionUseCaseDITokens.Delete,
    QuestionUseCaseDITokens.GetMany,
    QuestionUseCaseDITokens.Get,
    QuestionUseCaseDITokens.GetVote,
    QuestionUseCaseDITokens.Open,
    QuestionUseCaseDITokens.Update,
    QuestionUseCaseDITokens.Vote,
  ],
};