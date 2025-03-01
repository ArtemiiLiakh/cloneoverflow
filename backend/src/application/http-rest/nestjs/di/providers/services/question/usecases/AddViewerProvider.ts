import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionRepository, QuestionUserRepository, UnitOfWork } from '@core/repositories';
import { QuestionAddViewerUseCase } from '@core/services/question';
import { Provider } from '@nestjs/common';

export const QuestionAddViewerUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.AddViewer,
  
  useFactory: (
    questionRepository: QuestionRepository, 
    questionUserRepository: QuestionUserRepository, 
    unitOfWork: UnitOfWork,
  ) => new QuestionAddViewerUseCase(questionRepository, questionUserRepository, unitOfWork),

  inject: [
    PrismaRepositoryDITokens.QuestionRepository, 
    PrismaRepositoryDITokens.QuestionUserRepository,
    PrismaRepositoryDITokens.UnitOfWork,
  ],
};