import { QuestionCreateUseCase } from '@application/question/usecases';
import { UnitOfWork } from '@common/repository/UnitOfWork';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@web/di/tokens/services';

export const QuestionCreateUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Create,
  useFactory: (unitOfWork: UnitOfWork) => new QuestionCreateUseCase(unitOfWork),
  inject: [PrismaRepositoryDITokens.UnitOfWork],
};