import { Answer } from '@core/domain/entities/Answer';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUpdateUseCase } from '@core/services/answer/usecases/update';

describe('Service: test AnswerUpdateUseCase', () => {
  test('Update answer', async () => {
    const answerEntity = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });
    
    const answerRepositoryMock = {
      getById: async () => answerEntity,
      update: jest.fn(),
    } as Partial<AnswerRepository>;

    const updateUseCase = new AnswerUpdateUseCase(answerRepositoryMock as AnswerRepository);
    const answer = await updateUseCase.execute({
      executorId: answerEntity.ownerId,
      answerId: answerEntity.id,
      text: 'new text',
    });

    expect(answer).toBe(answerEntity);
    expect(answerRepositoryMock.update).toHaveBeenCalled();
  });

  test('Throw an error because answer owner is wrong', () => {
    const answerEntity = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const answerRepositoryMock = {
      getById: async () => answerEntity,
    } as Partial<AnswerRepository>;

    const updateUseCase = new AnswerUpdateUseCase(answerRepositoryMock as AnswerRepository);
    expect(updateUseCase.execute({
      executorId: 'wrongOwnerId',
      answerId: answerEntity.id,
      text: 'new text',
    })).rejects.toThrow();
  });

  test('Throw an error because answer does not exist', () => {
    const answerRepositoryMock = {
      getById: async () => null,
    } as Partial<AnswerRepository>;

    const updateUseCase = new AnswerUpdateUseCase(answerRepositoryMock as AnswerRepository);
    expect(updateUseCase.execute({
      executorId: 'executorId',
      answerId: 'answerId',
      text: 'text',
    })).rejects.toThrow();
  });
});