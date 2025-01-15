import { BadBodyException, NoEntityWithIdException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionOpenUseCase } from '@core/services/question/usecases/open';

describe('Service: test QuestionOpenUseCase', () => {
  test('Open question', async () => {
    const userId = 'userId';
    
    const questionEntity = Question.new({
      ownerId: userId,
      text: 'text',
      title: 'title',
      isClosed: true,
    });

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
      openQuestion: jest.fn().mockImplementation(
        async ({ questionId }) => {
          expect(questionId).toEqual(questionEntity.id);
        },
      ),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => QuestionUser.new({
        questionId: questionEntity.id,
        userId: userId,
        status: QuestionUserStatusEnum.ANSWERER,
      }),
      delete: jest.fn(),
    } as Partial<QuestionUserRepository>;

    const unitMock = {
      questionRepository: questionRepositoryMock,
      questionUserRepository: questionUserRepositoryMock,
    } as Partial<Unit>;
    
    const openUseCase = new QuestionOpenUseCase(
      questionRepositoryMock as QuestionRepository,
      { execute: (fn) => fn(unitMock as Unit) } as UnitOfWork,
    );

    await openUseCase.execute({
      executorId: userId,
      questionId: questionEntity.id,
    });

    expect(questionRepositoryMock.openQuestion).toHaveBeenCalled();
    expect(questionUserRepositoryMock.delete).toHaveBeenCalled();
  });

  test('Throw an error because question is already opened', () => {
    const questionEntity = Question.new({
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',
      isClosed: false,
    });

    const questionRepositoryMock = {
      getPartialById: async () => questionEntity,
      openQuestion: async () => {},
    } as Partial<QuestionRepository>;

    const openUseCase = new QuestionOpenUseCase(
      questionRepositoryMock as QuestionRepository,
      {} as UnitOfWork,
    );

    expect(openUseCase.execute({
      executorId: questionEntity.ownerId,
      questionId: questionEntity.id,
    })).rejects.toThrow(BadBodyException);
  });

  test('Throw an error because question does not exist', () => {
    const questionRepositoryMock = {
      getPartialById: async () => null,
    } as Partial<QuestionRepository>;

    const openUseCase = new QuestionOpenUseCase(
      questionRepositoryMock as QuestionRepository,
      {} as UnitOfWork,
    );

    expect(openUseCase.execute({ 
      executorId: 'userId', 
      questionId: 'questionId', 
    })).rejects.toThrow(NoEntityWithIdException);
  });
});