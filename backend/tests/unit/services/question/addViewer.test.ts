import { QuestionUserStatusEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionAddViewerUseCase } from '@core/services/question';

describe('Service: test QuestionAddViewerUseCase', () => {
  test('Add a new viewer to question', async () => {
    const executorId = 'userId';

    const questionEntity = Question.new({
      ownerId: 'ownerId',
      text: 'text',
      title: 'title',
    });

    const questionRepositoryMock = {
      validateById: async () => {},
      addViewer: jest.fn().mockImplementation(
        async ({ questionId }) => {
          expect(questionId).toEqual(questionEntity.id);
        }),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: jest.fn().mockReturnValue(Promise.resolve(null)),
      create: jest.fn(),
    } as Partial<QuestionUserRepository>;

    const unitMock = {
      questionRepository: questionRepositoryMock,
      questionUserRepository: questionUserRepositoryMock,
    } as Unit;
    
    const addViewerUseCase = new QuestionAddViewerUseCase(
      questionRepositoryMock as QuestionRepository,
      questionUserRepositoryMock as QuestionUserRepository,
      { 
        execute: async () => {},
        executeAll: async (fn) => { fn(unitMock); },
      } as UnitOfWork,
    );

    await addViewerUseCase.execute({
      executorId,
      questionId: questionEntity.id,
    });

    expect(questionRepositoryMock.addViewer).toHaveBeenCalled();
    expect(questionUserRepositoryMock.create).toHaveBeenCalled();
    expect(questionUserRepositoryMock.getOne).toHaveBeenCalled();
  });

  test('Add existing viewer to question', async () => {
    const executorId = 'userId';

    const viewer = QuestionUser.new({
      questionId: 'questionId',
      userId: executorId,
      status: QuestionUserStatusEnum.VIEWER,
    });

    const questionRepositoryMock = {
      validateById: async () => {},
      addViewer: jest.fn(),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => viewer,
      create: jest.fn(),
    } as Partial<QuestionUserRepository>;

    const unitMock = {
      questionRepository: questionRepositoryMock,
      questionUserRepository: questionUserRepositoryMock,
    } as Unit;

    const addViwerUseCase = new QuestionAddViewerUseCase(
      questionRepositoryMock as QuestionRepository,
      questionUserRepositoryMock as QuestionUserRepository,
      { 
        execute: async () => {},
        executeAll: async (fn) => { fn(unitMock); },
      } as UnitOfWork,
    );

    await addViwerUseCase.execute({
      executorId: viewer.userId,
      questionId: viewer.questionId,
    });

    expect(questionRepositoryMock.addViewer).not.toHaveBeenCalled();
    expect(questionUserRepositoryMock.create).not.toHaveBeenCalled();
  });
});