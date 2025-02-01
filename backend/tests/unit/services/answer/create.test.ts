import { NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerCreateUseCase } from '@core/services/answer';
import { AnswerCreateInput } from '@core/services/answer/create/dto';

describe('Service: test AnswerCreateUseCase', () => {
  test('Create answer', async () => {
    const inputData = {
      executorId: 'executorId',
      questionId: 'questionId',
      text: 'text',
    } as AnswerCreateInput;

    const answerId = 'id';

    const questionRepositoryMock = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as Partial<QuestionRepository>;

    const unitMock = {
      answerRepository: {
        create: jest.fn().mockReturnValue(Promise.resolve(answerId)),
      } as Partial<AnswerRepository>,

      answerUserRepository: {
        create: jest.fn(),
      } as Partial<AnswerUserRepository>,
    } as Unit;

    const createUseCase = new AnswerCreateUseCase(
      questionRepositoryMock as QuestionRepository,
      { execute: async (fn) => fn(unitMock) } as UnitOfWork,
    );

    const answer = await createUseCase.execute(inputData);

    expect(questionRepositoryMock.isExist).toHaveBeenCalled();
    expect(unitMock.answerRepository.create).toHaveBeenCalled();
    expect(unitMock.answerUserRepository.create).toHaveBeenCalled();

    expect(answer.id).toBe(answerId);
    expect(answer.questionId).toBe(inputData.questionId);
    expect(answer.ownerId).toBe(inputData.executorId);
    expect(answer.text).toBe(inputData.text);
  });

  test('Throw and error because question does not exist', async () => {
    const inputData = {
      executorId: 'executorId',
      questionId: 'questionId',
      text: 'text',
    } as AnswerCreateInput;

    const questionRepositoryMock = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(false)),
    } as Partial<QuestionRepository>;

    const createUseCase = new AnswerCreateUseCase(
      questionRepositoryMock as QuestionRepository,
      {} as UnitOfWork, 
    );

    expect(createUseCase.execute(inputData)).rejects.toThrow(NoEntityWithIdException);
  });

  test('Throw an error because unit of work failed', () => {
    const questionRepositoryMock = {
      validateById: async () => {},
    } as Partial<QuestionRepository>;

    const createUseCase = new AnswerCreateUseCase(
      questionRepositoryMock as QuestionRepository,
      { 
        execute: () => Promise.reject(new Error()),
        executeAll: async () => {}, 
      } as UnitOfWork, 
    ); 

    expect(createUseCase.execute({ 
      executorId: 'user',
      questionId: 'questionId',
      text: 'text',
    })).rejects.toThrow();
  });
});