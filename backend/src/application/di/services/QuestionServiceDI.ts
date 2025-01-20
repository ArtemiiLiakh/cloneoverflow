import { QuestionServiceFacade } from '@application/services/QuestionServiceFacade';
import { QuestionAddViewerUseCase } from '@core/services/question/addViewer/usecase';
import { QuestionCloseUseCase } from '@core/services/question/close/usecase';
import { QuestionCreateUseCase } from '@core/services/question/create/usecase';
import { QuestionDeleteUseCase } from '@core/services/question/delete/usecase';
import { QuestionGetUseCase } from '@core/services/question/get/usecase';
import { QuestionGetManyUseCase } from '@core/services/question/getMany/usecase';
import { QuestionOpenUseCase } from '@core/services/question/open/usecase';
import { QuestionUpdateUseCase } from '@core/services/question/update/usecase';
import { QuestionVoteUseCase } from '@core/services/question/vote/usecase';
import {
  PrismaAnswerRepositoryDI,
  PrismaQuestionRepositoryDI,
  PrismaQuestionUserRepositoryDI,
  PrismaTransactionDI,
} from '../repositories/PrismaRepositoriesDI';
import { QuestionAddViewerService } from '@core/services/question/addViewer/service';

const CreateUseCaseDI = new QuestionCreateUseCase(
  PrismaTransactionDI,
);

const UpdateUseCaseDI = new QuestionUpdateUseCase(
  PrismaQuestionRepositoryDI,
  PrismaTransactionDI,
);

const DeleteUseCaseDI = new QuestionDeleteUseCase(
  PrismaQuestionRepositoryDI,
);

const GetAllUseCaseDI = new QuestionGetManyUseCase(PrismaQuestionRepositoryDI);

const AddViewerServiceDI = new QuestionAddViewerService(
  PrismaQuestionUserRepositoryDI,
  PrismaTransactionDI,
);

const AddViewerUseCaseDI = new QuestionAddViewerUseCase(
  PrismaQuestionRepositoryDI,
  AddViewerServiceDI,
);

const GetUseCaseDI = new QuestionGetUseCase(
  PrismaQuestionRepositoryDI, 
  PrismaQuestionUserRepositoryDI,
  AddViewerUseCaseDI,
);

const QuestionVoteUseCaseDI = new QuestionVoteUseCase(
  PrismaQuestionRepositoryDI, 
  PrismaQuestionUserRepositoryDI,
  PrismaTransactionDI,
);

const QuestionOpenUseCaseDI = new QuestionOpenUseCase(
  PrismaQuestionRepositoryDI, 
  PrismaTransactionDI,
);

const QuestionCloseUseCaseDI = new QuestionCloseUseCase(
  PrismaQuestionRepositoryDI, 
  PrismaAnswerRepositoryDI, 
  PrismaTransactionDI,
);

export const questionServiceFacadeDI = QuestionServiceFacade.new({
  questionCreateUseCase: CreateUseCaseDI,
  questionUpdateUseCase: UpdateUseCaseDI,
  questionDeleteUseCase: DeleteUseCaseDI,
  questionGetManyUseCase: GetAllUseCaseDI,
  questionGetUseCase: GetUseCaseDI,
  questionOpenUseCase: QuestionOpenUseCaseDI,
  questionCloseUseCase: QuestionCloseUseCaseDI,
  questionVoteUseCase: QuestionVoteUseCaseDI,
});

export const questionUseCasesDI = {
  CreateUseCaseDI,
  UpdateUseCaseDI,
  DeleteUseCaseDI,
  GetAllUseCaseDI,
  AddViewerUseCaseDI,
  GetUseCaseDI,
  QuestionVoteUseCaseDI,
  QuestionOpenUseCaseDI,
  QuestionCloseUseCaseDI,
};