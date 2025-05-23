import { UseCase } from '@common/services/UseCase';
import { QuestionAddViewerInput, QuestionAddViewerOutput } from './dto';

export interface IQuestionAddViewerUseCase extends UseCase<QuestionAddViewerInput, QuestionAddViewerOutput> {}
