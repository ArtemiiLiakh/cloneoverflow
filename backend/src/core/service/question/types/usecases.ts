import { UseCase } from '@common/usecase/UseCase';
import { QuestionServiceInput } from '../dto/QuestionServiceInput';
import { QuestionServiceOutput } from '../dto/QuestionServiceOutput';

export interface IQuestionCreateUseCase extends UseCase<QuestionServiceInput.Create, QuestionServiceOutput.Create> {}
export interface IQuestionUpdateUseCase extends UseCase<QuestionServiceInput.Update, QuestionServiceOutput.Update> {}
export interface IQuestionDeleteUseCase extends UseCase<QuestionServiceInput.Delete, QuestionServiceOutput.Delete> {}
export interface IQuestionGetUseCase extends UseCase<QuestionServiceInput.Get, QuestionServiceOutput.Get> {}
export interface IQuestionGetAllUseCase extends UseCase<QuestionServiceInput.GetAll, QuestionServiceOutput.GetAll> {}
export interface IQuestionVoteUseCase extends UseCase<QuestionServiceInput.VoteQuestion, QuestionServiceOutput.VoteQuestion> {}
export interface IQuestionCloseUseCase extends UseCase<QuestionServiceInput.CloseQuestion, QuestionServiceOutput.CloseQuestion> {}
export interface IQuestionAddViewerUseCase extends UseCase<QuestionServiceInput.AddViewer, QuestionServiceOutput.AddViewer> {}