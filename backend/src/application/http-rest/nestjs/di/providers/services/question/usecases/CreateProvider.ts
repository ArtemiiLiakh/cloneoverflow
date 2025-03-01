import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { UnitOfWork } from '@core/repositories';
import { QuestionCreateUseCase } from '@core/services/question';
import { Provider } from '@nestjs/common';

export const QuestionCreateUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Create,
  useFactory: (unitOfWork: UnitOfWork) => new QuestionCreateUseCase(unitOfWork),
  inject: [PrismaRepositoryDITokens.UnitOfWork],
};