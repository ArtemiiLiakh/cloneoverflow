import { UseCase } from '@common/services/UseCase';
import { AnswerUpdateInput, AnswerUpdateOutput } from './dto';

export interface IAnswerUpdateUseCase extends UseCase<AnswerUpdateInput, AnswerUpdateOutput> {}
