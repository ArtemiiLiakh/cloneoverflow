import { QuestionToggleFavoriteUseCase } from '@application/question/usecases/toggleFavorite/usecase';
import { FavoriteQuestionRepository } from '@core/question/repository/FavoriteQuestionRepository';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { QuestionUseCaseDITokens } from '@web/di/tokens/services';

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