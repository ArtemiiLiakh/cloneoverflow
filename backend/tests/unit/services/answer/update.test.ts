import { Answer } from '@core/domain/entities/Answer';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerUpdateUseCase } from '@core/services/answer';

describe('Service: test AnswerUpdateUseCase', () => {
  test('Update answer', async () => {
    const answerEntity = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });
    
    const text = 'new text';

    const answerRepositoryMock = {
      validateById: async () => {},
      update: jest.fn().mockReturnValue(Promise.resolve(answerEntity)),
    } as Partial<AnswerRepository>;

    const updateUseCase = new AnswerUpdateUseCase(answerRepositoryMock as AnswerRepository);
    const answer = await updateUseCase.execute({
      answerId: answerEntity.id,
      text,
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
      validateById: async () => {},
    } as Partial<AnswerRepository>;

    const updateUseCase = new AnswerUpdateUseCase(answerRepositoryMock as AnswerRepository);
    expect(updateUseCase.execute({
      answerId: answerEntity.id,
      text: 'new text',
    })).rejects.toThrow();
  });
});