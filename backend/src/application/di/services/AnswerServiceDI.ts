import { AnswerServiceFacade } from '@application/services/AnswerServiceFacade';
import { AnswerCreateUseCase } from '@core/services/answer/create/usecase';
import { AnswerDeleteUseCase } from '@core/services/answer/delete/usecase';
import { AnswerGetUseCase } from '@core/services/answer/get/usecase';
import { AnswerGetManyUseCase } from '@core/services/answer/getMany/usecase';
import { AnswerUpdateUseCase } from '@core/services/answer/update/usecase';
import { AnswerVoteUseCase } from '@core/services/answer/vote/usecase';
import {
  PrismaAnswerRepositoryDI,
  PrismaAnswerUserRepositoryDI,
  PrismaQuestionRepositoryDI,
  PrismaTransactionDI,
} from '../repositories/PrismaRepositoriesDI';

const CreateUseCaseDI = new AnswerCreateUseCase(
  PrismaQuestionRepositoryDI, 
  PrismaTransactionDI,
);
const DeleteUseCaseDI = new AnswerDeleteUseCase(
  PrismaAnswerRepositoryDI, 
  PrismaTransactionDI,
);

const UpdateUseCaseDI = new AnswerUpdateUseCase(
  PrismaAnswerRepositoryDI,
);

const GetUseCaseDI = new AnswerGetUseCase(
  PrismaAnswerRepositoryDI,
  PrismaAnswerUserRepositoryDI,
);

const GetAllUseCaseDI = new AnswerGetManyUseCase(
  PrismaAnswerRepositoryDI,
);

const AnswerVoteUseCaseDI = new AnswerVoteUseCase(
  PrismaAnswerRepositoryDI, 
  PrismaAnswerUserRepositoryDI,
  PrismaTransactionDI,
);

export const answerServiceFacadeDI = AnswerServiceFacade.new({
  answerCreateUseCase: CreateUseCaseDI,
  answerUpdateUseCase: UpdateUseCaseDI,
  answerDeleteUseCase: DeleteUseCaseDI,
  answerGetUseCase: GetUseCaseDI,
  answerGetAllUseCase: GetAllUseCaseDI,
  answerVoteUseCase: AnswerVoteUseCaseDI,
});

export const answerUseCaseDI = {
  CreateUseCaseDI,
  DeleteUseCaseDI,
  UpdateUseCaseDI,
  GetUseCaseDI,
  GetAllUseCaseDI,
  AnswerVoteUseCaseDI,
};