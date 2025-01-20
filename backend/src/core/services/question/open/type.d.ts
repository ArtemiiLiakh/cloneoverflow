import { UseCase } from '@common/usecase/UseCase';
import { QuestionOpenInput, QuestionOpenOutput } from './dto';

export interface IQuestionOpenUseCase extends UseCase<QuestionOpenInput, QuestionOpenOutput> {}
