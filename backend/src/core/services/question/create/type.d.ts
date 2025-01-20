import { UseCase } from '@common/usecase/UseCase';
import { QuestionCreateInput, QuestionCreateOutput } from './dto';

export interface IQuestionCreateUseCase extends UseCase<QuestionCreateInput, QuestionCreateOutput> {}
