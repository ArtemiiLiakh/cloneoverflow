import { Exception } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { Tag } from '@core/domain/entities/Tag';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { TagRepository } from '@core/domain/repositories/tag/TagRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionUpdateUseCase } from '@core/services/question';
import { QuestionUpdateInput } from '@core/services/question/update/dto';

describe('Service: test QuestionUpdateUseCase', () => {
  test('Update question without tags', async () => {
    const userId = 'userId';

    const questionEntity = Question.new({
      ownerId: userId,
      text: 'text',
      title: 'title',
    });

    const updateData = {
      title: 'title2',
      text: 'text2',
    } as QuestionUpdateInput['data'];

    const questionRepositoryMock = {
      validateById: async () => {},
      update: async ({ questionId, question, returnEntity }) => {
        expect(questionId).toEqual(questionEntity.id);
        expect(question).toEqual(updateData);
        expect(returnEntity).toBeTruthy();
        return questionEntity;
      },
    } as Partial<QuestionRepository>;

    const unitOfWorkMock = {
      execute: (fn) => fn({ 
        questionRepository: questionRepositoryMock,
      } as Unit),
    } as UnitOfWork;

    const updateUseCase = new QuestionUpdateUseCase(
      questionRepositoryMock as QuestionRepository,
      unitOfWorkMock,
    );

    const updatedQuestion = await updateUseCase.execute({
      questionId: questionEntity.id,
      data: updateData,
    });

    expect(updatedQuestion).toBe(questionEntity);
  });

  test('Update question with tags', async () => {
    const userId = 'userId';

    const questionEntity = Question.new({
      ownerId: userId,
      text: 'text',
      title: 'title',
    });

    const tagEntity = Tag.new({
      name: 'test',
    });

    const updateData = {
      title: 'title2',
      text: 'text2',
      tags: [tagEntity.name],
    } as QuestionUpdateInput['data'];

    const questionRepositoryMock = {
      validateById: async () => {},
      update: jest.fn().mockReturnValue(Promise.resolve(questionEntity)),
      unrefAllTags: jest.fn(),
      refTags: jest.fn(),
    } as Partial<QuestionRepository>;

    const tagRepositoryMock = {
      createOrFindMany: jest.fn().mockReturnValue(Promise.resolve([tagEntity])),
    } as Partial<TagRepository>;

    const unitOfWorkMock = {
      execute: (fn) => fn({ 
        questionRepository: questionRepositoryMock,
        tagRepository: tagRepositoryMock,
      } as Unit),
    } as UnitOfWork;

    const updateUseCase = new QuestionUpdateUseCase(
      questionRepositoryMock as QuestionRepository,
      unitOfWorkMock,
    );

    const question = await updateUseCase.execute({ 
      questionId: questionEntity.id,
      data: updateData,
    });

    expect(question).toBe(questionEntity);
    expect(questionRepositoryMock.update).toHaveBeenCalled();
    expect(questionRepositoryMock.unrefAllTags).toHaveBeenCalled();
    expect(questionRepositoryMock.refTags).toHaveBeenCalled();
    expect(tagRepositoryMock.createOrFindMany).toHaveBeenCalled();
  });

  test('Throw an error because unit of work is failed', () => {
    const userId = 'userId';

    const questionEntity = Question.new({
      ownerId: userId,
      text: 'text',
      title: 'title',
    });

    const updateData = {
      title: 'title2',
      text: 'text2',
    } as QuestionUpdateInput['data'];

    const questionRepositoryMock = {
      validateById: async () => {},
    } as Partial<QuestionRepository>;

    const updateUseCase = new QuestionUpdateUseCase(
      questionRepositoryMock as QuestionRepository,
      { 
        execute: () => Promise.reject(new Error()),
        executeAll: async () => {},
      } as UnitOfWork,
    );

    expect(updateUseCase.execute({
      questionId: questionEntity.id,
      data: updateData,
    })).rejects.toThrow(Exception);
  });
});