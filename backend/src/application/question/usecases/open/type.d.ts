import { UseCase } from '@common/services/UseCase';
import { QuestionOpenInput, QuestionOpenOutput } from './dto';

export interface IQuestionOpenUseCase extends UseCase<QuestionOpenInput, QuestionOpenOutput> {}
