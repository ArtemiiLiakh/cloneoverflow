import { QuestionServiceFacade } from '@application/services/QuestionServiceFacade';
import { QuestionAddViewerUseCase } from '@core/services/question/usecases/addViewer';
import { QuestionCloseUseCase } from '@core/services/question/usecases/close';
import { QuestionCreateUseCase } from '@core/services/question/usecases/create';
import { QuestionDeleteUseCase } from '@core/services/question/usecases/delete';
import { QuestionGetUseCase } from '@core/services/question/usecases/get';
import { QuestionGetAllUseCase } from '@core/services/question/usecases/getAll';
import { QuestionOpenUseCase } from '@core/services/question/usecases/open';
import { QuestionUpdateUseCase } from '@core/services/question/usecases/update';
import { QuestionVoteUseCase } from '@core/services/question/usecases/vote';
import {
  PrismaAnswerRepositoryDI,
  PrismaQuestionRepositoryDI,
  PrismaQuestionUserRepositoryDI,
  PrismaTransactionDI,
} from '../repositories/PrismaRepositoriesDI';

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

const GetAllUseCaseDI = new QuestionGetAllUseCase(PrismaQuestionRepositoryDI);

const AddViewerUseCaseDI = new QuestionAddViewerUseCase(
  PrismaQuestionRepositoryDI,
  PrismaQuestionUserRepositoryDI, 
  PrismaTransactionDI,
);

const GetUseCaseDI = new QuestionGetUseCase(
  PrismaQuestionRepositoryDI, 
  PrismaQuestionUserRepositoryDI,
  AddViewerUseCaseDI,
);

const VoteQuestionUseCaseDI = new QuestionVoteUseCase(
  PrismaQuestionRepositoryDI, 
  PrismaQuestionUserRepositoryDI,
  PrismaTransactionDI,
);

const OpenQuestionUseCaseDI = new QuestionOpenUseCase(
  PrismaQuestionRepositoryDI, 
  PrismaTransactionDI, 
);

const CloseQuestionUseCaseDI = new QuestionCloseUseCase(
  PrismaQuestionRepositoryDI, 
  PrismaAnswerRepositoryDI, 
  PrismaTransactionDI,
);

export const questionServiceFacadeDI = QuestionServiceFacade.new({
  questionCreateUseCase: CreateUseCaseDI,
  questionUpdateUseCase: UpdateUseCaseDI,
  questionDeleteUseCase: DeleteUseCaseDI,
  questionGetAllUseCase: GetAllUseCaseDI,
  questionGetUseCase: GetUseCaseDI,
  questionOpenUseCase: OpenQuestionUseCaseDI,
  questionCloseUseCase: CloseQuestionUseCaseDI,
  questionVoteUseCase: VoteQuestionUseCaseDI,
});

export const questionUseCasesDI = {
  CreateUseCaseDI,
  UpdateUseCaseDI,
  DeleteUseCaseDI,
  GetAllUseCaseDI,
  AddViewerUseCaseDI,
  GetUseCaseDI,
  VoteQuestionUseCaseDI,
  OpenQuestionUseCaseDI,
  CloseQuestionUseCaseDI,
};