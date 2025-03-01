import { BadBodyException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { Question } from '@core/models/Question';
import { QuestionUser } from '@core/models/QuestionUser';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/repositories/question/QuestionUserRepository';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
import { QuestionOpenUseCase } from '@core/services/question';
import { IUserRatingValidator } from '@core/services/validators/types';

describe('Service: test QuestionOpenUseCase', () => {
  test('Open question by owner', async () => {
    const ownerId = 'userId';
    
    const questionEntity = Question.new({
      ownerId: ownerId,
      text: 'text',
      title: 'title',
      isClosed: true,
    });

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const unitMock = {
      questionRepository: {
        openQuestion: jest.fn(),
      } as Partial<QuestionRepository>,

      questionUserRepository: {
        getOne: async () => QuestionUser.new({
          questionId: questionEntity.id,
          userId: ownerId,
          status: QuestionUserStatusEnum.ANSWERER,
        }),
        delete: jest.fn(),
      } as Partial<QuestionUserRepository>,
    } as Unit;
    
    const userRatingValidator = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const openUseCase = new QuestionOpenUseCase(
      userRatingValidator,
      questionRepositoryMock as QuestionRepository,
      { execute: (fn) => fn(unitMock) } as UnitOfWork,
    );

    await openUseCase.execute({
      executorId: ownerId,
      questionId: questionEntity.id,
    });

    expect(userRatingValidator.validate).not.toHaveBeenCalled();
    expect(unitMock.questionRepository.openQuestion).toHaveBeenCalled();
    expect(unitMock.questionUserRepository.delete).toHaveBeenCalled();
  });

  test('Open question by another user', async () => {
    const userId = 'userId';
    
    const questionEntity = Question.new({
      ownerId: 'ownerId',
      text: 'text',
      title: 'title',
      isClosed: true,
    });

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const userRatingValidator = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const openUseCase = new QuestionOpenUseCase(
      userRatingValidator,
      questionRepositoryMock as QuestionRepository,
      { 
        execute: async () => {},
        executeAll: async () => {},
      } as UnitOfWork,
    );

    await openUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
    });

    expect(userRatingValidator.validate).toHaveBeenCalled();
  });

  test('Throw an error because question is already opened', () => {
    const questionEntity = Question.new({
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',
      isClosed: false,
    });

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
      openQuestion: async () => {},
    } as Partial<QuestionRepository>;

    const openUseCase = new QuestionOpenUseCase(
      {} as IUserRatingValidator,
      questionRepositoryMock as QuestionRepository,
      {} as UnitOfWork,
    );

    expect(openUseCase.execute({
      executorId: questionEntity.ownerId,
      questionId: questionEntity.id,
    })).rejects.toThrow(BadBodyException);
  });
});