import { AnswerServiceFacade } from "@app/services/AnswerServiceFacade";
import { AnswerCreateUseCase } from "@core/service/answer/usecase/create";
import { AnswerDeleteUseCase } from "@core/service/answer/usecase/delete";
import { AnswerGetUseCase } from "@core/service/answer/usecase/get";
import { AnswerGetAllUseCase } from "@core/service/answer/usecase/getAll";
import { AnswerUpdateUseCase } from "@core/service/answer/usecase/update";
import { AnswerVoteUseCase } from "@core/service/answer/usecase/vote";
import PrismaAnswerRepositoryDI from "../repositories/PrismaAnswerRepositoryDI";
import PrismaTransactionUnitDI from "../repositories/PrismaTransactionUnitDI";

export const answerServiceFacadeDI = new AnswerServiceFacade(
  new AnswerCreateUseCase(PrismaTransactionUnitDI),
  new AnswerUpdateUseCase(PrismaAnswerRepositoryDI),
  new AnswerDeleteUseCase(PrismaAnswerRepositoryDI, PrismaTransactionUnitDI),
  new AnswerGetUseCase(PrismaAnswerRepositoryDI),
  new AnswerGetAllUseCase(PrismaAnswerRepositoryDI),
  new AnswerVoteUseCase(PrismaAnswerRepositoryDI, PrismaTransactionUnitDI),
);

export const answerUseCaseDI = {
  CreateUseCase: new AnswerCreateUseCase(PrismaTransactionUnitDI),
  DeleteUseCase: new AnswerDeleteUseCase(PrismaAnswerRepositoryDI, PrismaTransactionUnitDI),
  UpdateUseCase: new AnswerUpdateUseCase(PrismaAnswerRepositoryDI),
  GetUseCase: new AnswerGetUseCase(PrismaAnswerRepositoryDI),
  GetAllUseCase: new AnswerGetAllUseCase(PrismaAnswerRepositoryDI),
  VoteAnswerUseCase: new AnswerVoteUseCase(PrismaAnswerRepositoryDI, PrismaTransactionUnitDI),
  CloseAnswerUseCase: new AnswerVoteUseCase(PrismaAnswerRepositoryDI, PrismaTransactionUnitDI),
};