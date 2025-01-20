import { UseCase } from '@common/usecase/UseCase';
import { 
  QuestionUpdateInput,
  QuestionUpdateOutput,
} from './dto';

export interface IQuestionUpdateUseCase extends UseCase<QuestionUpdateInput, QuestionUpdateOutput> {}
