import { UseCase } from '@common/usecase/UseCase';
import { QuestionGetManyInput, QuestionGetManyOutput } from './dto';

export interface IQuestionGetManyUseCase extends UseCase<QuestionGetManyInput, QuestionGetManyOutput> {}
