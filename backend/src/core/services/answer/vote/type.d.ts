import { UseCase } from '@common/usecase/UseCase';
import { AnswerVoteInput, AnswerVoteOutput } from './dto';

export interface IAnswerVoteUseCase extends UseCase<AnswerVoteInput, AnswerVoteOutput> {}
