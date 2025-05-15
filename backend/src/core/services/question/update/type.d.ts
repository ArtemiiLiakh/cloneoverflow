import { UseCase } from '@common/services/UseCase';
import { 
  QuestionUpdateInput,
  QuestionUpdateOutput,
} from './dto';

export interface IQuestionUpdateUseCase extends UseCase<QuestionUpdateInput, QuestionUpdateOutput> {}
