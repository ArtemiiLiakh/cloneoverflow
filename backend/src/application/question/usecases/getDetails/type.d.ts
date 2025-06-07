import { UseCase } from '@common/services/UseCase';
import { QuestionGetDetailsInput, QuestionGetDetailsOutput } from './dto';

export interface IQuestionGetDetailsUseCase extends UseCase<QuestionGetDetailsInput, QuestionGetDetailsOutput> {}