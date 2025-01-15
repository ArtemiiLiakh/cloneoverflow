import { QuestionUserStatusEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { QuestionUserRepositoryInput } from '@core/domain/repositories/question/dtos/questionUser/QuestionUserRepositoryInput';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionAddViewerUseCase } from '@core/services/question/usecases/addViewer';
import { IValidateQuestionUseCase } from '@core/services/validation/types/usecases';

describe('Service: test QuestionAddViewerUseCase', () => {
  test('Add a new viewer to question', async () => {
    const executorId = 'userId';

    const questionEntity = Question.new({
      ownerId: 'ownerId',
      text: 'text',
      title: 'title',
    });

    const questionRepositoryMock = {
      addViewer: jest.fn().mockImplementation(
        async ({ questionId }) => {
          expect(questionId).toEqual(questionEntity.id);
        }),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => null,
      create: jest.fn().mockImplementation(
        ({ user }: QuestionUserRepositoryInput.Create) => {
          expect(user.questionId).toEqual(questionEntity.id);
          expect(user.userId).toEqual(executorId);
          expect(user.status).toEqual(QuestionUserStatusEnum.VIEWER);
        }),
    } as Partial<QuestionUserRepository>;

    const unitMock = {
      questionRepository: questionRepositoryMock,
      questionUserRepository: questionUserRepositoryMock,
    } as Partial<Unit>;
    
    const addViewerUseCase = new QuestionAddViewerUseCase(
      { execute: (fn) => fn(unitMock as Unit) } as UnitOfWork,
      questionUserRepositoryMock as QuestionUserRepository,
      { execute: async () => {} } as IValidateQuestionUseCase,
    );

    await addViewerUseCase.execute({
      executorId,
      questionId: questionEntity.id,
    });

    expect(questionRepositoryMock.addViewer).toHaveBeenCalled();
    expect(questionUserRepositoryMock.create).toHaveBeenCalled();
  });

  test('Add existing viewer to question', async () => {
    const executorId = 'userId';

    const viewer = QuestionUser.new({
      questionId: 'questionId',
      userId: executorId,
      status: QuestionUserStatusEnum.VIEWER,
    });

    const questionRepositoryMock = {
      addViewer: jest.fn(),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => viewer,
      create: jest.fn(),
    } as Partial<QuestionUserRepository>;

    const addViwerUseCase = new QuestionAddViewerUseCase(
      { execute: (fn) => fn({
        questionRepository: questionRepositoryMock,
        questionUserRepository: questionUserRepositoryMock,
      } as Unit) } as UnitOfWork,
      questionUserRepositoryMock as QuestionUserRepository,
      { execute: async () => {} } as IValidateQuestionUseCase,
    );

    await addViwerUseCase.execute({
      executorId: viewer.userId,
      questionId: viewer.questionId,
    });

    expect(questionRepositoryMock.addViewer).not.toHaveBeenCalled();
    expect(questionUserRepositoryMock.create).not.toHaveBeenCalled();
  });
});