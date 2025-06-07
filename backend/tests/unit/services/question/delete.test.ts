import { ForbiddenException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { QuestionDeleteUseCase } from '@application/question/usecases';
import { createQuestion } from '@tests/utils/models/question';
import { CannotDeleteOthersQuestion } from '@core/question/exceptions';

describe('Question service: test DeleteUseCase', () => {
  test('Delete question', async () => {
    const questionEntity = createQuestion();

    const questionRepositoryMock = {
      getById: jest.fn().mockResolvedValue(questionEntity),
      delete: jest.fn(),
    } as Partial<QuestionRepository>;

    const deleteUseCase = new QuestionDeleteUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    const question = await deleteUseCase.execute({ 
      executorId: questionEntity.ownerId,
      questionId: questionEntity.questionId,
    });

    expect(question).toBe(questionEntity);
    expect(questionRepositoryMock.delete).toHaveBeenCalled();
    expect(questionRepositoryMock.getById).toHaveBeenCalled();
  });

  test('Throw an error because user is not owner of question', () => {
    const wrongUserId = 'userId';

    const question = createQuestion();

    const questionRepositoryMock = {
      getById: async () => question,
    } as Partial<QuestionRepository>;

    const deleteUseCase = new QuestionDeleteUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    expect(deleteUseCase.execute({ 
      executorId: wrongUserId,
      questionId: question.questionId,
    })).rejects.toThrow(CannotDeleteOthersQuestion);
  });
});