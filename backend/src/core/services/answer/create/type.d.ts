import { UseCase } from '@common/usecase/UseCase';
import { AnswerCreateInput, AnswerCreateOutput } from './dto';

export interface IAnswerCreateUseCase extends UseCase<AnswerCreateInput, AnswerCreateOutput> {}
