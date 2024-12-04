import { ValidateAnswerUseCase } from '@core/services/validation/usecases/validateAnswer';
import { ValidateQuestionUseCase } from '@core/services/validation/usecases/validateQuestion';
import { ValidateUserUseCase } from '@core/services/validation/usecases/validateUser';
import {
  PrismaAnswerRepositoryDI,
  PrismaQuestionRepositoryDI,
  PrismaUserRepositoryDI,
} from '../repositories/PrismaRepositoriesDI';

export const ValidateUserUseCaseDI = new ValidateUserUseCase(
  PrismaUserRepositoryDI,
);

export const ValidateQuestionUseCaseDI = new ValidateQuestionUseCase(
  PrismaQuestionRepositoryDI,
);

export const ValidateAnswerUseCaseDI = new ValidateAnswerUseCase(
  PrismaAnswerRepositoryDI,
);