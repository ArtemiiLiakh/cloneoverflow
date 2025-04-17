import { NoEntityWithIdException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { QuestionAddViewerUseCase } from '@core/services/question';
import { createQuesitonViewer, createQuestion } from '@tests/utils/models/question';

describe('Question service: test AddViewerUseCase', () => {
  test('Add a new viewer to question', async () => {
    const executorId = 'userId';

    const questionEntity = createQuestion();

    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(true),
      getViewer: jest.fn().mockResolvedValue(null),
      addViewer: jest.fn().mockImplementation(
        ({ questionId, userId }) => {
          expect(questionId).toEqual(questionEntity.questionId);
          expect(userId).toEqual(executorId);
        }),
    } as Partial<QuestionRepository>;

    const addViewerUseCase = new QuestionAddViewerUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    await addViewerUseCase.execute({
      executorId,
      questionId: questionEntity.questionId,
    });

    expect(questionRepositoryMock.isExist).toHaveBeenCalled();
    expect(questionRepositoryMock.getViewer).toHaveBeenCalled();
    expect(questionRepositoryMock.addViewer).toHaveBeenCalled();
  });

  test('Add existing viewer to question', async () => {
    const viewer = createQuesitonViewer();
    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(true),
      getViewer: () => Promise.resolve(viewer),
      addViewer: jest.fn(),
    } as Partial<QuestionRepository>;

    const addViwerUseCase = new QuestionAddViewerUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    await addViwerUseCase.execute({
      executorId: viewer.userId,
      questionId: viewer.questionId,
    });

    expect(questionRepositoryMock.addViewer).not.toHaveBeenCalled();
  });

  test('When question does not exist expect it throws an error', () => {
    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(false),
    } as Partial<QuestionRepository>;

    const addViwerUseCase = new QuestionAddViewerUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    void expect(addViwerUseCase.execute({
      executorId: 'executorId',
      questionId: 'questionId',
    })).rejects.toThrow(NoEntityWithIdException);
  });
});