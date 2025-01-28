import { UseCase } from '@common/usecase/UseCase';
import { QuestionAddViewerInput, QuestionAddViewerOutput } from './dto';

export interface IQuestionAddViewerUseCase extends UseCase<QuestionAddViewerInput, QuestionAddViewerOutput> {}
