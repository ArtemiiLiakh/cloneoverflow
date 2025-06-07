import { QuestionCloseUseCase } from '@application/question/usecases';
import { IUserRatingValidator } from '@application/validators/types';
import { Unit, UnitOfWork } from '@common/repository/UnitOfWork';
import { AnswerNotBelongToQuestion } from '@core/answer/exceptions';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { QuestionAlreadyClosed } from '@core/question/exceptions';
import { CannotCloseOthersQuestion } from '@core/question/exceptions/CannotCloseOthersQuestion';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { createAnswer } from '@tests/utils/models/answer';
import { createQuestion } from '@tests/utils/models/question';

describe('Question service: test CloseUseCase', () => {
  test('Close question with owner', async () => {
    const question = createQuestion();
    const answer = createAnswer();

    const questionRepositoryMock = {
      getById: jest.fn().mockResolvedValue(question),
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      getById: jest.fn().mockResolvedValue(answer),
    } as Partial<AnswerRepository>;

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const unitMock = {
      questionRepository: {
        closeQuestion: jest.fn(),
      } as Partial<QuestionRepository>,
      answerRepository: {
        setAsSolution: jest.fn(),
      } as Partial<AnswerRepository>,
    } as Unit;

    const closeUseCase = new QuestionCloseUseCase(
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      { executeSeq: async (fn) => { fn(unitMock); } } as UnitOfWork,
    );

    await closeUseCase.execute({
      executorId: question.ownerId,
      questionId: question.questionId,
      answerId: answer.answerId,
    });

    expect(questionRepositoryMock.getById).toHaveBeenCalled();
    expect(answerRepositoryMock.getById).toHaveBeenCalled();
    expect(unitMock.questionRepository.closeQuestion).toHaveBeenCalled();
    expect(unitMock.answerRepository.setAsSolution).toHaveBeenCalled();
  });

  test('Throw an error if user close other\'s question', async () => {
    const userId = 'userId';

    const question = createQuestion();
    const answer = createAnswer({
      questionId: question.questionId
    });

    const questionRepositoryMock = {
      getById: jest.fn().mockResolvedValue(question),
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      getById: jest.fn().mockResolvedValue(answer),
    } as Partial<AnswerRepository>;

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const unitMock = {
      questionRepository: {
        closeQuestion: jest.fn(),
      } as Partial<QuestionRepository>,
      answerRepository: {
        setAsSolution: jest.fn(),
      } as Partial<AnswerRepository>,
    } as Unit;

    const closeUseCase = new QuestionCloseUseCase(
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      { executeSeq: async (fn) => { fn(unitMock) } } as UnitOfWork,
    );

    expect(closeUseCase.execute({
      executorId: userId,
      questionId: question.questionId,
      answerId: answer.answerId,
    })).rejects.toThrow(CannotCloseOthersQuestion);
  });

  test('Throw an error because question is already closed', () => {
    const question = createQuestion({
      isClosed: true
    });
    const answer = createAnswer({
      questionId: question.questionId,
    });

    const questionRepositoryMock = {
      getById: async () => question,
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      getById: async () => answer,
    } as Partial<AnswerRepository>;


    const closeUseCase = new QuestionCloseUseCase(
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      {} as UnitOfWork,
    );

    expect(closeUseCase.execute({
      executorId: question.ownerId,
      questionId: question.questionId,
      answerId: answer.answerId,
    })).rejects.toThrow(QuestionAlreadyClosed);
  });

  test('Throw an error because answer does not belong to question', () => {
    const question = createQuestion();
    const answer = createAnswer({
      questionId: 'anotherQuestionId'
    });

    const questionRepositoryMock = {
      getById: async () => question,
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      getById: async () => answer,
    } as Partial<AnswerRepository>;

    const closeUseCase = new QuestionCloseUseCase(
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      {} as UnitOfWork,
    );

    expect(closeUseCase.execute({
      executorId: question.ownerId,
      questionId: question.questionId,
      answerId: answer.answerId,
    })).rejects.toThrow(AnswerNotBelongToQuestion);
  });
});