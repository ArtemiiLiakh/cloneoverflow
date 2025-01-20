import { UseCase } from '@common/usecase/UseCase';
import { QuestionAddViewerInput, QuestionAddViewerOutput, QuestionAddViewerServiceInput, QuestionAddViewerServiceOutput } from './dto';

export interface IQuestionAddViewerUseCase extends UseCase<QuestionAddViewerInput, QuestionAddViewerOutput> {}
export interface IQuestionAddViewerService extends UseCase<QuestionAddViewerServiceInput, QuestionAddViewerServiceOutput> {}
