import { BadBodyException, ForbiddenException } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { Question } from '@core/domain/entities/Question';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionCloseUseCase } from '@core/services/question';

describe('Service: test QuestionCloseUseCase', () => {
  test('Close question', async () => {
    const userId = 'userId';
    
    const questionEntity = Question.new({
      ownerId: userId,
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
      getPartialById: async () => questionEntity,
      closeQuestion: jest.fn(),
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      getPartialById: async () => answerEntity,
    } as Partial<AnswerRepository>;

    const questionUserRepositoryMock = {
      create: jest.fn(),
    } as Partial<QuestionUserRepository>;

    const unitMock = {
      questionRepository: questionRepositoryMock,
      questionUserRepository: questionUserRepositoryMock, 
    } as Unit;

    const closeUseCase = new QuestionCloseUseCase(
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      { executeAll: async (fn) => { fn(unitMock); } } as UnitOfWork,
    );

    await closeUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
      answerId: answerEntity.id,
    });

    expect(questionRepositoryMock.closeQuestion).toHaveBeenCalled();
    expect(questionUserRepositoryMock.create).toHaveBeenCalled();
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

  test('Throw an error because question owner or answer is wrong', () => {
    const ownerId = 'userId';
    const wrongOwnerId = 'userId2';

    const questionEntity = Question.new({
      id: 'id',
      ownerId: ownerId,
      title: 'title',
      text: 'text',
    });

    const wrongAnswerEntity = Answer.new({
      id: 'wrongAnswerId',
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });
    
    const answerEntity = Answer.new({
      id: 'answerId',
      ownerId: 'ownerId',
      questionId: questionEntity.id,
      text: 'text',
    });

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      getPartialById: async ({ answerId }) => answerId === answerEntity.id ? answerEntity : wrongAnswerEntity,
    } as Partial<AnswerRepository>;

    const closeUseCase = new QuestionCloseUseCase(
      questionRepositoryMock as QuestionRepository,
      answerRepositoryMock as AnswerRepository,
      { 
        execute: async () => {},
        executeAll: async () => {}, 
      } as UnitOfWork,
    );

    expect(closeUseCase.execute({
      executorId: wrongOwnerId,
      questionId: questionEntity.id,
      answerId: answerEntity.id,
    })).rejects.toThrow(ForbiddenException);

    expect(closeUseCase.execute({
      executorId: ownerId,
      questionId: questionEntity.id,
      answerId: wrongAnswerEntity.id,
    })).rejects.toThrow(BadBodyException);

    expect(closeUseCase.execute({
      executorId: ownerId,
      questionId: questionEntity.id,
      answerId: answerEntity.id,
    })).resolves.toBeUndefined();
  });
});