import { UseCase } from '@common/usecase/UseCase';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';

export interface IQuestionCreateUseCase extends UseCase<QuestionServiceInput.Create, QuestionServiceOutput.Create> {}
export interface IQuestionUpdateUseCase extends UseCase<QuestionServiceInput.Update, QuestionServiceOutput.Update> {}
export interface IQuestionDeleteUseCase extends UseCase<QuestionServiceInput.Delete, QuestionServiceOutput.Delete> {}
export interface IQuestionGetUseCase extends UseCase<QuestionServiceInput.Get, QuestionServiceOutput.Get> {}
export interface IQuestionGetAllUseCase extends UseCase<QuestionServiceInput.GetAll, QuestionServiceOutput.GetAll> {}
export interface IQuestionVoteUseCase extends UseCase<QuestionServiceInput.VoteQuestion, QuestionServiceOutput.VoteQuestion> {}
export interface IQuestionOpenUseCase extends UseCase<QuestionServiceInput.OpenQuestion, QuestionServiceOutput.OpenQuestion> {}
export interface IQuestionCloseUseCase extends UseCase<QuestionServiceInput.CloseQuestion, QuestionServiceOutput.CloseQuestion> {}
export interface IQuestionAddViewerUseCase extends UseCase<QuestionServiceInput.AddViewer, QuestionServiceOutput.AddViewer> {}