import { QuestionRepoIsFavoriteInput, QuestionRepoIsFavoriteOutput } from './dtos/IsFavorite';
import { QuestionRepoMakeFavoriteInput, QuestionRepoMakeFavoriteOutput } from './dtos/MakeFavorite';
import { QuestionRepoRemoveFavoriteInput, QuestionRepoRemoveFavoriteOutput } from './dtos/RemoveFavorite';

export interface FavoriteQuestionRepository {
  makeFavorite(payload: QuestionRepoMakeFavoriteInput): Promise<QuestionRepoMakeFavoriteOutput>;
  removeFavorite(payload: QuestionRepoRemoveFavoriteInput): Promise<QuestionRepoRemoveFavoriteOutput>;
  isFavorite(payload: QuestionRepoIsFavoriteInput): Promise<QuestionRepoIsFavoriteOutput>;
}