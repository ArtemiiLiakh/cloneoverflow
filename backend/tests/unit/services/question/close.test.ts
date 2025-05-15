import { BadBodyException } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { Question } from '@core/domain/entities/Question';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionCloseUseCase } from '@core/services/question';
import { IUserRatingValidator } from '@core/services/validators/types';

describe('Service: test QuestionCloseUseCase', () => {
  test('Close question with owner', async () => {
    const ownerId = 'userId';
    
    const questionEntity = Question.new({
      ownerId: ownerId,
      text: 'text',
      title: 'title',
      isClosed: false,
    });

    const answerEntity = Answer.new({
      ownerId: 'ownerId',
      questionId: questionEntity.id,
      text: 'text',
      isSolution: false,
    });

    const questionRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(answerEntity)),
    } as Partial<AnswerRepository>;

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const unitMock = {
      questionRepository: {
        closeQuestion: jest.fn(),
      } as Partial<QuestionRepository>,

      questionUserRepository: {
        create: jest.fn(),
      } as Partial<QuestionUserRepository>, 
    } as Unit;

    const closeUseCase = new QuestionCloseUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      { executeAll: async (fn) => { fn(unitMock); } } as UnitOfWork,
    );

    await closeUseCase.execute({
      executorId: ownerId,
      questionId: questionEntity.id,
      answerId: answerEntity.id,
    });

    expect(userRatingValidatorMock.validate).not.toHaveBeenCalled();
    expect(questionRepositoryMock.getPartialById).toHaveBeenCalled();
    expect(answerRepositoryMock.getPartialById).toHaveBeenCalled();
    expect(unitMock.questionRepository.closeQuestion).toHaveBeenCalled();
    expect(unitMock.questionUserRepository.create).toHaveBeenCalled();
  });

  test('Close question with another user', async () => {
    const userId = 'userId';

    const questionEntity = Question.new({
      ownerId: 'ownerId',
      text: 'text',
      title: 'title',
      isClosed: false,
    });

    const answerEntity = Answer.new({
      ownerId: 'ownerId',
      questionId: questionEntity.id,
      text: 'text',
      isSolution: false,
    });

    const questionRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(answerEntity)),
    } as Partial<AnswerRepository>;

    const userRatingValidatorMock = {
      validate: jest.fn(),
    } as IUserRatingValidator;

    const closeUseCase = new QuestionCloseUseCase(
      userRatingValidatorMock,
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      { 
        execute: async () => {},
        executeAll: async () => {},
      } as UnitOfWork,
    );

    await closeUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
      answerId: answerEntity.id,
    });

    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
    expect(questionRepositoryMock.getPartialById).toHaveBeenCalled();
    expect(answerRepositoryMock.getPartialById).toHaveBeenCalled();
  });

  test('Throw an error because question is already closed', () => {
    const questionEntity = Question.new({
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',
      isClosed: true,
    });

    const answerEntity = Answer.new({
      ownerId: 'ownerId',
      questionId: questionEntity.id,
      text: 'text',
    });

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      getPartialById: async () => answerEntity,
    } as Partial<AnswerRepository>;


    const closeUseCase = new QuestionCloseUseCase(
      {} as IUserRatingValidator,
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      {} as UnitOfWork,
    );

    expect(closeUseCase.execute({
      executorId: questionEntity.ownerId,
      questionId: questionEntity.id,
      answerId: answerEntity.id,
    })).rejects.toThrow(BadBodyException);
  });

  test('Throw an error because answer does not belong to question', () => {
    const ownerId = 'userId';

    const questionEntity = Question.new({
      id: 'id',
      ownerId: ownerId,
      title: 'title',
      text: 'text',
    });

    const answerEntity = Answer.new({
      id: 'answerId',
      ownerId: 'ownerId',
      questionId: 'anotherQuestionId',
      text: 'text',
    });

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      getPartialById: async () => answerEntity,
    } as Partial<AnswerRepository>;

    const closeUseCase = new QuestionCloseUseCase(
      {} as IUserRatingValidator,
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      {} as UnitOfWork,
    );

    expect(closeUseCase.execute({
      answerId: answerEntity.id,
      questionId: questionEntity.id,
      executorId: ownerId,
    })).rejects.toThrow(BadBodyException);
  });
});