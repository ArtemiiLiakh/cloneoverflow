import { UseCase } from '@common/services/UseCase';
import { AnswerGetByQuestionInput, AnswerGetByQuestionOutput } from './dto';

export interface IAnswerGetByQuestionUseCase extends UseCase<AnswerGetByQuestionInput, AnswerGetByQuestionOutput> {}