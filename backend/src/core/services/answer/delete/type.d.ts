import { UseCase } from '@common/services/UseCase';
import { AnswerDeleteInput, AnswerDeleteOutput } from './dto';

export interface IAnswerDeleteUseCase extends UseCase<AnswerDeleteInput, AnswerDeleteOutput> {}
