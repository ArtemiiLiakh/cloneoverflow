import { Answer } from '@core/domain/entities/Answer';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerDeleteUseCase } from '@core/services/answer';

describe('Service: test AnswerDeleteUseCase', () => {
  test('Delete answer', async () => {
    const executorId = 'userId';

    const answer = Answer.new({
      ownerId: executorId,
      questionId: 'questionId',
      text: 'text',
    });

    const answerRepositoryMock = {
      getById: jest.fn().mockReturnValue(answer),
      delete: jest.fn(),
    } as Partial<AnswerRepository>;
    
    const deleteUseCase = new AnswerDeleteUseCase(
      answerRepositoryMock as AnswerRepository,
      { 
        execute: (fn) => fn({
          answerRepository: answerRepositoryMock,
        } as Unit),
      } as UnitOfWork,
    );

    const deletedAnswer = await deleteUseCase.execute({ executorId, answerId: answer.id });
    expect(deletedAnswer).toBe(answer);
    expect(answerRepositoryMock.delete).toHaveBeenCalled();
  });

  test('Delete answer which is solution', async () => {
    const executorId = 'userId';

    const answer = Answer.new({
      ownerId: executorId,
      questionId: 'questionId',
      text: 'text',
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
        execute: (fn) => fn({
          answerRepository: answerRepositoryMock,
          questionRepository: questionRepositoryMock,
        } as Unit),
      } as UnitOfWork,
    );

    const deletedAnswer = await deleteUseCase.execute({ executorId, answerId: answer.id });
    expect(deletedAnswer).toBe(answer);
    expect(answerRepositoryMock.delete).toHaveBeenCalled();
    expect(questionRepositoryMock.openQuestion).toHaveBeenCalled();
  });

  test('Throw an error because user is not owner of answer', () => {
    const executorId = 'userId';

    const answer = Answer.new({
      ownerId: 'ownerId',
      questionId: 'questionId',
      text: 'text',
    });

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
      answerId: answer.id,
    })).rejects.toThrow();
  });
});