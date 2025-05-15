import {
  AnswerCreateUseCase,
  AnswerDeleteUseCase,
  AnswerGetManyUseCase,
  AnswerGetUseCase,
  AnswerGetVoterUseCase,
  AnswerUpdateUseCase,
  AnswerVoteUseCase,
} from '@core/services/answer';

import {
  PrismaAnswerRepositoryDI,
  PrismaAnswerUserRepositoryDI,
  PrismaQuestionRepositoryDI,
  PrismaTransactionDI,
} from '../repositories/PrismaRepositoriesDI';

import { AnswerServiceFacade } from '@application/facades/AnswerServiceFacade';
import { UserRatingValidatorDI } from '../security/validators/UserRatingValidatorDI';

const CreateUseCaseDI = new AnswerCreateUseCase(
  PrismaQuestionRepositoryDI, 
  PrismaTransactionDI,
);
const DeleteUseCaseDI = new AnswerDeleteUseCase(
  PrismaAnswerRepositoryDI, 
  PrismaTransactionDI,
);

const UpdateUseCaseDI = new AnswerUpdateUseCase(
  UserRatingValidatorDI,
  PrismaAnswerRepositoryDI,
);

const GetUseCaseDI = new AnswerGetUseCase(
  PrismaAnswerRepositoryDI,
);

const GetAllUseCaseDI = new AnswerGetManyUseCase(
  PrismaAnswerRepositoryDI,
);

const VoteUseCaseDI = new AnswerVoteUseCase(
  UserRatingValidatorDI,
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