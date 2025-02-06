import { UseCase } from '@common/services/UseCase';
import { AnswerGetVoterInput, AnswerGetVoterOutput } from './dto';

export interface IAnswerGetVoterUseCase extends UseCase<AnswerGetVoterInput, AnswerGetVoterOutput> {}