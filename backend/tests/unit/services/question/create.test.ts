import { Exception, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { Tag } from '@core/domain/entities/Tag';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { TagRepository } from '@core/domain/repositories/tag/TagRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionServiceInput } from '@core/services/question/dtos/QuestionServiceInput';
import { QuestionCreateUseCase } from '@core/services/question/usecases/create';

describe('Service: test QuestionCreateUseCase', () => {
  test('Create question', async () => {
    const payload: QuestionServiceInput.Create = {
      executorId: 'user',
      data: {
        title: 'title',
        text: 'text',
        tags: ['tags'],
      },
    };

    const tagEntities = payload.data.tags!.map((tag) => Tag.new({ name: tag }));
    let newQuestionId;

    const questionRepositoryMock = {
      create: ({ question }) => {
        const now = Date.now();
        newQuestionId = question.id;

        expect(question.ownerId).toEqual(payload.executorId);
        expect(question.title).toEqual(payload.data.title);
        expect(question.text).toEqual(payload.data.text);
        expect(question.rating).toEqual(0);
        expect(question.views).toEqual(0);
        expect(question.isClosed).toEqual(false);
        expect(question.createdAt.getTime()).toBeGreaterThanOrEqual(now);
        expect(question.updatedAt.getTime()).toBeGreaterThanOrEqual(now);
      },
      refTags: ({ questionId, tags }) => {
        expect(questionId).toEqual(newQuestionId);
        expect(tags).toBe(tagEntities);
      },
    } as Partial<QuestionRepository>;

    const questionUserRepositoryMock = {
      create: ({ user }) => {
        expect(user.questionId).toEqual(newQuestionId);
        expect(user.userId).toEqual(payload.executorId);
        expect(user.status).toEqual(QuestionUserStatusEnum.OWNER);
      },
    } as Partial<QuestionUserRepository>;

    const tagsRepositoryMock = {
      createOrFindMany: async ({ tags }) => {
        expect(tags).toBe(payload.data.tags);
        return tagEntities;
      },
    } as Partial<TagRepository>;

    const createUseCase = new QuestionCreateUseCase({
      execute: (fn) => fn({
        questionRepository: questionRepositoryMock,
        tagRepository: tagsRepositoryMock,
        questionUserRepository: questionUserRepositoryMock,
      } as Unit),
    } as UnitOfWork);

    const question = await createUseCase.execute(payload);
    expect(question.id).toEqual(newQuestionId);
  });

  test('Throw an error because unit of work failed', () => {
    const createUseCase = new QuestionCreateUseCase({
      execute: async () => null, 
    }); 

    expect(createUseCase.execute({ 
      executorId: 'user', 
      data: {
        title: 'title',
        text: 'text',
      },
    })).rejects.toThrow(Exception);
  });
});