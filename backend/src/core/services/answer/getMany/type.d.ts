import { UseCase } from '@common/usecase/UseCase';
import { AnswerGetManyInput, AnswerGetManyOutput } from './dto';

export interface IAnswerGetManyUseCase extends UseCase<AnswerGetManyInput, AnswerGetManyOutput> {}
