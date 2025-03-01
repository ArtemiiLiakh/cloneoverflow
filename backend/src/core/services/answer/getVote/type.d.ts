import { UseCase } from '@common/services/UseCase';
import { AnswerGetVoteInput, AnswerGetVoteOutput } from './dto';

export interface IAnswerGetVoteUseCase extends UseCase<AnswerGetVoteInput, AnswerGetVoteOutput> {}