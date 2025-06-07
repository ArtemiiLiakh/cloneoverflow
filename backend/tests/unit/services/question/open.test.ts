import { QuestionOpenUseCase } from '@application/question/usecases';
import { IUserRatingValidator } from '@application/validators/types';
import { Unit, UnitOfWork } from '@common/repository/UnitOfWork';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { QuestionAlreadyOpened } from '@core/question/exceptions';
import { CannotOpenOthersQuestion } from '@core/question/exceptions/CannotOpenOthersQuestion';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
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
    
    const openUseCase = new QuestionOpenUseCase(
      questionRepositoryMock as QuestionRepository,
      { executeSeq: (fn) => { fn(unitMock) } } as UnitOfWork,
    );

    await openUseCase.execute({
      executorId: questionEntity.ownerId,
      questionId: questionEntity.questionId,
    });

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

    const openUseCase = new QuestionOpenUseCase(
      questionRepositoryMock as QuestionRepository,
      { 
        executeFn: async () => {},
        executeSeq: async () => {},
      } as UnitOfWork,
    );

    expect(openUseCase.execute({
      executorId: userId,
      questionId: questionEntity.questionId,
    })).rejects.toThrow(CannotOpenOthersQuestion);
  });

  test('Throw an error because question is already opened', () => {
    const questionEntity = createQuestion({
      isClosed: false,
    });

    const questionRepositoryMock = {
      getById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const openUseCase = new QuestionOpenUseCase(
      questionRepositoryMock as QuestionRepository,
      {} as UnitOfWork,
    );

    expect(openUseCase.execute({
      executorId: questionEntity.ownerId,
      questionId: questionEntity.questionId,
    })).rejects.toThrow(QuestionAlreadyOpened);
  });
});