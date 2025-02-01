import { UseCase } from '@common/services/UseCase';
import { QuestionDeleteInput, QuestionDeleteOutput } from './dto';

export interface IQuestionDeleteUseCase extends UseCase<QuestionDeleteInput, QuestionDeleteOutput> {}
