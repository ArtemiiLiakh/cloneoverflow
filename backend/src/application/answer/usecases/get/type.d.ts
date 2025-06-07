import { UseCase } from '@common/services/UseCase';
import { AnswerGetInput, AnswerGetOutput } from './dto';

export interface IAnswerGetUseCase extends UseCase<AnswerGetInput, AnswerGetOutput> {}
