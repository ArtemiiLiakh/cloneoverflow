import { AnswerDeleteUseCase } from '@application/answer/usecases';
import { AnswerOwnerInvalid } from '@core/answer/exceptions';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { Unit, UnitOfWork } from '@common/repository/UnitOfWork';
import { createAnswer } from '@tests/utils/models/answer';

describe('Answer service: test DeleteUseCase', () => {
  test('Delete answer', async () => {
    const executorId = 'ownerId';

    const answer = createAnswer({
      ownerId: executorId,
    });

    const answerRepositoryMock = {
      getById: jest.fn().mockReturnValue(answer),
      delete: jest.fn(),
    } as Partial<AnswerRepository>;
    
    const deleteUseCase = new AnswerDeleteUseCase(
      answerRepositoryMock as AnswerRepository,
      { 
        executeFn: (fn) => fn({
          answerRepository: answerRepositoryMock,
        } as Unit),
      } as UnitOfWork,
    );

    const deletedAnswer = await deleteUseCase.execute({ executorId, answerId: answer.answerId });
    expect(deletedAnswer).toBe(answer);
    expect(answerRepositoryMock.delete).toHaveBeenCalled();
  });

  test('Delete answer which is solution', async () => {
    const executorId = 'ownerId';

    const answer = createAnswer({
      ownerId: executorId,
      isSolution: true,
    });

    const answerRepositoryMock = {
      getById: async () => answer,
      delete: jest.fn(),
    } as Partial<AnswerRepository>;
    
    const questionRepositoryMock = {
      openQuestion: jest.fn(),
    } as Partial<QuestionRepository>;

    const deleteUseCase = new AnswerDeleteUseCase(
      answerRepositoryMock as AnswerRepository,
      { 
        executeFn: (fn) => fn({
          answerRepository: answerRepositoryMock,
          questionRepository: questionRepositoryMock,
        } as Unit),
      } as UnitOfWork,
    );

    const deletedAnswer = await deleteUseCase.execute({ executorId, answerId: answer.answerId });
    expect(deletedAnswer).toBe(answer);
    expect(answerRepositoryMock.delete).toHaveBeenCalled();
    expect(questionRepositoryMock.openQuestion).toHaveBeenCalled();
  });

  test('Throw an error because user is not owner of answer', () => {
    const executorId = 'executorId';

    const answer = createAnswer();

    const answerRepositoryMock = {
      getById: async () => answer,
      delete: async () => {},
    } as Partial<AnswerRepository>;
    
    const deleteUseCase = new AnswerDeleteUseCase(
      answerRepositoryMock as AnswerRepository,
      {} as UnitOfWork,
    );

    expect(deleteUseCase.execute({ 
      executorId, 
      answerId: answer.answerId,
    })).rejects.toThrow(AnswerOwnerInvalid);
  });
});