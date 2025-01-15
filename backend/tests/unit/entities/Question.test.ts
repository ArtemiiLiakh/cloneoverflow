import { Question } from '@core/domain/entities/Question';
import { isUUID } from 'class-validator';

describe('Entity: test Question entity', () => {
  test('Create Question entity with default fields', () => {
    const now = Date.now();

    const question = Question.new({
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',  
    });

    expect(isUUID(question.id)).toBeTruthy();
    expect(question.ownerId).toEqual('ownerId');
    expect(question.title).toEqual('title');
    expect(question.text).toEqual('text');
    expect(question.rating).toEqual(0);
    expect(question.isClosed).toEqual(false);
    expect(question.views).toEqual(0);
    expect(question.createdAt.getTime()).toBeGreaterThanOrEqual(now);
    expect(question.updatedAt.getTime()).toBeGreaterThanOrEqual(now);
  });

  test('Create Question entity with custom fields', () => {
    const date = new Date();

    const payload: Question = {
      id: 'id',
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',
      rating: 10,
      views: 10,
      isClosed: true,
      createdAt: date,
      updatedAt: date,
    };

    const question = Question.new(payload);

    expect(question).toEqual(payload);
  });
});