import { QuestionServiceFacade } from '@application/services/QuestionServiceFacade';
import { QuestionAddViewerUseCase } from '@core/services/question/usecases/addViewer';
import { QuestionCloseUseCase } from '@core/services/question/usecases/close';
import { QuestionCreateUseCase } from '@core/services/question/usecases/create';
import { QuestionDeleteUseCase } from '@core/services/question/usecases/delete';
import { QuestionGetUseCase } from '@core/services/question/usecases/get';
import { QuestionGetAllUseCase } from '@core/services/question/usecases/getAll';
import { QuestionUpdateUseCase } from '@core/services/question/usecases/update';
import { QuestionVoteUseCase } from '@core/services/question/usecases/vote';
import {
  PrismaAnswerRepositoryDI,
  PrismaQuestionRepositoryDI,
  PrismaTransactionDI,
} from '../repositories/PrismaRepositoriesDI';
import { ValidateUserUseCaseDI } from './ValidationServiceDI';

const CreateUseCaseDI = new QuestionCreateUseCase(
  ValidateUserUseCaseDI, 
  PrismaTransactionDI,
);

const UpdateUseCaseDI = new QuestionUpdateUseCase(
  ValidateUserUseCaseDI, 
  PrismaQuestionRepositoryDI,
  PrismaTransactionDI,
);

const DeleteUseCaseDI = new QuestionDeleteUseCase(
  ValidateUserUseCaseDI, 
  PrismaQuestionRepositoryDI,
);

const GetAllUseCaseDI = new QuestionGetAllUseCase(PrismaQuestionRepositoryDI);

const AddViewerUseCaseDI = new QuestionAddViewerUseCase(
  ValidateUserUseCaseDI, 
  PrismaQuestionRepositoryDI,
  PrismaTransactionDI,
);

const GetUseCaseDI = new QuestionGetUseCase(
  ValidateUserUseCaseDI, 
  PrismaQuestionRepositoryDI, 
  AddViewerUseCaseDI,
);

const VoteQuestionUseCaseDI = new QuestionVoteUseCase(
  ValidateUserUseCaseDI, 
  PrismaQuestionRepositoryDI, 
  PrismaTransactionDI,
);

const CloseQuestionUseCaseUseCaseDI = new QuestionCloseUseCase(
  ValidateUserUseCaseDI, 
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
  questionCloseUseCase: CloseQuestionUseCaseUseCaseDI,
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
  CloseQuestionUseCaseUseCaseDI,
};