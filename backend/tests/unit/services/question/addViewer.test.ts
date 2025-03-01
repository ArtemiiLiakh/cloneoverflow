import { NoEntityWithIdException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { Question } from '@core/models/Question';
import { QuestionUser } from '@core/models/QuestionUser';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/repositories/question/QuestionUserRepository';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
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
      isExist: jest.fn().mockReturnValue(Promise.resolve(true)),
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

    expect(questionRepositoryMock.isExist).toHaveBeenCalled();
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
      isExist: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => viewer,
    } as Partial<QuestionUserRepository>;

    const unitMock = {
      questionRepository: {
        addViewer: jest.fn(),
      } as Partial<QuestionRepository>,

      questionUserRepository: {
        create: jest.fn(),
      } as Partial<QuestionUserRepository>,
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

    expect(unitMock.questionRepository.addViewer).not.toHaveBeenCalled();
    expect(unitMock.questionUserRepository.create).not.toHaveBeenCalled();
  });

  test('When question does not exist expect it throws an error', async () => {
    const questionRepositoryMock = {
      isExist: jest.fn().mockReturnValue(Promise.resolve(false)),
    } as Partial<QuestionRepository>;

    const addViwerUseCase = new QuestionAddViewerUseCase(
      questionRepositoryMock as QuestionRepository,
      {} as QuestionUserRepository,
      {} as UnitOfWork,
    );

    expect(addViwerUseCase.execute({
      executorId: 'executorId',
      questionId: 'questionId',
    })).rejects.toThrow(NoEntityWithIdException);
  });
});