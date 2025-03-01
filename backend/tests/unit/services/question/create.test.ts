import { Exception } from '@cloneoverflow/common';
import { Tag } from '@core/models/Tag';
import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/repositories/question/QuestionUserRepository';
import { TagRepository } from '@core/repositories/tag/TagRepository';
import { Unit, UnitOfWork } from '@core/repositories/UnitOfWork';
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

    const unitMock = {
      questionRepository: {
        create: jest.fn().mockReturnValue(Promise.resolve(questionId)),
        refTags: jest.fn(),
      } as Partial<QuestionRepository>,

      questionUserRepository: {
        create: jest.fn(),
      } as Partial<QuestionUserRepository>,

      tagRepository: {
        createOrFindMany: jest.fn().mockReturnValue(Promise.resolve(tagEntities)),
      } as Partial<TagRepository>,
    } as Unit;

    const createUseCase = new QuestionCreateUseCase({
      execute: (fn) => fn(unitMock),
    } as UnitOfWork);

    const question = await createUseCase.execute(payload);
    expect(question.id).toEqual(questionId);
    expect(unitMock.questionRepository.create).toHaveBeenCalled();
    expect(unitMock.questionRepository.refTags).toHaveBeenCalled();
    expect(unitMock.questionUserRepository.create).toHaveBeenCalled();
    expect(unitMock.tagRepository.createOrFindMany).toHaveBeenCalled();
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