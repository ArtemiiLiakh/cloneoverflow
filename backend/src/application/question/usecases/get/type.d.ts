import { UseCase } from '@common/services/UseCase';
import { QuestionGetInput, QuestionGetOutput } from './dto';

export interface IQuestionGetUseCase extends UseCase<QuestionGetInput, QuestionGetOutput> {}
