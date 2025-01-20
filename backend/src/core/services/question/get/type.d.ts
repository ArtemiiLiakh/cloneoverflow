import { UseCase } from '@common/usecase/UseCase';
import { QuestionGetInput, QuestionGetOutput } from './dto';

export interface IQuestionGetUseCase extends UseCase<QuestionGetInput, QuestionGetOutput> {}
