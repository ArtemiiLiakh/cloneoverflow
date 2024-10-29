import { AnswerServiceFacade } from "@app/services/AnswerServiceFacade";
import { AnswerCreateUseCase } from "@core/service/answer/usecase/create";
import { AnswerDeleteUseCase } from "@core/service/answer/usecase/delete";
import { AnswerGetUseCase } from "@core/service/answer/usecase/get";
import { AnswerGetAllUseCase } from "@core/service/answer/usecase/getAll";
import { AnswerUpdateUseCase } from "@core/service/answer/usecase/update";
import { AnswerVoteUseCase } from "@core/service/answer/usecase/vote";
import PrismaAnswerRepositoryDI from "../repositories/PrismaAnswerRepositoryDI";
import PrismaTransactionUnitDI from "../repositories/PrismaTransactionUnitDI";

const CreateUseCaseDI = new AnswerCreateUseCase(PrismaTransactionUnitDI);
const DeleteUseCaseDI = new AnswerDeleteUseCase(PrismaAnswerRepositoryDI, PrismaTransactionUnitDI);
const UpdateUseCaseDI = new AnswerUpdateUseCase(PrismaAnswerRepositoryDI);
const GetUseCaseDI = new AnswerGetUseCase(PrismaAnswerRepositoryDI);
const GetAllUseCaseDI = new AnswerGetAllUseCase(PrismaAnswerRepositoryDI);
const VoteAnswerUseCaseDI = new AnswerVoteUseCase(PrismaAnswerRepositoryDI, PrismaTransactionUnitDI);

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