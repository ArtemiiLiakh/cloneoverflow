import { QuestionRepoIsFavoriteInput, QuestionRepoIsFavoriteOutput } from '@core/question/repository/dtos/favoriteQuestion/IsFavorite';
import { QuestionRepoMakeFavoriteInput, QuestionRepoMakeFavoriteOutput } from '@core/question/repository/dtos/favoriteQuestion/MakeFavorite';
import { QuestionRepoRemoveFavoriteInput, QuestionRepoRemoveFavoriteOutput } from '@core/question/repository/dtos/favoriteQuestion/RemoveFavorite';
import { FavoriteQuestionRepository } from '@core/question/repository/FavoriteQuestionRepository';
import { PrismaClient } from '@prisma/client';

export class PrismaFavoriteQuestionRepository implements FavoriteQuestionRepository {
  constructor (
    private client: PrismaClient,
  ) {}

  async makeFavorite (
    { questionId, userId }: QuestionRepoMakeFavoriteInput,
  ): Promise<QuestionRepoMakeFavoriteOutput> {
    await this.client.favoriteQuestions.create({
      data: {
        userId,
        questionId: +questionId,
      },
    });   
  }

  async removeFavorite (
    { questionId, userId }: QuestionRepoRemoveFavoriteInput,
  ): Promise<QuestionRepoRemoveFavoriteOutput> {
    await this.client.favoriteQuestions.delete({
      where: {
        userId_questionId: {
          questionId: +questionId,
          userId,
        },
      },
    });    
  }

  async isFavorite (
    { questionId, userId }: QuestionRepoIsFavoriteInput,
  ): Promise<QuestionRepoIsFavoriteOutput> {
    const question = await this.client.favoriteQuestions.findFirst({
      where: {
        questionId: +questionId,
        userId,
      },
    });

    return !!question;
  }
}