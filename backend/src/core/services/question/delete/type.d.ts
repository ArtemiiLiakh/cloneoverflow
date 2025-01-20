import { UseCase } from '@common/usecase/UseCase';
import { QuestionDeleteInput, QuestionDeleteOutput } from './dto';

export interface IQuestionDeleteUseCase extends UseCase<QuestionDeleteInput, QuestionDeleteOutput> {}
