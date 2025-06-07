import { QuestionAlreadyFavorite, QuestionIdInvalid, QuestionNotFavorite } from '@core/question/exceptions';
import { FavoriteQuestionRepository } from '@core/question/repository/FavoriteQuestionRepository';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { QuestionToggleFavoriteInput } from './dto';
import { IQuestionToggleFavoriteUseCase } from './type';

export class QuestionToggleFavoriteUseCase implements IQuestionToggleFavoriteUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private favoriteQuestionRepository: FavoriteQuestionRepository,
  ) {}

  async execute ({ questionId, executorId, action }: QuestionToggleFavoriteInput): Promise<void> {
    if (!await this.questionRepository.isExist({ questionId })) {
      throw new QuestionIdInvalid();
    }

    if (action === 'add') {
      if (await this.favoriteQuestionRepository.isFavorite({
        questionId,
        userId: executorId,
      })) {
        throw new QuestionAlreadyFavorite();
      }
  
      await this.favoriteQuestionRepository.makeFavorite({
        questionId,
        userId: executorId,
      });
    } else if (action === 'delete') {
      if (!await this.favoriteQuestionRepository.isFavorite({
        questionId,
        userId: executorId,
      })) {
        throw new QuestionNotFavorite();
      }
  
      await this.favoriteQuestionRepository.removeFavorite({
        questionId,
        userId: executorId,
      });
    }
  }
}