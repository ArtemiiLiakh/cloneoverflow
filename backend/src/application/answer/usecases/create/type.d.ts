import { UseCase } from '@common/services/UseCase';
import { AnswerCreateInput, AnswerCreateOutput } from './dto';

export interface IAnswerCreateUseCase extends UseCase<AnswerCreateInput, AnswerCreateOutput> {}
