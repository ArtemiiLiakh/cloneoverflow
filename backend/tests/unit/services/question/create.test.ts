import { QuestionCreateUseCase } from '@application/question/usecases';
import { QuestionCreateInput } from '@application/question/usecases/create/dto';
import { ServerError } from '@cloneoverflow/common';
import { Unit, UnitOfWork } from '@common/repository/UnitOfWork';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { TagRepository } from '@core/tag/repository/TagRepository';
import { createQuestion } from '@tests/utils/models/question';
import { createTag } from '@tests/utils/models/tag';

describe('Question service: test CreateUseCase', () => {
  test('Create question', async () => {
    const tag = createTag();

    const payload: QuestionCreateInput = {
      executorId: 'user',
      data: {
        title: 'title',
        text: 'text',
        tags: [tag.name],
      },
    };

    const questionEntity = createQuestion();

    const unitMock = {
      questionRepository: {
        create: jest.fn().mockResolvedValue(questionEntity),
        refTags: jest.fn(),
      } as Partial<QuestionRepository>,

      tagRepository: {
        createOrFindMany: jest.fn().mockResolvedValue(tag),
      } as Partial<TagRepository>,
    } as Unit;

    const createUseCase = new QuestionCreateUseCase({
      executeFn: (fn) => fn(unitMock),
    } as UnitOfWork);

    const question = await createUseCase.execute(payload);
    expect(question).toEqual(questionEntity);
    expect(unitMock.questionRepository.create).toHaveBeenCalled();
    expect(unitMock.questionRepository.refTags).toHaveBeenCalled();
    expect(unitMock.tagRepository.createOrFindMany).toHaveBeenCalled();
  });

  test('Throw an error because unit of work failed', () => {
    const createUseCase = new QuestionCreateUseCase({
      executeFn: () => Promise.reject(new Error()), 
      executeSeq: async () => {},
    } as UnitOfWork); 

    expect(createUseCase.execute({ 
      executorId: 'user', 
      data: {
        title: 'title',
        text: 'text',
      },
    })).rejects.toThrow(ServerError);
  });
});