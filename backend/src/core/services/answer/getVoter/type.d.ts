import { UseCase } from '@common/usecase/UseCase';
import { AnswerGetVoterInput, AnswerGetVoterOutput } from './dto';

export interface IAnswerGetVoterUseCase extends UseCase<AnswerGetVoterInput, AnswerGetVoterOutput> {}