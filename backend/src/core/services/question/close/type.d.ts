import { UseCase } from '@common/services/UseCase';
import { QuestionCloseInput, QuestionCloseOutput } from './dto';

export interface IQuestionCloseUseCase extends UseCase<QuestionCloseInput, QuestionCloseOutput> {}
