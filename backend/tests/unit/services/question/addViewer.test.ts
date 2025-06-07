import { QuestionAddViewerUseCase } from '@application/question/usecases';
import { QuestionIdInvalid, QuestionViewerAlreadyExists } from '@core/question/exceptions';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
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

    expect(addViwerUseCase.execute({
      executorId: viewer.userId,
      questionId: viewer.questionId,
    })).rejects.toThrow(QuestionViewerAlreadyExists);

    expect(questionRepositoryMock.addViewer).not.toHaveBeenCalled();
  });

  test('Throw an error question does not exist expect', () => {
    const questionRepositoryMock = {
      isExist: jest.fn().mockResolvedValue(false),
    } as Partial<QuestionRepository>;

    const addViwerUseCase = new QuestionAddViewerUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    expect(addViwerUseCase.execute({
      executorId: 'executorId',
      questionId: 'questionId',
    })).rejects.toThrow(QuestionIdInvalid);
  });
});