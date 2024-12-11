import { UseCase } from '@common/usecase/UseCase';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';

export interface IAnswerCreateUseCase extends UseCase<AnswerServiceInput.Create, AnswerServiceOutput.Create> {}
export interface IAnswerGetUseCase extends UseCase<AnswerServiceInput.Get, AnswerServiceOutput.Get> {}
export interface IAnswerUpdateUseCase extends UseCase<AnswerServiceInput.Update, AnswerServiceOutput.Update> {}
export interface IAnswerDeleteUseCase extends UseCase<AnswerServiceInput.Delete, AnswerServiceOutput.Delete> {}
export interface IAnswerVoteUseCase extends UseCase<AnswerServiceInput.VoteAnswer, AnswerServiceOutput.VoteAnswer> {}
export interface IAnswerGetAllUseCase extends UseCase<AnswerServiceInput.GetAll, AnswerServiceOutput.GetAll> {}