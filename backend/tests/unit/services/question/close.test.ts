import { BadBodyException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
import { QuestionCloseUseCase } from '@core/services/question';
import { IUserRatingValidator } from '@core/services/validators/types';
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
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      { executeSeq: async (fn) => { fn(unitMock); } } as UnitOfWork,
    );

    await closeUseCase.execute({
      executorId: question.ownerId,
      questionId: question.questionId,
      answerId: answer.answerId,
    });

    expect(userRatingValidatorMock.validate).not.toHaveBeenCalled();
    expect(questionRepositoryMock.getById).toHaveBeenCalled();
    expect(answerRepositoryMock.getById).toHaveBeenCalled();
    expect(unitMock.questionRepository.closeQuestion).toHaveBeenCalled();
    expect(unitMock.answerRepository.setAsSolution).toHaveBeenCalled();
  });

  test('Close question with another user', async () => {
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
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      { executeSeq: async (fn) => { fn(unitMock) } } as UnitOfWork,
    );

    await closeUseCase.execute({
      executorId: userId,
      questionId: question.questionId,
      answerId: answer.answerId,
    });

    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
    expect(questionRepositoryMock.getById).toHaveBeenCalled();
    expect(answerRepositoryMock.getById).toHaveBeenCalled();
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
      {} as IUserRatingValidator,
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      {} as UnitOfWork,
    );

    expect(closeUseCase.execute({
      executorId: question.ownerId,
      questionId: question.questionId,
      answerId: answer.answerId,
    })).rejects.toThrow(BadBodyException);
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
      {} as IUserRatingValidator,
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      {} as UnitOfWork,
    );

    expect(closeUseCase.execute({
      executorId: question.ownerId,
      questionId: question.questionId,
      answerId: answer.answerId,
    })).rejects.toThrow(BadBodyException);
  });
});