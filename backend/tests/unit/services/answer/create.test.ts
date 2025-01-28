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
      validateById: jest.fn(),
    } as Partial<QuestionRepository>;

    const answerRepositoryMock = {
      create: jest.fn().mockReturnValue(Promise.resolve(answerId)),
    } as Partial<AnswerRepository>;

    const answerUserRepositoryMock = {
      create: jest.fn(),
    } as Partial<AnswerUserRepository>;

    const unitOfWorkMock = {
      execute: async (fn) => fn({
        answerRepository: answerRepositoryMock,
        answerUserRepository: answerUserRepositoryMock,
      } as Unit),
    } as UnitOfWork;

    const createUseCase = new AnswerCreateUseCase(
      questionRepositoryMock as QuestionRepository,
      unitOfWorkMock,
    );

    const answer = await createUseCase.execute(inputData);

    expect(questionRepositoryMock.validateById).toHaveBeenCalled();
    expect(answerRepositoryMock.create).toHaveBeenCalled();
    expect(answerUserRepositoryMock.create).toHaveBeenCalled();

    expect(answer.id).toBe(answerId);
    expect(answer.questionId).toBe(inputData.questionId);
    expect(answer.ownerId).toBe(inputData.executorId);
    expect(answer.text).toBe(inputData.text);
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