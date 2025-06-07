import { Question } from '@core/question';

describe('Entity: test Question entity', () => {
  test('Create Question entity with fullfiled fields', () => {
    const payload: Question = {
      questionId: 'questionId',
      ownerId: 'ownerId',
      title: 'title',
      text: 'text',
      rating: 0,
      views: 0,
      isClosed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const question = Question.new(payload);

    expect(question).toMatchObject(payload);
  });

  test('Create Question entity without owner', () => {
    const payload: Question = {
      questionId: 'questionId',
      ownerId: '',
      title: 'title',
      text: 'text',
      rating: 0,
      views: 0,
      isClosed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const question = Question.new(payload);

    expect(question).toMatchObject(payload);
  });
});