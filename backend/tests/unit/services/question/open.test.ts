import { BadBodyException, ForbiddenException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/repositories';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
import { QuestionOpenUseCase } from '@core/services/question';
import { IUserRatingValidator } from '@core/services/validators/types';
import { createQuestion } from '@tests/utils/models/question';

describe('Question service: test OpenUseCase', () => {
  test('Open question by owner', async () => {
    const questionEntity = createQuestion({
      isClosed: true,
    });

    const questionRepositoryMock = {
      getById: () => Promise.resolve(questionEntity),
    } as Partial<QuestionRepository>;

    const unitMock = {
      questionRepository: {
        openQuestion: jest.fn(),
      } as Partial<QuestionRepository>,

      answerRepository: {
        clearSolution: jest.fn(),
      } as Partial<AnswerRepository>,
    } as Unit;
    
    const userRatingValidator = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const openUseCase = new QuestionOpenUseCase(
      userRatingValidator,
      questionRepositoryMock as QuestionRepository,
      { executeSeq: (fn) => { fn(unitMock) } } as UnitOfWork,
    );

    await openUseCase.execute({
      executorId: questionEntity.ownerId,
      questionId: questionEntity.questionId,
    });

    expect(userRatingValidator.validate).not.toHaveBeenCalled();
    expect(unitMock.questionRepository.openQuestion).toHaveBeenCalled();
    expect(unitMock.answerRepository.clearSolution).toHaveBeenCalled();
  });

  test('Open question by another user', async () => {
    const userId = 'userId';
    
    const questionEntity = createQuestion({
      isClosed: true,
    });

    const questionRepositoryMock = {
      getById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const userRatingValidator = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const openUseCase = new QuestionOpenUseCase(
      userRatingValidator,
      questionRepositoryMock as QuestionRepository,
      { 
        executeFn: async () => {},
        executeSeq: async () => {},
      } as UnitOfWork,
    );

    await openUseCase.execute({
      executorId: userId,
      questionId: questionEntity.questionId,
    });

    expect(userRatingValidator.validate).toHaveBeenCalled();
  });

  test('Throw an error because question is already opened', () => {
    const questionEntity = createQuestion({
      isClosed: false,
    });

    const questionRepositoryMock = {
      getById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const openUseCase = new QuestionOpenUseCase(
      {} as IUserRatingValidator,
      questionRepositoryMock as QuestionRepository,
      {} as UnitOfWork,
    );

    expect(openUseCase.execute({
      executorId: questionEntity.ownerId,
      questionId: questionEntity.questionId,
    })).rejects.toThrow(ForbiddenException);
  });
});