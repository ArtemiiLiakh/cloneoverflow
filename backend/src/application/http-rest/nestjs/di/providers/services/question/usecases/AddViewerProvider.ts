import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { QuestionRepository } from '@core/repositories';
import { QuestionAddViewerUseCase } from '@core/services/question';
import { Provider } from '@nestjs/common';

export const QuestionAddViewerUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.AddViewer,
  
  useFactory: (
    questionRepository: QuestionRepository, 
  ) => new QuestionAddViewerUseCase(questionRepository),

  inject: [
    PrismaRepositoryDITokens.QuestionRepository, 
  ],
};