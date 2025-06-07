import { QuestionToggleFavoriteUseCase } from '@application/question/usecases/toggleFavorite/usecase';
import { ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { QuestionAlreadyFavorite } from '@core/question/exceptions';
import { FavoriteQuestionRepository } from '@core/question/repository/FavoriteQuestionRepository';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';

describe('Question service: toggle favorite question', () => {
  test('Expect it adds question to favorite', async () => {
    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(true),
    } as Partial<QuestionRepository>;

    const favoriteRepositoryMock = {
      isFavorite: jest.fn().mockResolvedValue(false),
      makeFavorite: jest.fn(),
    } as Partial<FavoriteQuestionRepository>;
    
    const toggleFavoriteUseCase = new QuestionToggleFavoriteUseCase(
      questionRepositoryMock as QuestionRepository,
      favoriteRepositoryMock as FavoriteQuestionRepository,
    );

    await toggleFavoriteUseCase.execute({
      action: 'add',
      executorId: 'executorId',
      questionId: 'questionId',
    });

    expect(questionRepositoryMock.isExist).toHaveBeenCalled();
    expect(favoriteRepositoryMock.isFavorite).toHaveBeenCalled();
    expect(favoriteRepositoryMock.makeFavorite).toHaveBeenCalled();
  });

  test('Expect it removes question from favorite', async () => {
    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(true),
    } as Partial<QuestionRepository>;

    const favoriteRepositoryMock = {
      isFavorite: jest.fn().mockResolvedValue(true),
      removeFavorite: jest.fn(),
    } as Partial<FavoriteQuestionRepository>;
    
    const toggleFavoriteUseCase = new QuestionToggleFavoriteUseCase(
      questionRepositoryMock as QuestionRepository,
      favoriteRepositoryMock as FavoriteQuestionRepository,
    );

    await toggleFavoriteUseCase.execute({
      action: 'delete',
      executorId: 'executorId',
      questionId: 'questionId',
    });

    expect(questionRepositoryMock.isExist).toHaveBeenCalled();
    expect(favoriteRepositoryMock.isFavorite).toHaveBeenCalled();
    expect(favoriteRepositoryMock.removeFavorite).toHaveBeenCalled();
  });

  test('Throw an error if question is already favorite', async () => {
    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(true),
    } as Partial<QuestionRepository>;

    const favoriteRepositoryMock = {
      isFavorite: jest.fn().mockResolvedValue(true),
      makeFavorite: jest.fn(),
    } as Partial<FavoriteQuestionRepository>;
    
    const toggleFavoriteUseCase = new QuestionToggleFavoriteUseCase(
      questionRepositoryMock as QuestionRepository,
      favoriteRepositoryMock as FavoriteQuestionRepository,
    );

    await expect(toggleFavoriteUseCase.execute({
      action: 'add',
      executorId: 'executorId',
      questionId: 'questionId',
    })).rejects.toThrow(QuestionAlreadyFavorite);

    expect(questionRepositoryMock.isExist).toHaveBeenCalled();
    expect(favoriteRepositoryMock.isFavorite).toHaveBeenCalled();
    expect(favoriteRepositoryMock.makeFavorite).not.toHaveBeenCalled();
  });

  test('Throw an error if question not favorite yet', async () => {
    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(true),
    } as Partial<QuestionRepository>;
  
    const favoriteRepositoryMock = {
      isFavorite: jest.fn().mockResolvedValue(false),
      removeFavorite: jest.fn(),
    } as Partial<FavoriteQuestionRepository>;
    
    const toggleFavoriteUseCase = new QuestionToggleFavoriteUseCase(
      questionRepositoryMock as QuestionRepository,
      favoriteRepositoryMock as FavoriteQuestionRepository,
    );
  
    await expect(toggleFavoriteUseCase.execute({
      action: 'delete',
      executorId: 'executorId',
      questionId: 'questionId',
    })).rejects.toThrow(ForbiddenException);
  
    expect(questionRepositoryMock.isExist).toHaveBeenCalled();
    expect(favoriteRepositoryMock.isFavorite).toHaveBeenCalled();
    expect(favoriteRepositoryMock.removeFavorite).not.toHaveBeenCalled();
  });

  test('Throw an error if question does not exist', async () => {
    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(false),
    } as Partial<QuestionRepository>;
  
    const toggleFavoriteUseCase = new QuestionToggleFavoriteUseCase(
      questionRepositoryMock as QuestionRepository,
      {} as FavoriteQuestionRepository,
    );
  
    expect(toggleFavoriteUseCase.execute({
      action: 'delete',
      executorId: 'executorId',
      questionId: 'questionId',
    })).rejects.toThrow(NoEntityWithIdException);
  });
});