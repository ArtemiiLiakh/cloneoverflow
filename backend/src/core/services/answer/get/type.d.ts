import { UseCase } from '@common/usecase/UseCase';
import { AnswerGetInput, AnswerGetOutput } from './dto';

export interface IAnswerGetUseCase extends UseCase<AnswerGetInput, AnswerGetOutput> {}
