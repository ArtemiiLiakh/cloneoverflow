import { QuestionServiceFacade } from '@application/services/QuestionServiceFacade';
import { QuestionAddViewerUseCase } from '@core/service/question/usecase/addViewer';
import { QuestionCloseUseCase } from '@core/service/question/usecase/close';
import { QuestionCreateUseCase } from '@core/service/question/usecase/create';
import { QuestionDeleteUseCase } from '@core/service/question/usecase/delete';
import { QuestionGetUseCase } from '@core/service/question/usecase/get';
import { QuestionGetAllUseCase } from '@core/service/question/usecase/getAll';
import { QuestionUpdateUseCase } from '@core/service/question/usecase/update';
import { QuestionVoteUseCase } from '@core/service/question/usecase/vote';
import { 
  PrismaQuestionRepositoryDI, 
  PrismaAnswerRepositoryDI, 
  PrismaTransactionDI,
} from '../repositories/PrismaRepositoriesDI';

const CreateUseCaseDI = new QuestionCreateUseCase(PrismaTransactionDI);
const UpdateUseCaseDI = new QuestionUpdateUseCase(PrismaQuestionRepositoryDI, PrismaTransactionDI);
const DeleteUseCaseDI = new QuestionDeleteUseCase(PrismaQuestionRepositoryDI);
const GetAllUseCaseDI = new QuestionGetAllUseCase(PrismaQuestionRepositoryDI);
const AddViewerUseCaseDI = new QuestionAddViewerUseCase(PrismaQuestionRepositoryDI, PrismaTransactionDI);
const GetUseCaseDI = new QuestionGetUseCase(PrismaQuestionRepositoryDI, AddViewerUseCaseDI);
const VoteQuestionUseCaseDI = new QuestionVoteUseCase(PrismaQuestionRepositoryDI, PrismaTransactionDI);
const CloseQuestionUseCaseUseCaseDI = new QuestionCloseUseCase(PrismaQuestionRepositoryDI, PrismaAnswerRepositoryDI, PrismaTransactionDI);

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