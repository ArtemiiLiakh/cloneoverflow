import { Exception } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { Tag } from '@core/domain/entities/Tag';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { TagRepository } from '@core/domain/repositories/tag/TagRepository';
import { Unit, UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionServiceInput } from '@core/services/question/dtos/QuestionServiceInput';
import { QuestionUpdateUseCase } from '@core/services/question/usecases/update';

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
    } as QuestionServiceInput.Update['data'];

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
    } as QuestionServiceInput.Update['data'];

    const questionRepositoryMock = {
      validateById: async () => {},
      update: async ({ questionId, question, returnEntity }) => {
        expect(questionId).toEqual(questionEntity.id);
        expect(question.title).toEqual(updateData.title);
        expect(question.text).toEqual(updateData.text);
        expect(returnEntity).toBeTruthy();
        return questionEntity;
      },
      unrefAllTags: async ({ questionId }) => {
        expect(questionId).toEqual(questionEntity.id);
      },
      refTags: async ({ questionId, tags }) => {
        expect(questionId).toEqual(questionEntity.id);
        expect(tags.at(0)).toBe(tagEntity);
      },
    } as Partial<QuestionRepository>;

    const tagRepositoryMock = {
      createOrFindMany: async ({ tags }) => {
        expect(tags.at(0)).toEqual(tagEntity.name);
        return [tagEntity];
      },
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
    } as QuestionServiceInput.Update['data'];

    const questionRepositoryMock = {
      validateById: async () => {},
    } as Partial<QuestionRepository>;

    const unitOfWork = {
      execute: async () => null, 
    } as UnitOfWork;

    const updateUseCase = new QuestionUpdateUseCase(
      questionRepositoryMock as QuestionRepository,
      unitOfWork,
    );

    expect(updateUseCase.execute({
      questionId: questionEntity.id,
      data: updateData,
    })).rejects.toThrow(Exception);
  });
});