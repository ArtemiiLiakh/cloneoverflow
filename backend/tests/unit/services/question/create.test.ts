import { Exception } from '@cloneoverflow/common';
import { Tag } from '@core/domain/entities/Tag';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { TagRepository } from '@core/domain/repositories/tag/TagRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionCreateUseCase } from '@core/services/question';
import { QuestionCreateInput } from '@core/services/question/create/dto';

describe('Service: test QuestionCreateUseCase', () => {
  test('Create question', async () => {
    const payload: QuestionCreateInput = {
      executorId: 'user',
      data: {
        title: 'title',
        text: 'text',
        tags: ['tags'],
      },
    };

    const questionId = 'id';
    const tagEntities = payload.data.tags!.map((tag) => Tag.new({ name: tag }));

    const questionRepositoryMock = {
      create: jest.fn().mockReturnValue(Promise.resolve(questionId)),
      refTags: jest.fn(),
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      create: jest.fn(),
    } as Partial<QuestionUserRepository>;

    const tagsRepositoryMock = {
      createOrFindMany: jest.fn().mockReturnValue(Promise.resolve(tagEntities)),
    } as Partial<TagRepository>;

    const createUseCase = new QuestionCreateUseCase({
      execute: (fn) => fn({
        questionRepository: questionRepositoryMock,
        tagRepository: tagsRepositoryMock,
        questionUserRepository: questionUserRepositoryMock,
      } as Unit),
    } as UnitOfWork);

    const question = await createUseCase.execute(payload);
    expect(question.id).toEqual(questionId);
    expect(questionUserRepositoryMock.create).toHaveBeenCalled();
    expect(tagsRepositoryMock.createOrFindMany).toHaveBeenCalled();
  });

  test('Throw an error because unit of work failed', () => {
    const createUseCase = new QuestionCreateUseCase({
      execute: () => Promise.reject(new Error()), 
      executeAll: async () => {},
    } as UnitOfWork); 

    expect(createUseCase.execute({ 
      executorId: 'user', 
      data: {
        title: 'title',
        text: 'text',
      },
    })).rejects.toThrow(Exception);
  });
});