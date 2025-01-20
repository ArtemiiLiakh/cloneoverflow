import { UseCase } from '@common/usecase/UseCase';
import { AnswerUpdateInput, AnswerUpdateOutput } from './dto';

export interface IAnswerUpdateUseCase extends UseCase<AnswerUpdateInput, AnswerUpdateOutput> {}
