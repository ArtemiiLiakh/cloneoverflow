import { QuestionOpenUseCase } from '@application/question/usecases';
import { UnitOfWork } from '@common/repository/UnitOfWork';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@web/di/tokens/services';

export const QuestionOpenUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.Open,
  
  useFactory: (
    questionRepository: QuestionRepository, 
    unitOfWork: UnitOfWork,
  ) => new QuestionOpenUseCase(
    questionRepository, 
    unitOfWork,
  ),
  
  inject: [
    PrismaRepositoryDITokens.QuestionRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};