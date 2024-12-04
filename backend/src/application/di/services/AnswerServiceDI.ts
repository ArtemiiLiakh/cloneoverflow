import { AnswerServiceFacade } from '@application/services/AnswerServiceFacade';
import { AnswerCreateUseCase } from '@core/services/answer/usecases/create';
import { AnswerDeleteUseCase } from '@core/services/answer/usecases/delete';
import { AnswerGetUseCase } from '@core/services/answer/usecases/get';
import { AnswerGetAllUseCase } from '@core/services/answer/usecases/getAll';
import { AnswerUpdateUseCase } from '@core/services/answer/usecases/update';
import { AnswerVoteUseCase } from '@core/services/answer/usecases/vote';
import {
  PrismaAnswerRepositoryDI,
  PrismaTransactionDI,
} from '../repositories/PrismaRepositoriesDI';
import {
  ValidateQuestionUseCaseDI,
  ValidateUserUseCaseDI,
} from './ValidationServiceDI';

const CreateUseCaseDI = new AnswerCreateUseCase(
  ValidateUserUseCaseDI,
  ValidateQuestionUseCaseDI, 
  PrismaTransactionDI,
);
const DeleteUseCaseDI = new AnswerDeleteUseCase(
  ValidateUserUseCaseDI, 
  PrismaAnswerRepositoryDI, 
  PrismaTransactionDI,
);


const UpdateUseCaseDI = new AnswerUpdateUseCase(
  ValidateUserUseCaseDI,
  PrismaAnswerRepositoryDI,
);

const GetUseCaseDI = new AnswerGetUseCase(
  ValidateUserUseCaseDI,
  PrismaAnswerRepositoryDI,
);

const GetAllUseCaseDI = new AnswerGetAllUseCase(
  PrismaAnswerRepositoryDI,
);

const VoteAnswerUseCaseDI = new AnswerVoteUseCase(
  ValidateUserUseCaseDI,
  PrismaAnswerRepositoryDI, 
  PrismaTransactionDI,
);

export const answerServiceFacadeDI = AnswerServiceFacade.new({
  answerCreateUseCase: CreateUseCaseDI,
  answerUpdateUseCase: UpdateUseCaseDI,
  answerDeleteUseCase: DeleteUseCaseDI,
  answerGetUseCase: GetUseCaseDI,
  answerGetAllUseCase: GetAllUseCaseDI,
  answerVoteUseCase: VoteAnswerUseCaseDI,
});

export const answerUseCaseDI = {
  CreateUseCaseDI,
  DeleteUseCaseDI,
  UpdateUseCaseDI,
  GetUseCaseDI,
  GetAllUseCaseDI,
  VoteAnswerUseCaseDI,
};