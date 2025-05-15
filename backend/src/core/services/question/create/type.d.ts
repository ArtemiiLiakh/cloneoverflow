import { UseCase } from '@common/services/UseCase';
import { QuestionCreateInput, QuestionCreateOutput } from './dto';

export interface IQuestionCreateUseCase extends UseCase<QuestionCreateInput, QuestionCreateOutput> {}
