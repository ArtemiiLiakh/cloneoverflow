import { UseCase } from '@common/services/UseCase';
import { 
  QuestionVoteInput, 
  QuestionVoteOutput,
} from './dto';

export interface IQuestionVoteUseCase extends UseCase<QuestionVoteInput, QuestionVoteOutput> {}
