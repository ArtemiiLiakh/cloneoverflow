import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { FavoriteQuestionRepository, QuestionRepository } from '@core/repositories';
import { QuestionToggleFavoriteUseCase } from '@core/services/question/toggleFavorite/usecase';
import { Provider } from '@nestjs/common';

export const QuestionToggleFavoriteUseCaseProvider: Provider = {
  provide: QuestionUseCaseDITokens.ToggleFavorite,

  useFactory: (
    questionRepository: QuestionRepository,
    favoriteQuestionRepository: FavoriteQuestionRepository,
  ) => new QuestionToggleFavoriteUseCase(questionRepository, favoriteQuestionRepository),
  
  inject: [
    PrismaRepositoryDITokens.QuestionRepository, 
    PrismaRepositoryDITokens.FavoriteQuestionRepository,
  ],
};