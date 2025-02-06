import { UseCase } from '@common/services/UseCase';
import { QuestionGetManyInput, QuestionGetManyOutput } from './dto';

export interface IQuestionGetManyUseCase extends UseCase<QuestionGetManyInput, QuestionGetManyOutput> {}
