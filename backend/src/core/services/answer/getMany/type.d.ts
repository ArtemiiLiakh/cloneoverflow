import { UseCase } from '@common/services/UseCase';
import { AnswerGetManyInput, AnswerGetManyOutput } from './dto';

export interface IAnswerGetManyUseCase extends UseCase<AnswerGetManyInput, AnswerGetManyOutput> {}
