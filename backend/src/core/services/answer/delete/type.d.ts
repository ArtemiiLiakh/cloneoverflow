import { UseCase } from '@common/usecase/UseCase';
import { AnswerDeleteInput, AnswerDeleteOutput } from './dto';

export interface IAnswerDeleteUseCase extends UseCase<AnswerDeleteInput, AnswerDeleteOutput> {}
