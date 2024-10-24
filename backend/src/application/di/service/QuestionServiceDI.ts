import { QuestionServiceFacade } from "@app/services/QuestionServiceFacade";
import { QuestionCloseUseCase } from "@core/service/question/usecase/close";
import { QuestionCreateUseCase } from "@core/service/question/usecase/create";
import { QuestionDeleteUseCase } from "@core/service/question/usecase/delete";
import { QuestionGetUseCase } from "@core/service/question/usecase/get";
import { QuestionGetAllUseCase } from "@core/service/question/usecase/getAll";
import { QuestionUpdateUseCase } from "@core/service/question/usecase/update";
import { QuestionVoteUseCase } from "@core/service/question/usecase/vote";
import PrismaAnswerRepositoryDI from "../repositories/PrismaAnswerRepositoryDI";
import PrismaQuestionRepositoryDI from "../repositories/PrismaQuestionRepositoryDI";
import PrismaTransactionUnitDI from "../repositories/PrismaTransactionUnitDI";

export const questionServiceFacadeDI = new QuestionServiceFacade(
  new QuestionCreateUseCase(PrismaTransactionUnitDI),
  new QuestionUpdateUseCase(PrismaQuestionRepositoryDI, PrismaTransactionUnitDI),
  new QuestionGetUseCase(PrismaQuestionRepositoryDI, PrismaTransactionUnitDI),
  new QuestionDeleteUseCase(PrismaQuestionRepositoryDI),
  new QuestionGetAllUseCase(PrismaQuestionRepositoryDI),
  new QuestionVoteUseCase(PrismaQuestionRepositoryDI, PrismaTransactionUnitDI),
  new QuestionCloseUseCase(PrismaQuestionRepositoryDI, PrismaAnswerRepositoryDI, PrismaTransactionUnitDI),
);

export const questionUseCasesDI = {
  CreateUseCase: new QuestionCreateUseCase(PrismaTransactionUnitDI),
  UpdateUseCase: new QuestionUpdateUseCase(PrismaQuestionRepositoryDI, PrismaTransactionUnitDI),
  DeleteUseCase: new QuestionDeleteUseCase(PrismaQuestionRepositoryDI),
  GetAllUseCase: new QuestionGetAllUseCase(PrismaQuestionRepositoryDI),
  GetUseCase: new QuestionGetUseCase(PrismaQuestionRepositoryDI, PrismaTransactionUnitDI),
  VoteQuestionUseCase: new QuestionVoteUseCase(PrismaQuestionRepositoryDI, PrismaTransactionUnitDI),
  CloseQuestionUseCaseUseCase: new QuestionCloseUseCase(PrismaQuestionRepositoryDI, PrismaAnswerRepositoryDI, PrismaTransactionUnitDI),
};