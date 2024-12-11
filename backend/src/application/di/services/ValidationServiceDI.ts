import { ValidateAnswerUseCase } from '@core/services/validation/usecases/ValidateAnswerUseCase';
import { ValidateQuestionUseCase } from '@core/services/validation/usecases/ValidateQuestionUserCase';
import { ValidateUserUseCase } from '@core/services/validation/usecases/ValidateUserUseCase';
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