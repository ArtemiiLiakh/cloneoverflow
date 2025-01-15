import { ForbiddenException } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionDeleteUseCase } from '@core/services/question/usecases/delete';

describe('Service: test QuestionDeleteUseCase', () => {
  test('Delete question', async () => {
    const userId = 'userId';

    const questionEntity = Question.new({
      ownerId: userId,
      text: 'text',
      title: 'title',
    });

    const questionRepositoryMock = {
      getById: async ({ questionId }) => {
        expect(questionId).toEqual(questionEntity.id);
        return questionEntity;
      },
      delete: async ({ questionId }) => {
        expect(questionId).toEqual(questionEntity.id);
      },
    } as Partial<QuestionRepository>;

    const deleteUseCase = new QuestionDeleteUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    const question = await deleteUseCase.execute({ 
      executorId: userId,
      questionId: questionEntity.id,
    });

    expect(question).toBe(questionEntity);
  });

  test('Throw an error because user is not owner of question', () => {
    const wrongUserId = 'userId';

    const question = Question.new({
      ownerId: 'ownerId',
      text: 'text',
      title: 'title',
    });

    const questionRepositoryMock = {
      getById: async () => question,
    } as Partial<QuestionRepository>;

    const deleteUseCase = new QuestionDeleteUseCase(
      questionRepositoryMock as QuestionRepository,
    );

    expect(deleteUseCase.execute({ 
      executorId: wrongUserId,
      questionId: question.id,
    })).rejects.toThrow(ForbiddenException);
  });
});