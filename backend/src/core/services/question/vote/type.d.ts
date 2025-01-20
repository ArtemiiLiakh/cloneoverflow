import { UseCase } from '@common/usecase/UseCase';
import { 
  QuestionVoteInput, 
  QuestionVoteOutput,
} from './dto';

export interface IQuestionVoteUseCase extends UseCase<QuestionVoteInput, QuestionVoteOutput> {}
