import {
  QuestionAddViewerUseCase,
  QuestionCloseUseCase,
  QuestionCreateUseCase,
  QuestionDeleteUseCase,
  QuestionGetManyUseCase,
  QuestionGetUseCase,
  QuestionGetVoterUseCase,
  QuestionOpenUseCase,
  QuestionUpdateUseCase,
  QuestionVoteUseCase,
} from '@core/services/question';

import {
  PrismaAnswerRepositoryDI,
  PrismaQuestionRepositoryDI,
  PrismaQuestionUserRepositoryDI,
  PrismaTransactionDI,
} from '../repositories/PrismaRepositoriesDI';

import { QuestionServiceFacade } from '@application/facades/QuestionServiceFacade';
import { UserRatingValidatorDI } from '../security/validators/UserRatingValidatorDI';

const CreateUseCaseDI = new QuestionCreateUseCase(
  PrismaTransactionDI,
);

const UpdateUseCaseDI = new QuestionUpdateUseCase(
  UserRatingValidatorDI,
  PrismaQuestionRepositoryDI,
  PrismaTransactionDI,
);

const DeleteUseCaseDI = new QuestionDeleteUseCase(
  PrismaQuestionRepositoryDI,
);

const GetAllUseCaseDI = new QuestionGetManyUseCase(PrismaQuestionRepositoryDI);

const AddViewerUseCaseDI = new QuestionAddViewerUseCase(
  PrismaQuestionRepositoryDI,
  PrismaQuestionUserRepositoryDI,
  PrismaTransactionDI,
);

const GetUseCaseDI = new QuestionGetUseCase(
  PrismaQuestionRepositoryDI, 
);

const QuestionVoteUseCaseDI = new QuestionVoteUseCase(
  UserRatingValidatorDI,
  PrismaQuestionRepositoryDI, 
  PrismaQuestionUserRepositoryDI,
  PrismaTransactionDI,
);

const QuestionOpenUseCaseDI = new QuestionOpenUseCase(
  UserRatingValidatorDI,
  PrismaQuestionRepositoryDI, 
  PrismaTransactionDI,
);

const QuestionCloseUseCaseDI = new QuestionCloseUseCase(
  UserRatingValidatorDI,
  PrismaQuestionRepositoryDI, 
  PrismaAnswerRepositoryDI, 
  PrismaTransactionDI,
);

const QuestionGetVoterUseCaseDI = new QuestionGetVoterUseCase(
  PrismaQuestionUserRepositoryDI,
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
  questionAddViewerUseCase: AddViewerUseCaseDI,
  questionGetVoterUseCase: QuestionGetVoterUseCaseDI,
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
  QuestionGetVoterUseCaseDI,
};