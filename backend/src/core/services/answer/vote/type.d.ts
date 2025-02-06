import { UseCase } from '@common/services/UseCase';
import { AnswerVoteInput, AnswerVoteOutput } from './dto';

export interface IAnswerVoteUseCase extends UseCase<AnswerVoteInput, AnswerVoteOutput> {}
