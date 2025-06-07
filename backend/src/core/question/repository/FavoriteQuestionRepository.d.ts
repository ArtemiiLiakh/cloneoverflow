import { QuestionRepoIsFavoriteInput, QuestionRepoIsFavoriteOutput } from './dtos/favoriteQuestion/IsFavorite';
import { QuestionRepoMakeFavoriteInput, QuestionRepoMakeFavoriteOutput } from './dtos/favoriteQuestion/MakeFavorite';
import { QuestionRepoRemoveFavoriteInput, QuestionRepoRemoveFavoriteOutput } from './dtos/favoriteQuestion/RemoveFavorite';

export interface FavoriteQuestionRepository {
  makeFavorite(payload: QuestionRepoMakeFavoriteInput): Promise<QuestionRepoMakeFavoriteOutput>;
  removeFavorite(payload: QuestionRepoRemoveFavoriteInput): Promise<QuestionRepoRemoveFavoriteOutput>;
  isFavorite(payload: QuestionRepoIsFavoriteInput): Promise<QuestionRepoIsFavoriteOutput>;
}