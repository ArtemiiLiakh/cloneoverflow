import { Answer } from '@core/models/Answer';
import { AnswerRepository } from '@core/repositories/answer/AnswerRepository';
import { AnswerUpdateUseCase } from '@core/services/answer';
import { IUserRatingValidator } from '@core/services/validators/types';

describe('Service: test AnswerUpdateUseCase', () => {
  test('Update answer', async () => {
    const text = 'new text';
    const answerEntity = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });
    
    const userRatingValidatorMock = { 
      validate: jest.fn(),
    } as IUserRatingValidator;

    const answerRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(answerEntity)),
      update: jest.fn().mockReturnValue(Promise.resolve(answerEntity)),
    } as Partial<AnswerRepository>;

    const updateUseCase = new AnswerUpdateUseCase(
      userRatingValidatorMock,
      answerRepositoryMock as AnswerRepository,
    );

    const answer = await updateUseCase.execute({
      executorId: answerEntity.ownerId,
      answerId: answerEntity.id,
      text,
    });

    expect(answer).toBe(answerEntity);
    expect(userRatingValidatorMock.validate).not.toHaveBeenCalled();
    expect(answerRepositoryMock.getPartialById).toHaveBeenCalled();
    expect(answerRepositoryMock.update).toHaveBeenCalled();
  });

  test('Expect it checks user rating if he is not answer owner', async () => {
    const answerEntity = Answer.new({
      id: 'answerId',
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

    const userRatingValidatorMock = { 
      validate: jest.fn(),
    } as IUserRatingValidator;

    const answerRepositoryMock = {
      getPartialById: jest.fn().mockReturnValue(Promise.resolve(answerEntity)),
      update: jest.fn().mockReturnValue(Promise.resolve(answerEntity)),
    } as Partial<AnswerRepository>;
    
    const updateUseCase = new AnswerUpdateUseCase(
      userRatingValidatorMock,
      answerRepositoryMock as AnswerRepository,
    );

    const answer = await updateUseCase.execute({
      answerId: answerEntity.id,
      executorId: 'executorId',
      text: 'text',
    });

    expect(answer).toBe(answerEntity);
    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
  });
});