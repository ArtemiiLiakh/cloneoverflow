import { NoEntityWithIdException, QuestionUserStatusEnum, UserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { Tag } from '@core/domain/entities/Tag';
import { QuestionIncludeOutput } from '@core/domain/repositories/question/dtos/Params';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { IQuestionAddViewerUseCase } from '@core/services/question/types/usecases';
import { QuestionGetUseCase } from '@core/services/question/usecases/get';

describe('Service: test QuestionGetUseCase', () => {
  const ownerInclude: QuestionIncludeOutput['owner'] = {
    id: 'id',
    name: 'name',
    username: 'username',
    rating: 0,
    status: UserStatusEnum.USER,
  };

  const tags: QuestionIncludeOutput['tags'] = [Tag.new({ name: 'name' })];

  test('Get question without viewer', async () => {
    const questionEntity = Question.new({
      ownerId: ownerInclude.id,
      text: 'text',
      title: 'title',
    });

    const questionRepositoryMock = {
      getQuestion: async ({ where }) => {
        expect(where.questionId).toEqual(questionEntity.id);
        return { entity: questionEntity, owner: ownerInclude, tags };
      }, 
    } as Partial<QuestionRepository>;

    const getUseCase = new QuestionGetUseCase(
      questionRepositoryMock as QuestionRepository, 
      {} as QuestionUserRepository,
      {} as IQuestionAddViewerUseCase,
    );

    const question = await getUseCase.execute({ questionId: questionEntity.id });
    expect(question.entity).toBe(questionEntity);
    expect(question.owner?.id).toEqual(ownerInclude.id);
    expect(question.tags).toBe(tags);
    expect(question.voter).toBeUndefined();
  });

  test('Get question and increase viewer count', async () => {
    const userId = 'userId';

    const questionEntity = Question.new({
      ownerId: ownerInclude.id,
      text: 'text',
      title: 'title',
    });

    const questionRepositoryMock = {
      getQuestion: async ({ where }) => {
        expect(where.questionId).toEqual(questionEntity.id);
        return { entity: questionEntity, owner: ownerInclude };
      },
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => null,
    } as Partial<QuestionUserRepository>;

    const addViewerUseCaseMock = {
      execute: jest.fn().mockImplementation(({ executorId, questionId }) => {
        expect(executorId).toEqual(userId);
        expect(questionId).toEqual(questionEntity.id);
      }),
    } as IQuestionAddViewerUseCase;

    const getUseCase = new QuestionGetUseCase(
      questionRepositoryMock as QuestionRepository,
      questionUserRepositoryMock as QuestionUserRepository,
      addViewerUseCaseMock,
    );

    const { entity } = await getUseCase.execute({ 
      executorId: userId, 
      questionId: questionEntity.id,
    });

    expect(entity).toBe(questionEntity);
    expect(addViewerUseCaseMock.execute).toHaveBeenCalled();
  });

  test('Get question with voter', async () => {
    const userId = 'userId';

    const questionEntity = Question.new({
      ownerId: 'ownerId',
      text: 'text',
      title: 'title',
    });

    const voterEntity = QuestionUser.new({
      questionId: questionEntity.id,
      userId,
      status: QuestionUserStatusEnum.VOTER,
      voteType: VoteTypeEnum.UP,
    });

    const questionRepositoryMock = {
      getQuestion: async ({ where }) => {
        expect(where.questionId).toEqual(questionEntity.id);
        return { entity: questionEntity, owner: ownerInclude };
      },
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      getOne: async () => voterEntity,
    } as Partial<QuestionUserRepository>;

    const getUseCase = new QuestionGetUseCase(
      questionRepositoryMock as QuestionRepository,
      questionUserRepositoryMock as QuestionUserRepository,
      { execute: async () => {} } as IQuestionAddViewerUseCase,
    );

    const question = await getUseCase.execute({ 
      executorId: userId, 
      questionId: questionEntity.id,
    });

    expect(question.entity).toBe(questionEntity);
    expect(question.voter).toBe(voterEntity);
  });

  test('Throw an error because question does not exist', () => {
    const questionRepositoryMock = {
      getQuestion: async () => null, 
    } as Partial<QuestionRepository>;

    const getUseCase = new QuestionGetUseCase(
      questionRepositoryMock as QuestionRepository,
      {} as QuestionUserRepository,
      {} as IQuestionAddViewerUseCase,
    );

    expect(getUseCase.execute({ questionId: 'id' })).rejects.toThrow(NoEntityWithIdException);
  });
});