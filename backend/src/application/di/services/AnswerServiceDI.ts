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
import { AnswerGetVoterUseCase } from '@core/services/answer/getVoter/usercase';

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
);

const GetAllUseCaseDI = new AnswerGetManyUseCase(
  PrismaAnswerRepositoryDI,
);

const VoteUseCaseDI = new AnswerVoteUseCase(
  PrismaAnswerRepositoryDI, 
  PrismaAnswerUserRepositoryDI,
  PrismaTransactionDI,
);

const GetVoterUseCaseDI = new AnswerGetVoterUseCase(PrismaAnswerUserRepositoryDI);

export const answerServiceFacadeDI = AnswerServiceFacade.new({
  answerCreateUseCase: CreateUseCaseDI,
  answerUpdateUseCase: UpdateUseCaseDI,
  answerDeleteUseCase: DeleteUseCaseDI,
  answerGetUseCase: GetUseCaseDI,
  answerGetAllUseCase: GetAllUseCaseDI,
  answerVoteUseCase: VoteUseCaseDI,
  answerGetVoterUseCase: GetVoterUseCaseDI,
});

export const answerUseCaseDI = {
  CreateUseCaseDI,
  DeleteUseCaseDI,
  UpdateUseCaseDI,
  GetUseCaseDI,
  GetAllUseCaseDI,
  VoteUseCaseDI,
};