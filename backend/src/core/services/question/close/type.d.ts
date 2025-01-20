import { UseCase } from '@common/usecase/UseCase';
import { QuestionCloseInput, QuestionCloseOutput } from './dto';

export interface IQuestionCloseUseCase extends UseCase<QuestionCloseInput, QuestionCloseOutput> {}
