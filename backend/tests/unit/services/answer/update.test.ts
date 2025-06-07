import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { AnswerUpdateUseCase } from '@application/answer/usecases';
import { IUserRatingValidator } from '@application/validators/types';
import { createAnswer } from '@tests/utils/models/answer';

describe('Answer service: test UpdateUseCase', () => {
  test('Update answer', async () => {
    const text = 'new text';
    const answerEntity = createAnswer();
    
    const userRatingValidatorMock = { 
      validate: jest.fn(),
    } as IUserRatingValidator;

    const answerRepositoryMock = {
      getById: jest.fn().mockResolvedValue(answerEntity),
      update: jest.fn().mockResolvedValue(answerEntity),
    } as Partial<AnswerRepository>;

    const updateUseCase = new AnswerUpdateUseCase(
      userRatingValidatorMock,
      answerRepositoryMock as AnswerRepository,
    );

    const answer = await updateUseCase.execute({
      executorId: answerEntity.ownerId,
      answerId: answerEntity.answerId,
      text,
    });

    expect(answer).toBe(answerEntity);
    expect(userRatingValidatorMock.validate).not.toHaveBeenCalled();
    expect(answerRepositoryMock.getById).toHaveBeenCalled();
    expect(answerRepositoryMock.update).toHaveBeenCalled();
  });

  test('Expect it checks user rating if he is not answer owner', async () => {
    const answerEntity = createAnswer();

    const userRatingValidatorMock = { 
      validate: jest.fn(),
    } as IUserRatingValidator;

    const answerRepositoryMock = {
      getById: jest.fn().mockReturnValue(Promise.resolve(answerEntity)),
      update: jest.fn().mockReturnValue(Promise.resolve(answerEntity)),
    } as Partial<AnswerRepository>;
    
    const updateUseCase = new AnswerUpdateUseCase(
      userRatingValidatorMock,
      answerRepositoryMock as AnswerRepository,
    );

    const answer = await updateUseCase.execute({
      answerId: answerEntity.answerId,
      executorId: 'executorId',
      text: 'text',
    });

    expect(answer).toBe(answerEntity);
    expect(userRatingValidatorMock.validate).toHaveBeenCalled();
  });
});