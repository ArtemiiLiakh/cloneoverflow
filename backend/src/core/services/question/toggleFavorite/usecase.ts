import { ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { FavoriteQuestionRepository, QuestionRepository } from '@core/repositories';
import { QuestionToggleFavoriteInput } from './dto';
import { IQuestionToggleFavoriteUseCase } from './type';

export class QuestionToggleFavoriteUseCase implements IQuestionToggleFavoriteUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private favoriteQuestionRepository: FavoriteQuestionRepository,
  ) {}

  async execute ({ questionId, executorId, action }: QuestionToggleFavoriteInput): Promise<void> {
    if (!await this.questionRepository.isExist({ questionId })) {
      throw new NoEntityWithIdException('Question');
    }

    if (action === 'add') {
      if (await this.favoriteQuestionRepository.isFavorite({
        questionId,
        userId: executorId,
      })) {
        throw new ForbiddenException('This question is already favorite');
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
        throw new ForbiddenException('This question is not favorite');
      }
  
      await this.favoriteQuestionRepository.removeFavorite({
        questionId,
        userId: executorId,
      });
    }
  }
}