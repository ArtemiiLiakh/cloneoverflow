import { UseCase } from '@common/services/UseCase';
import { QuestionGetVoteInput, QuestionGetVoteOutput } from './dto';

export interface IQuestionGetVoteUseCase extends UseCase<QuestionGetVoteInput, QuestionGetVoteOutput> {}